'use strict';
// Server-side schema validation for every operation reachable through
// controllers/dataController.js. Data Connect's GraphQL layer already
// rejects wrong *types* (a non-UUID where UUID! is required, etc.), but
// that's not the same as business-level validation (length limits,
// non-empty checks, enum whitelists) — this is that layer. Every field a
// client can set is treated as hostile: validated here before it ever
// reaches services/dataConnect.js.

const { z } = require('zod');

const uuid = () => z.string().uuid();
const optUuid = () => z.string().uuid().nullish();
const str = (max) => z.string().trim().min(1).max(max);
const optStr = (max) => z.string().trim().max(max).nullish();
const int32 = () => z.number().int().min(0).max(2147483647);
const money = () => z.number().finite().min(0).max(1e9);
const dateStr = () => z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD');
const optDateStr = () => dateStr().nullish();

const USER_ROLE = z.enum(['ADMIN', 'USER', 'DRIVER', 'GUEST']);
const USER_STATUS = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']);
const ORG_STATUS = z.enum(['ACTIVE', 'SUSPENDED']);
const VEHICLE_STATUS = z.enum(['AVAILABLE', 'ON_RENT', 'MAINTENANCE', 'RETIRED']);
const VEHICLE_TYPE = z.enum([
  'EXCAVATOR', 'MINI_EXCAVATOR', 'BACKHOE_LOADER', 'WHEEL_LOADER', 'COMPACT_TRACK_LOADER',
  'SKID_STEER_LOADER', 'BULLDOZER', 'MOTOR_GRADER', 'COMPACTOR', 'HEAVY_TRUCK', 'RIGID_TRUCK',
  'TIPPER_TRUCK', 'FLATBED_TRUCK', 'CURTAINSIDER_TRUCK', 'REFRIGERATED_TRUCK', 'TANKER_TRUCK',
  'CONCRETE_MIXER', 'CAR_TRANSPORTER', 'CRANE_TRUCK', 'FLATBED_TRAILER', 'CURTAINSIDER_TRAILER',
  'REFRIGERATED_TRAILER', 'TANKER_TRAILER', 'TIPPER_TRAILER', 'LOWBOY_TRAILER', 'SKELETAL_TRAILER',
  'CAR_TRANSPORTER_TRAILER', 'DRILL_RIG', 'RIGID_DUMP_TRUCK', 'ARTICULATED_HAULER', 'CRANE',
  'MOBILE_CRANE', 'TOWER_CRANE', 'CRAWLER_CRANE', 'OVERHEAD_CRANE', 'BOOM_TRUCK',
  'CONTAINER_REACHSTACKER', 'STRADDLE_CARRIER', 'HIGH_REACH_TRUCK', 'FORKLIFT',
  'ROUGH_TERRAIN_FORKLIFT', 'ORDER_PICKER', 'PALLET_JACK', 'TELEHANDLER', 'SCISSOR_LIFT',
  'BOOM_LIFT', 'GENERATOR', 'COMPRESSOR', 'LIGHT_TOWER', 'WATER_PUMP', 'ROAD_SWEEPER',
  'WATER_BOWSER', 'CONCRETE_PUMP', 'ASPHALT_PAVER', 'COLD_PLANER', 'VAN', 'PICKUP_TRUCK',
  'MINIBUS', 'OTHER',
]);
const MAINT_TYPE = z.enum(['DRIVER_ISSUE', 'ROADSIDE', 'TYRES', 'WINDSCREEN', 'SERVICE', 'GENERAL']);
const MAINT_PRIORITY = z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);
const MAINT_STATUS = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']);
const RENTAL_STATUS = z.enum(['PENDING', 'ACTIVE', 'OVERDUE', 'COMPLETE', 'CANCELLED']);

const EMPTY = z.object({}).strict();

const SCHEMAS = {
  // ── Reads: id/enum/org-scoped filters only ──
  ListAllOrganisations: EMPTY,
  ListAllOrgRequests: EMPTY,
  ListAllUsers: EMPTY,
  ListAllVehicles: EMPTY,
  ListAllMaintenanceQueries: EMPTY,
  ListAllRentals: EMPTY,
  ListAllRentalApplications: EMPTY,
  ListRentalsByOrg: z.object({ organisationId: uuid() }).strict(),
  ListVehiclesByOrg: z.object({ organisationId: uuid() }).strict(),

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
};

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

// registerSelf / getUserByEmail have their own small bodies validated
// inline in the controller (not routed through the generic registry).
module.exports = { SCHEMAS, PUBLIC_SCHEMAS, str, uuid };
