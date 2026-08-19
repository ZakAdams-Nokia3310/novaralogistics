'use strict';
// Server-side authorization registry for the Data Connect proxy
// (controllers/dataController.js). This is the ONLY place that decides who
// may run which operation — dataconnect/connectors/*.gql denies every one
// of these to every client directly (@auth(level: NO_ACCESS)), so this
// registry is the sole enforcement point, not a redundant second layer.
//
//   kind     — 'query' | 'mutation' — selects services/dataConnect.js's
//              read vs write path.
//   roles    — custom-claim roles (req.user.role, from the verified
//              Firebase ID token) allowed to call this operation for ANY
//              row.
//   ownField — optional. If the caller's role isn't in `roles`, they may
//              still call this operation IF variables[ownField] equals
//              their OWN database user id (resolved server-side from their
//              verified email — never trusted from the client). Used for
//              "edit my own profile" style operations.
//   orgRoles — optional. Roles (in addition to `roles`) allowed to call
//              this operation, but ONLY scoped to their own organisation —
//              variables[orgField] is overridden server-side with the
//              caller's own orgId custom claim, ignoring whatever the
//              client sent, so this can't be used to read another org's
//              data no matter what a caller supplies.
//   orgField — the variable name orgRoles scoping applies to.
//   injectOwnIdAs — optional. Overrides variables[injectOwnIdAs] with the
//              caller's own resolved database user id server-side, ignoring
//              whatever the client sent — for mutations that record *who*
//              performed the action (e.g. reviewedById), so it can't be
//              spoofed as a different admin.
//   featureKey — optional. Lets a caller with no matching `roles`/`orgRoles`/
//              `ownField` still be authorized via a CUSTOM role (User.customRole,
//              see dataconnect/schema/schema.gql's Role type): if their role's
//              `permissions` JSON grants the right action for this featureKey,
//              they're let through — 'view' for queries; 'create' for a
//              mutation whose name starts with "Create"; 'edit' for every
//              other mutation (delete included — it isn't its own flag).
//              See dataController.js's actionForOperation/normalizeGrant for
//              exactly how that's derived, and its execute() for where this
//              is actually checked (always a fresh DB read of the role's
//              current permissions, never cached/trusted from a claim). The
//              featureKey matches the page slug in security.js's PAGE_ROLES
//              (e.g. 'admin-fleet'). Never set on the Role CRUD operations
//              themselves — a custom role can never grant itself more roles.

// super_admin is a strict superset of admin — every ADMIN-gated operation
// below is reachable by both, so this list (not each individual entry) is
// the one place that relationship is expressed. SUPER_ADMIN_ONLY is for the
// handful of operations even a regular admin may not call (organisation
// creation/approval/status) — see security.js's isSuperAdmin doc comment
// for the client-side mirror of this same split.
const ADMIN = ['admin', 'super_admin'];
const SUPER_ADMIN_ONLY = ['super_admin'];
const ALL_ROLES = ['admin', 'user', 'driver'];

module.exports = {
  // ── Admin dashboard reads ──
  ListAllOrganisations:      { kind: 'query', roles: ADMIN, featureKey: 'admin-orgs' },
  ListAllOrgRequests:        { kind: 'query', roles: ADMIN, featureKey: 'admin-orgs' },
  ListAllUsers:               { kind: 'query', roles: ADMIN, featureKey: 'admin-orgs' },
  ListAllVehicles:             { kind: 'query', roles: ADMIN, featureKey: 'admin-fleet' },
  ListAllMaintenanceQueries: { kind: 'query', roles: ADMIN, featureKey: 'admin-maintenance' },
  ListAllRentals:              { kind: 'query', roles: ADMIN, featureKey: 'admin-rentals' },
  ListAllRentalApplications: { kind: 'query', roles: ADMIN, featureKey: 'admin-rentals' },
  GetRentalApplicationById:  { kind: 'query', roles: ADMIN, featureKey: 'admin-rentals' },
  ReviewRentalApplication:   { kind: 'mutation', roles: ADMIN, featureKey: 'admin-rentals', injectOwnIdAs: 'reviewedById' },
  // Credit-check workflow — CompleteMockCreditCheck's client-supplied
  // `score` is never trusted even though the schema accepts it structurally;
  // dataController.js's execute() overwrites it server-side via
  // services/creditCheck.js before the mutation runs.
  RequestCreditCheck:  { kind: 'mutation', roles: ADMIN, featureKey: 'admin-rentals' },
  CompleteMockCreditCheck: { kind: 'mutation', roles: ADMIN, featureKey: 'admin-rentals' },
  DeclineCreditCheck:  { kind: 'mutation', roles: ADMIN, featureKey: 'admin-rentals' },

  // ── Org-scoped reads (the "user" dashboard) — any signed-in role, but
  //    always forced to the caller's OWN org, never the client's request ──
  ListRentalsByOrg:  { kind: 'query', roles: ADMIN, orgRoles: ['admin', 'user', 'driver'], orgField: 'organisationId' },
  ListVehiclesByOrg: { kind: 'query', roles: ADMIN, orgRoles: ['admin', 'user', 'driver'], orgField: 'organisationId' },
  // Rental timeline — same org-scoping shape as the two above. An admin
  // passes the target rental's real organisationId themselves (already
  // available client-side from the cached rental record); a user/driver's
  // organisationId is always overridden with their own regardless of what
  // they send, so a rentalId from another org just returns an empty list
  // (see the query's nested where filter in functions/gql/queries.gql).
  ListRentalEvents: { kind: 'query', roles: ADMIN, orgRoles: ['admin', 'user', 'driver'], orgField: 'organisationId' },

  // Marketplace browse — deliberately cross-organisation (no orgField
  // override, unlike every operation above): any signed-in role sees every
  // supplier's AVAILABLE listings platform-wide, not just their own org's
  // fleet. Distinct from ListVehiclesByOrg, which stays org-scoped for
  // rent-equipment.html's existing "my org's fleet" behaviour.
  ListMarketplaceVehicles: { kind: 'query', roles: ALL_ROLES },

  // ── Notifications — any signed-in role, own data only ──
  ListNotifications: { kind: 'query', roles: ADMIN, ownField: 'userId' },
  // No ownField here — a notification's own id isn't the owning user's id,
  // so that mechanism doesn't apply. Any signed-in role may call this;
  // dataController.js's execute() does the real per-row ownership check
  // (fetches the notification, verifies it belongs to the caller) before
  // running the mutation, same shape as its other fetch-then-verify gates.
  MarkNotificationRead: { kind: 'mutation', roles: ALL_ROLES },

  // ── Organisation management (admin) ──
  // Creating an org (ApproveOrgRequest creates one; CreateOrganisation is
  // the mutation it calls under the hood — see dc.js's approveOrgRequest)
  // and suspending/reinstating one are platform-owner-only. No featureKey
  // on these three, deliberately — same rule the doc comment above already
  // states for Role CRUD: a custom role must never be able to grant a
  // capability even a regular admin doesn't have, and the featureKey
  // fallback would otherwise do exactly that for anyone with edit on
  // 'admin-orgs'. Declining a request creates nothing, so it keeps the
  // regular ADMIN roles + featureKey gate, same as it always had.
  CreateOrganisation:  { kind: 'mutation', roles: SUPER_ADMIN_ONLY },
  UpdateOrgStatus:     { kind: 'mutation', roles: SUPER_ADMIN_ONLY },
  ApproveOrgRequest:   { kind: 'mutation', roles: SUPER_ADMIN_ONLY },
  RejectOrgRequest:    { kind: 'mutation', roles: ADMIN, featureKey: 'admin-orgs' },

  // ── User management (admin) ──
  CreateUser:         { kind: 'mutation', roles: ADMIN, featureKey: 'admin-orgs' },
  UpdateUserStatus:   { kind: 'mutation', roles: ADMIN, featureKey: 'admin-orgs' },
  UpdateUserRole:     { kind: 'mutation', roles: ADMIN, featureKey: 'admin-orgs' },

  // ── Profile — self or admin ──
  UpdateUserProfile: { kind: 'mutation', roles: ADMIN, ownField: 'id' },
  UpdateUserAvatar:  { kind: 'mutation', roles: ADMIN, ownField: 'id' },

  // ── Custom roles (admin only — never delegable) ──
  CreateRole:            { kind: 'mutation', roles: ADMIN },
  UpdateRole:             { kind: 'mutation', roles: ADMIN },
  DeleteRole:             { kind: 'mutation', roles: ADMIN },
  ListAllRoles:           { kind: 'query', roles: ADMIN },
  GetRoleById:            { kind: 'query', roles: ADMIN },
  AssignUserCustomRole: { kind: 'mutation', roles: ADMIN },

  // ── Reporting ── delegable so a custom role can grant read-only
  // Activity-tab access to admin-reports without granting admin.
  ListAuditLogs: { kind: 'query', roles: ADMIN, featureKey: 'admin-reports' },
  // Admin-wide notification engagement view — distinct from ListNotifications
  // above (self-scoped via ownField), same delegable shape as ListAuditLogs.
  ListAllNotifications: { kind: 'query', roles: ADMIN, featureKey: 'admin-reports' },

  // ── Vehicles (admin) ──
  CreateVehicle:         { kind: 'mutation', roles: ADMIN, featureKey: 'admin-fleet' },
  UpdateVehicleStatus:   { kind: 'mutation', roles: ADMIN, featureKey: 'admin-fleet' },
  UpdateVehicleKm:       { kind: 'mutation', roles: ADMIN, featureKey: 'admin-fleet' },
  UpdateVehicleService:  { kind: 'mutation', roles: ADMIN, featureKey: 'admin-fleet' },
  UpdateVehicleDetails:  { kind: 'mutation', roles: ADMIN, featureKey: 'admin-fleet' },
  AssignDriverToVehicle: { kind: 'mutation', roles: ADMIN, featureKey: 'admin-fleet' },
  UpdateVehicleListing:  { kind: 'mutation', roles: ADMIN, featureKey: 'admin-fleet' },
  DeleteVehicle:          { kind: 'mutation', roles: ADMIN, featureKey: 'admin-fleet' },

  // ── Maintenance ──
  // Reporting a vehicle issue isn't admin-only — a driver hitting a real
  // problem needs to be able to log it themselves. loggedByUserId is
  // server-forced to the caller's own id (injectOwnIdAs) so a driver can
  // never attribute a report to someone else.
  CreateMaintenanceQuery:  { kind: 'mutation', roles: [...ADMIN, 'driver', 'user'], featureKey: 'admin-maintenance', injectOwnIdAs: 'loggedByUserId' },
  UpdateMaintenanceStatus: { kind: 'mutation', roles: ADMIN, featureKey: 'admin-maintenance' },

  // ── Rentals (admin) ──
  CreateRental:        { kind: 'mutation', roles: ADMIN, featureKey: 'admin-rentals' },
  UpdateRentalStatus:  { kind: 'mutation', roles: ADMIN, featureKey: 'admin-rentals' },
  UpdateRental:         { kind: 'mutation', roles: ADMIN, featureKey: 'admin-rentals' },
  DeleteRental:         { kind: 'mutation', roles: ADMIN, featureKey: 'admin-rentals' },

  // ── Equipment Requests / Quotes (self-service RFQ marketplace) — any
  //    signed-in role. Posting a request and submitting a quote are both
  //    self-attributed (injectOwnIdAs/orgField server-force the caller's own
  //    id/org, exactly like every other self-scoped write above), so none
  //    of this needs admin gating — a user can't act as anyone but
  //    themselves or their own org no matter what the client sends. ──
  CreateEquipmentRequest: { kind: 'mutation', roles: ALL_ROLES, injectOwnIdAs: 'requestedById' },
  // Cross-org by design (any org should see what's needed platform-wide) —
  // same shape as ListMarketplaceVehicles, no orgField override.
  ListOpenEquipmentRequests: { kind: 'query', roles: ALL_ROLES },
  ListMyEquipmentRequests:   { kind: 'query', roles: ALL_ROLES, ownField: 'requestedById' },
  // roles: [] deliberately — op.roles is checked FIRST and short-circuits
  // the orgRoles override entirely if it matches (see execute()'s
  // `!authorized && op.orgRoles` guard), so anyone in `roles` would bypass
  // the org-force and could submit as an arbitrary org. Leaving it empty
  // means orgRoles/orgField is the ONLY path to authorization here —
  // supplierOrganisationId is always forced to the caller's own org, with
  // no admin bypass (unlike ListVehiclesByOrg, there's no legitimate case
  // for anyone acting as a different org's supplier).
  SubmitQuote: { kind: 'mutation', roles: [], orgRoles: ALL_ROLES, orgField: 'supplierOrganisationId', injectOwnIdAs: 'submittedById' },
  // Same roles: [] reasoning as SubmitQuote — supplierOrganisationId here
  // scopes which quotes are visible, and must always be forced to the
  // caller's own org so a supplier can never see a competitor's pricing.
  ListMyQuotes: { kind: 'query', roles: [], orgRoles: ALL_ROLES, orgField: 'supplierOrganisationId' },
  // Neither of these has an ownField/orgField that fits (a quote/request's
  // own id isn't the owning user's id) — real authorization is a
  // fetch-then-verify ownership check in dataController.js's execute(),
  // same shape as MarkNotificationRead's. roles: ALL_ROLES here is just the
  // base "must be signed in" gate; the ownership check is what actually
  // restricts these to the request's own requestedBy.
  ListQuotesForRequest: { kind: 'query', roles: ALL_ROLES },
  AcceptQuote:          { kind: 'mutation', roles: ALL_ROLES },
};
