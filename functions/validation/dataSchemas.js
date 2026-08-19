'use strict';
// Server-side schema validation for every operation reachable through
// controllers/dataController.js. Data Connect's GraphQL layer already
// rejects wrong *types* (a non-UUID where UUID! is required, etc.), but
// that's not the same as business-level validation (length limits,
// non-empty checks, enum whitelists) — this is that layer. Every field a
// client can set is treated as hostile: validated here before it ever
// reaches services/dataConnect.js.

const { z } = require('zod');

// Data Connect returns/accepts UUIDs as bare 32-char hex (no dashes), not
// the canonical dashed form z.string().uuid() expects — that mismatch made
// every mutation referencing an existing row's id (approve/reject, status
// updates, deletes, reviews, ...) reject with 400 in production. Accept
// both forms.
const UUID_RE = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{32})$/i;
const uuid = () => z.string().regex(UUID_RE, 'Invalid uuid');
const optUuid = () => z.string().regex(UUID_RE, 'Invalid uuid').nullish();
const str = (max) => z.string().trim().min(1).max(max);
const optStr = (max) => z.string().trim().max(max).nullish();
const int32 = () => z.number().int().min(0).max(2147483647);
const money = () => z.number().finite().min(0).max(1e9);
const dateStr = () => z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD');
const optDateStr = () => dateStr().nullish();

// Custom-role feature keys — must match the page slugs security.js's
// PAGE_ROLES/sidebar.js's NAV use, and registry/dataOperations.js's
// featureKey values. Kept as one list so a typo in a new page slug can't
// silently create an ungrantable/unreachable feature.
const FEATURE_KEYS = ['admin-fleet', 'admin-rentals', 'admin-maintenance', 'admin-orgs', 'admin-audit', 'admin-reports'];
const permissionsJson = () => z.string().max(4000).refine((s) => {
  let obj;
  try { obj = JSON.parse(s); } catch { return false; }
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return false;
  return Object.entries(obj).every(([k, v]) => FEATURE_KEYS.includes(k) && (v === 'view' || v === 'edit'));
}, 'Invalid permissions object');

const USER_ROLE = z.enum(['ADMIN', 'USER', 'DRIVER', 'GUEST']);
const USER_STATUS = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']);
const ORG_STATUS = z.enum(['ACTIVE', 'SUSPENDED']);
const VEHICLE_STATUS = z.enum(['AVAILABLE', 'ON_RENT', 'MAINTENANCE', 'RETIRED']);
// Must stay a superset match of dataconnect/schema/schema.gql's VehicleType
// enum exactly — this used to be a much larger list than the DB enum
// supported (accepting values like TIPPER_TRUCK/MOBILE_CRANE that Postgres
// would reject with a 500); the schema enum was expanded to match this list
// (plus a handful of new SA-specific additions) instead of shrinking this
// one, so every value below is now genuinely valid end-to-end.
const VEHICLE_TYPE = z.enum([
  // Original 13, exact original order, then all SA-specific additions
  // appended after — see the matching comment on schema.gql's VehicleType
  // enum for why order (not just membership) matters here.
  'EXCAVATOR', 'ARTICULATED_HAULER', 'WHEEL_LOADER', 'HEAVY_TRUCK', 'BACKHOE_LOADER', 'DRILL_RIG',
  'CRANE', 'FORKLIFT', 'GENERATOR', 'HIGH_REACH_TRUCK', 'CONTAINER_REACHSTACKER', 'VAN', 'OTHER',
  'RIGID_TRUCK', 'TIPPER_TRUCK', 'SIDE_TIPPER', 'RIGID_DUMP_TRUCK', 'CONCRETE_MIXER', 'CRANE_TRUCK',
  'ROAD_SWEEPER', 'WATER_BOWSER', 'FLATBED_TRUCK', 'CURTAINSIDER_TRUCK', 'REFRIGERATED_TRUCK',
  'TANKER_TRUCK', 'CAR_TRANSPORTER', 'ASPHALT_PAVER', 'COLD_PLANER', 'CONCRETE_PUMP', 'SUPERLINK',
  'HORSE_TRAILER', 'FLATBED_TRAILER', 'CURTAINSIDER_TRAILER', 'REFRIGERATED_TRAILER',
  'TANKER_TRAILER', 'TIPPER_TRAILER', 'LOWBOY_TRAILER', 'SKELETAL_TRAILER',
  'CAR_TRANSPORTER_TRAILER', 'MINI_EXCAVATOR', 'COMPACT_TRACK_LOADER', 'SKID_STEER_LOADER',
  'BULLDOZER', 'MOTOR_GRADER', 'COMPACTOR', 'CRUSHER', 'SCREENING_PLANT', 'MOBILE_CRANE',
  'TOWER_CRANE', 'CRAWLER_CRANE', 'OVERHEAD_CRANE', 'BOOM_TRUCK', 'ROUGH_TERRAIN_FORKLIFT',
  'ORDER_PICKER', 'PALLET_JACK', 'TELEHANDLER', 'SCISSOR_LIFT', 'BOOM_LIFT', 'STRADDLE_CARRIER',
  'COMPRESSOR', 'LIGHT_TOWER', 'WATER_PUMP', 'TRACTOR', 'AGRICULTURAL_IMPLEMENT',
  'IRRIGATION_EQUIPMENT', 'PICKUP_TRUCK', 'MINIBUS',
]);
const HIRE_MODE = z.enum(['WET_HIRE', 'DRY_HIRE', 'EITHER']);
const MAINT_TYPE = z.enum(['DRIVER_ISSUE', 'ROADSIDE', 'TYRES', 'WINDSCREEN', 'SERVICE', 'GENERAL']);
const MAINT_PRIORITY = z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);
const MAINT_STATUS = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']);
const RENTAL_STATUS = z.enum(['PENDING', 'ACTIVE', 'OVERDUE', 'COMPLETE', 'CANCELLED']);
const APPLICATION_STATUS = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);

const EMPTY = z.object({}).strict();

const PROVINCE = z.enum([
  'GAUTENG', 'WESTERN_CAPE', 'KWAZULU_NATAL', 'EASTERN_CAPE', 'MPUMALANGA',
  'LIMPOPO', 'NORTH_WEST', 'NORTHERN_CAPE', 'FREE_STATE',
]);
const EMPLOYMENT_STATUS = z.enum(['FULL_TIME_EMPLOYED', 'SELF_EMPLOYED', 'BUSINESS_OWNER', 'CONTRACTOR']);
const BANK_NAME = z.enum(['ABSA', 'FNB', 'STANDARD_BANK', 'NEDBANK', 'CAPITEC', 'INVESTEC', 'AFRICAN_BANK', 'OTHER']);
const ACCOUNT_TYPE = z.enum(['CHEQUE', 'SAVINGS', 'BUSINESS']);
const RENTAL_PURPOSE = z.enum(['MINING_EXTRACTION', 'CONSTRUCTION', 'LOGISTICS_TRANSPORT', 'WAREHOUSE_OPERATIONS', 'ENERGY_POWER', 'OTHER']);
const email = () => z.string().trim().email().max(200);
const optEmail = () => z.string().trim().email().max(200).nullish();
const phone = () => z.string().trim().max(30);
const optPhone = () => z.string().trim().max(30).nullish();

const SCHEMAS = {
  // ── Reads: id/enum/org-scoped filters only ──
  ListAllOrganisations: EMPTY,
  ListAllOrgRequests: EMPTY,
  ListAllUsers: EMPTY,
  ListAllVehicles: EMPTY,
  // Cross-organisation marketplace browse — deliberately unscoped (see
  // registry/dataOperations.js's ListMarketplaceVehicles: roles ALL_ROLES,
  // no orgField override), unlike every other List* above.
  ListMarketplaceVehicles: EMPTY,
  ListAllMaintenanceQueries: EMPTY,
  ListAllRentals: EMPTY,
  ListAllRentalApplications: EMPTY,
  ListRentalsByOrg: z.object({ organisationId: uuid() }).strict(),
  ListVehiclesByOrg: z.object({ organisationId: uuid() }).strict(),
  ListRentalEvents: z.object({ rentalId: uuid(), organisationId: uuid() }).strict(),

  // ── Notifications ──
  ListNotifications: z.object({ userId: uuid() }).strict(),
  MarkNotificationRead: z.object({ id: uuid() }).strict(),

  // ── Organisations ──
  CreateOrganisation: z.object({
    name: str(200), sector: str(100), regId: str(50),
    contactEmail: z.string().trim().email().max(200),
    domain: str(200), logoUrl: optStr(2000),
  }).strict(),
  UpdateOrgStatus: z.object({ id: uuid(), status: ORG_STATUS }).strict(),
  ApproveOrgRequest: z.object({ id: uuid(), resultingOrgId: uuid(), adminNotes: optStr(2000) }).strict(),
  RejectOrgRequest: z.object({ id: uuid(), adminNotes: optStr(2000) }).strict(),

  // ── Users ──
  CreateUser: z.object({
    name: str(200), email: z.string().trim().email().max(200),
    role: USER_ROLE, organisationId: optUuid(), avatarUrl: optStr(2000),
  }).strict(),
  UpdateUserStatus: z.object({ id: uuid(), status: USER_STATUS }).strict(),
  UpdateUserRole: z.object({ id: uuid(), role: USER_ROLE }).strict(),
  UpdateUserProfile: z.object({
    id: uuid(), name: optStr(200), bio: optStr(4000), position: optStr(200),
    department: optStr(200), phone: optStr(30), avatarUrl: optStr(2000),
    // KYC / rental-readiness fields — see schema.gql's User doc comment.
    idNumber: optStr(20), dateOfBirth: optDateStr(), address: optStr(400),
    city: optStr(100), province: PROVINCE.nullish(), postalCode: optStr(10),
    employmentStatus: EMPLOYMENT_STATUS.nullish(), employerName: optStr(200),
    monthlyIncome: money().nullish(), yearsEmployed: z.number().int().min(0).max(80).nullish(),
    bank: BANK_NAME.nullish(), accountType: ACCOUNT_TYPE.nullish(), outstandingCredit: money().nullish(),
  }).strict(),
  UpdateUserAvatar: z.object({ id: uuid(), avatarUrl: str(2000) }).strict(),

  // ── Vehicles ──
  CreateVehicle: z.object({
    make: str(100), model: str(200), year: z.number().int().min(1950).max(2100),
    type: VEHICLE_TYPE, regPlate: str(20), description: optStr(4000),
    km: int32(), serviceIntervalKm: int32(), nextServiceKm: int32(),
    imageUrl: optStr(2000), organisationId: optUuid(),
  }).strict(),
  UpdateVehicleStatus: z.object({ id: uuid(), status: VEHICLE_STATUS }).strict(),
  UpdateVehicleKm: z.object({ id: uuid(), km: int32() }).strict(),
  UpdateVehicleService: z.object({ id: uuid(), nextServiceKm: int32(), serviceIntervalKm: int32() }).strict(),
  UpdateVehicleDetails: z.object({
    id: uuid(), make: str(100), model: str(200), year: z.number().int().min(1950).max(2100),
    type: VEHICLE_TYPE, regPlate: str(20), description: optStr(4000),
    km: int32(), serviceIntervalKm: int32(), nextServiceKm: int32(),
    vin: optStr(50), trackingCompany: optStr(100), lastServiceDate: optDateStr(),
  }).strict(),
  AssignDriverToVehicle: z.object({ id: uuid(), assignedDriverId: optUuid() }).strict(),
  // Marketplace listing terms — kept as its own mutation, separate from
  // UpdateVehicleDetails, so that mutation's existing contract (used by
  // vehicle-detail.html's main Save Changes form) never changes shape.
  UpdateVehicleListing: z.object({
    id: uuid(), province: PROVINCE.nullish(), hireMode: HIRE_MODE.nullish(),
    operatorIncluded: z.boolean().nullish(), fuelIncluded: z.boolean().nullish(), transportIncluded: z.boolean().nullish(),
    hourlyRate: money().nullish(), dailyRate: money().nullish(), weeklyRate: money().nullish(), monthlyRate: money().nullish(),
    supplierOrganisationId: optUuid(),
  }).strict(),
  DeleteVehicle: z.object({ id: uuid() }).strict(),

  // ── Maintenance ──
  CreateMaintenanceQuery: z.object({
    vehicleId: uuid(), vehicleLabel: str(300), type: MAINT_TYPE, description: str(4000),
    priority: MAINT_PRIORITY, loggedByName: str(200), loggedByUserId: optUuid(), issueImageUrl: optStr(2000),
  }).strict(),
  UpdateMaintenanceStatus: z.object({ id: uuid(), status: MAINT_STATUS }).strict(),

  // ── Rentals ──
  CreateRental: z.object({
    vehicleId: optUuid(), equipmentName: str(200), clientName: str(200), organisationId: optUuid(),
    startDate: dateStr(), returnDate: dateStr(), valueZar: money(),
    status: RENTAL_STATUS.nullish(), notes: optStr(4000),
  }).strict(),
  UpdateRentalStatus: z.object({ id: uuid(), status: RENTAL_STATUS }).strict(),
  UpdateRental: z.object({
    id: uuid(), startDate: optDateStr(), returnDate: optDateStr(), valueZar: money().nullish(),
    status: RENTAL_STATUS.nullish(), notes: optStr(4000),
  }).strict(),
  DeleteRental: z.object({ id: uuid() }).strict(),

  // ── Rental applications (admin review) ──
  // reviewedById is deliberately NOT accepted here — dataController.js's
  // injectOwnIdAs overrides it server-side with the caller's own resolved
  // user id, so it isn't even a client-supplied field in the first place.
  GetRentalApplicationById: z.object({ id: uuid() }).strict(),
  ReviewRentalApplication: z.object({
    id: uuid(), status: APPLICATION_STATUS, rejectionReason: optStr(1000),
  }).strict(),

  // Credit-check workflow. `score` on CompleteMockCreditCheck is accepted
  // structurally (the mutation itself requires it) but dataController.js
  // always overwrites it server-side before running the mutation — never
  // trust the client-supplied value.
  RequestCreditCheck: z.object({ id: uuid() }).strict(),
  CompleteMockCreditCheck: z.object({ id: uuid(), score: z.number().int().min(0).max(999) }).strict(),
  // acknowledged must be exactly `true` — this is the server-side
  // enforcement of the liability warning, not just a UI gate.
  DeclineCreditCheck: z.object({ id: uuid(), acknowledged: z.literal(true) }).strict(),

  // ── Custom roles ── permissions is a JSON-encoded object
  // { [featureKey]: 'view'|'edit' } — must match the page slugs
  // security.js's PAGE_ROLES/sidebar.js know about. Validated by parsing
  // and checking shape, not just "is a string", since this JSON blob is
  // itself the actual authorization data dataController.js reads back out.
  ListAllRoles: EMPTY,
  GetRoleById: z.object({ id: uuid() }).strict(),
  CreateRole: z.object({
    name: str(100), description: optStr(2000), permissions: permissionsJson(), createdById: optUuid(),
  }).strict(),
  UpdateRole: z.object({
    id: uuid(), name: str(100), description: optStr(2000), permissions: permissionsJson(),
  }).strict(),
  DeleteRole: z.object({ id: uuid() }).strict(),
  AssignUserCustomRole: z.object({ id: uuid(), customRoleId: optUuid() }).strict(),

  ListAuditLogs: z.object({ limit: z.number().int().min(1).max(500).nullish() }).strict(),
  ListAllNotifications: z.object({ limit: z.number().int().min(1).max(500).nullish() }).strict(),
};

// Operations reachable WITHOUT signing in — anyone (including anonymous
// visitors) is meant to be able to submit these forms. No role/ownership
// check applies (see controllers/dataController.js's submitPublic), so
// this validation is the ONLY server-side gate standing between hostile
// input and the database for these four.
const PUBLIC_SCHEMAS = {
  CreateOrgRequest: z.object({
    orgName: str(200), sector: str(100), regId: str(50),
    contactName: str(200), contactEmail: email(), domain: str(200),
  }).strict(),

  JoinWaitlist: z.object({
    catalogItemId: uuid(), userId: optUuid(), name: str(200), email: email(), phone: optPhone(),
  }).strict(),

  CreateContactInquiry: z.object({
    referenceId: str(20), name: str(200), email: email(), subject: str(300), message: str(4000),
  }).strict(),

  CreateRentalApplication: z.object({
    ref: str(20), applicantUserId: optUuid(), organisationId: optUuid(),
    firstName: str(100), lastName: str(100), idNumber: str(20), dateOfBirth: dateStr(),
    email: email(), phone: phone(), address: str(400), city: optStr(100),
    province: PROVINCE.nullish(), postalCode: optStr(10),
    employmentStatus: EMPLOYMENT_STATUS, employerName: str(200),
    monthlyIncome: money(), yearsEmployed: z.number().int().min(0).max(80).nullish(),
    bank: BANK_NAME, accountType: ACCOUNT_TYPE.nullish(), outstandingCredit: money().nullish(),
    creditCheckConsent: z.boolean().nullish(),
    vehicleId: optUuid(), equipmentName: str(200), dailyRate: money().nullish(),
    startDate: dateStr(), endDate: dateStr(), estimatedCost: money().nullish(),
    deliveryAddress: str(400), purpose: RENTAL_PURPOSE.nullish(), rentalNotes: optStr(4000),
    consentCreditCheck: z.boolean(), consentTerms: z.boolean(), consentUnderstanding: z.boolean(),
  }).strict(),
};

// registerSelf — called authenticated, right after Firebase Auth signup
// (see controllers/dataController.js). All the KYC fields below are
// optional here (a caller mid-migration or using an older client build
// might send only name) but termsAccepted is hard-required: the server
// stamps termsAcceptedAt itself the moment this is true, never trusting a
// client-supplied timestamp.
const REGISTER_SELF_SCHEMA = z.object({
  name: str(200),
  phone: optPhone(), idNumber: optStr(20), dateOfBirth: optDateStr(),
  address: optStr(400), city: optStr(100), province: PROVINCE.nullish(), postalCode: optStr(10),
  employmentStatus: EMPLOYMENT_STATUS.nullish(), employerName: optStr(200),
  monthlyIncome: money().nullish(), yearsEmployed: z.number().int().min(0).max(80).nullish(),
  bank: BANK_NAME.nullish(), accountType: ACCOUNT_TYPE.nullish(), outstandingCredit: money().nullish(),
  termsAccepted: z.boolean(),
}).strict();

// getUserByEmail has its own small body validated inline in the controller
// (not routed through the generic registry).
module.exports = { SCHEMAS, PUBLIC_SCHEMAS, REGISTER_SELF_SCHEMA, str, uuid };
