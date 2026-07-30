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

const ADMIN = ['admin'];

module.exports = {
  // ── Admin dashboard reads ──
  ListAllOrganisations:      { kind: 'query', roles: ADMIN },
  ListAllOrgRequests:        { kind: 'query', roles: ADMIN },
  ListAllUsers:               { kind: 'query', roles: ADMIN },
  ListAllVehicles:             { kind: 'query', roles: ADMIN },
  ListAllMaintenanceQueries: { kind: 'query', roles: ADMIN },
  ListAllRentals:              { kind: 'query', roles: ADMIN },
  ListAllRentalApplications: { kind: 'query', roles: ADMIN },

  // ── Org-scoped reads (the "user" dashboard) — any signed-in role, but
  //    always forced to the caller's OWN org, never the client's request ──
  ListRentalsByOrg:  { kind: 'query', roles: ADMIN, orgRoles: ['admin', 'user', 'driver'], orgField: 'organisationId' },
  ListVehiclesByOrg: { kind: 'query', roles: ADMIN, orgRoles: ['admin', 'user', 'driver'], orgField: 'organisationId' },

  // ── Organisation management (admin) ──
  CreateOrganisation:  { kind: 'mutation', roles: ADMIN },
  UpdateOrgStatus:     { kind: 'mutation', roles: ADMIN },
  ApproveOrgRequest:   { kind: 'mutation', roles: ADMIN },
  RejectOrgRequest:    { kind: 'mutation', roles: ADMIN },

  // ── User management (admin) ──
  CreateUser:         { kind: 'mutation', roles: ADMIN },
  UpdateUserStatus:   { kind: 'mutation', roles: ADMIN },
  UpdateUserRole:     { kind: 'mutation', roles: ADMIN },

  // ── Profile — self or admin ──
  UpdateUserProfile: { kind: 'mutation', roles: ADMIN, ownField: 'id' },
  UpdateUserAvatar:  { kind: 'mutation', roles: ADMIN, ownField: 'id' },

  // ── Vehicles (admin) ──
  CreateVehicle:         { kind: 'mutation', roles: ADMIN },
  UpdateVehicleStatus:   { kind: 'mutation', roles: ADMIN },
  UpdateVehicleKm:       { kind: 'mutation', roles: ADMIN },
  UpdateVehicleService:  { kind: 'mutation', roles: ADMIN },
  UpdateVehicleDetails:  { kind: 'mutation', roles: ADMIN },
  DeleteVehicle:          { kind: 'mutation', roles: ADMIN },

  // ── Maintenance (admin) ──
  CreateMaintenanceQuery:  { kind: 'mutation', roles: ADMIN },
  UpdateMaintenanceStatus: { kind: 'mutation', roles: ADMIN },

  // ── Rentals (admin) ──
  CreateRental:        { kind: 'mutation', roles: ADMIN },
  UpdateRentalStatus:  { kind: 'mutation', roles: ADMIN },
  UpdateRental:         { kind: 'mutation', roles: ADMIN },
  DeleteRental:         { kind: 'mutation', roles: ADMIN },
};
