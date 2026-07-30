const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const AccountType = {
  CHEQUE: "CHEQUE",
  SAVINGS: "SAVINGS",
  BUSINESS: "BUSINESS",
}
exports.AccountType = AccountType;

const ApplicationStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
}
exports.ApplicationStatus = ApplicationStatus;

const BankName = {
  ABSA: "ABSA",
  FNB: "FNB",
  STANDARD_BANK: "STANDARD_BANK",
  NEDBANK: "NEDBANK",
  CAPITEC: "CAPITEC",
  INVESTEC: "INVESTEC",
  AFRICAN_BANK: "AFRICAN_BANK",
  OTHER: "OTHER",
}
exports.BankName = BankName;

const CatalogCategory = {
  TRUCK: "TRUCK",
  EXCAVATOR: "EXCAVATOR",
  CRANE: "CRANE",
  FORKLIFT: "FORKLIFT",
  GENERATOR: "GENERATOR",
  DRILL_RIG: "DRILL_RIG",
  WHEEL_LOADER: "WHEEL_LOADER",
  ARTICULATED_HAULER: "ARTICULATED_HAULER",
  BACKHOE_LOADER: "BACKHOE_LOADER",
  OTHER: "OTHER",
}
exports.CatalogCategory = CatalogCategory;

const EmploymentStatus = {
  FULL_TIME_EMPLOYED: "FULL_TIME_EMPLOYED",
  SELF_EMPLOYED: "SELF_EMPLOYED",
  BUSINESS_OWNER: "BUSINESS_OWNER",
  CONTRACTOR: "CONTRACTOR",
}
exports.EmploymentStatus = EmploymentStatus;

const InquiryStatus = {
  NEW: "NEW",
  READ: "READ",
  REPLIED: "REPLIED",
}
exports.InquiryStatus = InquiryStatus;

const MaintenancePriority = {
  CRITICAL: "CRITICAL",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
}
exports.MaintenancePriority = MaintenancePriority;

const MaintenanceStatus = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
}
exports.MaintenanceStatus = MaintenanceStatus;

const MaintenanceType = {
  DRIVER_ISSUE: "DRIVER_ISSUE",
  ROADSIDE: "ROADSIDE",
  TYRES: "TYRES",
  WINDSCREEN: "WINDSCREEN",
  SERVICE: "SERVICE",
  GENERAL: "GENERAL",
}
exports.MaintenanceType = MaintenanceType;

const OrgRequestStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
}
exports.OrgRequestStatus = OrgRequestStatus;

const OrgStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
}
exports.OrgStatus = OrgStatus;

const RentalPurpose = {
  MINING_EXTRACTION: "MINING_EXTRACTION",
  CONSTRUCTION: "CONSTRUCTION",
  LOGISTICS_TRANSPORT: "LOGISTICS_TRANSPORT",
  WAREHOUSE_OPERATIONS: "WAREHOUSE_OPERATIONS",
  ENERGY_POWER: "ENERGY_POWER",
  OTHER: "OTHER",
}
exports.RentalPurpose = RentalPurpose;

const RentalStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  OVERDUE: "OVERDUE",
  COMPLETE: "COMPLETE",
  CANCELLED: "CANCELLED",
}
exports.RentalStatus = RentalStatus;

const SaProvince = {
  GAUTENG: "GAUTENG",
  WESTERN_CAPE: "WESTERN_CAPE",
  KWAZULU_NATAL: "KWAZULU_NATAL",
  EASTERN_CAPE: "EASTERN_CAPE",
  MPUMALANGA: "MPUMALANGA",
  LIMPOPO: "LIMPOPO",
  NORTH_WEST: "NORTH_WEST",
  NORTHERN_CAPE: "NORTHERN_CAPE",
  FREE_STATE: "FREE_STATE",
}
exports.SaProvince = SaProvince;

const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
  DRIVER: "DRIVER",
  GUEST: "GUEST",
}
exports.UserRole = UserRole;

const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
}
exports.UserStatus = UserStatus;

const VehicleStatus = {
  AVAILABLE: "AVAILABLE",
  ON_RENT: "ON_RENT",
  MAINTENANCE: "MAINTENANCE",
  RETIRED: "RETIRED",
}
exports.VehicleStatus = VehicleStatus;

const VehicleType = {
  EXCAVATOR: "EXCAVATOR",
  ARTICULATED_HAULER: "ARTICULATED_HAULER",
  WHEEL_LOADER: "WHEEL_LOADER",
  HEAVY_TRUCK: "HEAVY_TRUCK",
  BACKHOE_LOADER: "BACKHOE_LOADER",
  DRILL_RIG: "DRILL_RIG",
  CRANE: "CRANE",
  FORKLIFT: "FORKLIFT",
  GENERATOR: "GENERATOR",
  HIGH_REACH_TRUCK: "HIGH_REACH_TRUCK",
  CONTAINER_REACHSTACKER: "CONTAINER_REACHSTACKER",
  VAN: "VAN",
  OTHER: "OTHER",
}
exports.VehicleType = VehicleType;

const WaitlistStatus = {
  PENDING: "PENDING",
  NOTIFIED: "NOTIFIED",
  EXPIRED: "EXPIRED",
}
exports.WaitlistStatus = WaitlistStatus;

const connectorConfig = {
  connector: 'equipcore',
  service: 'novara-f985b-service',
  location: 'us-east1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createOrganisationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrganisation', inputVars);
}
createOrganisationRef.operationName = 'CreateOrganisation';
exports.createOrganisationRef = createOrganisationRef;

exports.createOrganisation = function createOrganisation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createOrganisationRef(dcInstance, inputVars));
}
;

const updateOrgStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrgStatus', inputVars);
}
updateOrgStatusRef.operationName = 'UpdateOrgStatus';
exports.updateOrgStatusRef = updateOrgStatusRef;

exports.updateOrgStatus = function updateOrgStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateOrgStatusRef(dcInstance, inputVars));
}
;

const updateOrganisationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrganisation', inputVars);
}
updateOrganisationRef.operationName = 'UpdateOrganisation';
exports.updateOrganisationRef = updateOrganisationRef;

exports.updateOrganisation = function updateOrganisation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateOrganisationRef(dcInstance, inputVars));
}
;

const deleteOrganisationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteOrganisation', inputVars);
}
deleteOrganisationRef.operationName = 'DeleteOrganisation';
exports.deleteOrganisationRef = deleteOrganisationRef;

exports.deleteOrganisation = function deleteOrganisation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteOrganisationRef(dcInstance, inputVars));
}
;

const createOrgRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrgRequest', inputVars);
}
createOrgRequestRef.operationName = 'CreateOrgRequest';
exports.createOrgRequestRef = createOrgRequestRef;

exports.createOrgRequest = function createOrgRequest(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createOrgRequestRef(dcInstance, inputVars));
}
;

const approveOrgRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ApproveOrgRequest', inputVars);
}
approveOrgRequestRef.operationName = 'ApproveOrgRequest';
exports.approveOrgRequestRef = approveOrgRequestRef;

exports.approveOrgRequest = function approveOrgRequest(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(approveOrgRequestRef(dcInstance, inputVars));
}
;

const rejectOrgRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RejectOrgRequest', inputVars);
}
rejectOrgRequestRef.operationName = 'RejectOrgRequest';
exports.rejectOrgRequestRef = rejectOrgRequestRef;

exports.rejectOrgRequest = function rejectOrgRequest(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(rejectOrgRequestRef(dcInstance, inputVars));
}
;

const deleteOrgRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteOrgRequest', inputVars);
}
deleteOrgRequestRef.operationName = 'DeleteOrgRequest';
exports.deleteOrgRequestRef = deleteOrgRequestRef;

exports.deleteOrgRequest = function deleteOrgRequest(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteOrgRequestRef(dcInstance, inputVars));
}
;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createUserRef(dcInstance, inputVars));
}
;

const updateUserStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserStatus', inputVars);
}
updateUserStatusRef.operationName = 'UpdateUserStatus';
exports.updateUserStatusRef = updateUserStatusRef;

exports.updateUserStatus = function updateUserStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateUserStatusRef(dcInstance, inputVars));
}
;

const updateUserRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserRole', inputVars);
}
updateUserRoleRef.operationName = 'UpdateUserRole';
exports.updateUserRoleRef = updateUserRoleRef;

exports.updateUserRole = function updateUserRole(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateUserRoleRef(dcInstance, inputVars));
}
;

const updateUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserProfile', inputVars);
}
updateUserProfileRef.operationName = 'UpdateUserProfile';
exports.updateUserProfileRef = updateUserProfileRef;

exports.updateUserProfile = function updateUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateUserProfileRef(dcInstance, inputVars));
}
;

const updateUserAvatarRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserAvatar', inputVars);
}
updateUserAvatarRef.operationName = 'UpdateUserAvatar';
exports.updateUserAvatarRef = updateUserAvatarRef;

exports.updateUserAvatar = function updateUserAvatar(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateUserAvatarRef(dcInstance, inputVars));
}
;

const recordUserLoginRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordUserLogin', inputVars);
}
recordUserLoginRef.operationName = 'RecordUserLogin';
exports.recordUserLoginRef = recordUserLoginRef;

exports.recordUserLogin = function recordUserLogin(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordUserLoginRef(dcInstance, inputVars));
}
;

const recordFailedLoginRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordFailedLogin', inputVars);
}
recordFailedLoginRef.operationName = 'RecordFailedLogin';
exports.recordFailedLoginRef = recordFailedLoginRef;

exports.recordFailedLogin = function recordFailedLogin(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordFailedLoginRef(dcInstance, inputVars));
}
;

const deleteUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteUser', inputVars);
}
deleteUserRef.operationName = 'DeleteUser';
exports.deleteUserRef = deleteUserRef;

exports.deleteUser = function deleteUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteUserRef(dcInstance, inputVars));
}
;

const createVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateVehicle', inputVars);
}
createVehicleRef.operationName = 'CreateVehicle';
exports.createVehicleRef = createVehicleRef;

exports.createVehicle = function createVehicle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createVehicleRef(dcInstance, inputVars));
}
;

const updateVehicleStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateVehicleStatus', inputVars);
}
updateVehicleStatusRef.operationName = 'UpdateVehicleStatus';
exports.updateVehicleStatusRef = updateVehicleStatusRef;

exports.updateVehicleStatus = function updateVehicleStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateVehicleStatusRef(dcInstance, inputVars));
}
;

const updateVehicleKmRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateVehicleKm', inputVars);
}
updateVehicleKmRef.operationName = 'UpdateVehicleKm';
exports.updateVehicleKmRef = updateVehicleKmRef;

exports.updateVehicleKm = function updateVehicleKm(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateVehicleKmRef(dcInstance, inputVars));
}
;

const updateVehicleServiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateVehicleService', inputVars);
}
updateVehicleServiceRef.operationName = 'UpdateVehicleService';
exports.updateVehicleServiceRef = updateVehicleServiceRef;

exports.updateVehicleService = function updateVehicleService(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateVehicleServiceRef(dcInstance, inputVars));
}
;

const updateVehicleOrgRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateVehicleOrg', inputVars);
}
updateVehicleOrgRef.operationName = 'UpdateVehicleOrg';
exports.updateVehicleOrgRef = updateVehicleOrgRef;

exports.updateVehicleOrg = function updateVehicleOrg(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateVehicleOrgRef(dcInstance, inputVars));
}
;

const updateVehicleDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateVehicleDetails', inputVars);
}
updateVehicleDetailsRef.operationName = 'UpdateVehicleDetails';
exports.updateVehicleDetailsRef = updateVehicleDetailsRef;

exports.updateVehicleDetails = function updateVehicleDetails(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateVehicleDetailsRef(dcInstance, inputVars));
}
;

const updateVehicleImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateVehicleImage', inputVars);
}
updateVehicleImageRef.operationName = 'UpdateVehicleImage';
exports.updateVehicleImageRef = updateVehicleImageRef;

exports.updateVehicleImage = function updateVehicleImage(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateVehicleImageRef(dcInstance, inputVars));
}
;

const deleteVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteVehicle', inputVars);
}
deleteVehicleRef.operationName = 'DeleteVehicle';
exports.deleteVehicleRef = deleteVehicleRef;

exports.deleteVehicle = function deleteVehicle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteVehicleRef(dcInstance, inputVars));
}
;

const addVehicleImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddVehicleImage', inputVars);
}
addVehicleImageRef.operationName = 'AddVehicleImage';
exports.addVehicleImageRef = addVehicleImageRef;

exports.addVehicleImage = function addVehicleImage(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addVehicleImageRef(dcInstance, inputVars));
}
;

const deleteVehicleImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteVehicleImage', inputVars);
}
deleteVehicleImageRef.operationName = 'DeleteVehicleImage';
exports.deleteVehicleImageRef = deleteVehicleImageRef;

exports.deleteVehicleImage = function deleteVehicleImage(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteVehicleImageRef(dcInstance, inputVars));
}
;

const createMaintenanceQueryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMaintenanceQuery', inputVars);
}
createMaintenanceQueryRef.operationName = 'CreateMaintenanceQuery';
exports.createMaintenanceQueryRef = createMaintenanceQueryRef;

exports.createMaintenanceQuery = function createMaintenanceQuery(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMaintenanceQueryRef(dcInstance, inputVars));
}
;

const updateMaintenanceStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMaintenanceStatus', inputVars);
}
updateMaintenanceStatusRef.operationName = 'UpdateMaintenanceStatus';
exports.updateMaintenanceStatusRef = updateMaintenanceStatusRef;

exports.updateMaintenanceStatus = function updateMaintenanceStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateMaintenanceStatusRef(dcInstance, inputVars));
}
;

const resolveMaintenanceQueryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ResolveMaintenanceQuery', inputVars);
}
resolveMaintenanceQueryRef.operationName = 'ResolveMaintenanceQuery';
exports.resolveMaintenanceQueryRef = resolveMaintenanceQueryRef;

exports.resolveMaintenanceQuery = function resolveMaintenanceQuery(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(resolveMaintenanceQueryRef(dcInstance, inputVars));
}
;

const updateMaintenancePriorityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMaintenancePriority', inputVars);
}
updateMaintenancePriorityRef.operationName = 'UpdateMaintenancePriority';
exports.updateMaintenancePriorityRef = updateMaintenancePriorityRef;

exports.updateMaintenancePriority = function updateMaintenancePriority(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateMaintenancePriorityRef(dcInstance, inputVars));
}
;

const deleteMaintenanceQueryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMaintenanceQuery', inputVars);
}
deleteMaintenanceQueryRef.operationName = 'DeleteMaintenanceQuery';
exports.deleteMaintenanceQueryRef = deleteMaintenanceQueryRef;

exports.deleteMaintenanceQuery = function deleteMaintenanceQuery(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMaintenanceQueryRef(dcInstance, inputVars));
}
;

const createRentalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRental', inputVars);
}
createRentalRef.operationName = 'CreateRental';
exports.createRentalRef = createRentalRef;

exports.createRental = function createRental(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createRentalRef(dcInstance, inputVars));
}
;

const updateRentalStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRentalStatus', inputVars);
}
updateRentalStatusRef.operationName = 'UpdateRentalStatus';
exports.updateRentalStatusRef = updateRentalStatusRef;

exports.updateRentalStatus = function updateRentalStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateRentalStatusRef(dcInstance, inputVars));
}
;

const updateRentalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRental', inputVars);
}
updateRentalRef.operationName = 'UpdateRental';
exports.updateRentalRef = updateRentalRef;

exports.updateRental = function updateRental(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateRentalRef(dcInstance, inputVars));
}
;

const deleteRentalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteRental', inputVars);
}
deleteRentalRef.operationName = 'DeleteRental';
exports.deleteRentalRef = deleteRentalRef;

exports.deleteRental = function deleteRental(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteRentalRef(dcInstance, inputVars));
}
;

const createRentalApplicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRentalApplication', inputVars);
}
createRentalApplicationRef.operationName = 'CreateRentalApplication';
exports.createRentalApplicationRef = createRentalApplicationRef;

exports.createRentalApplication = function createRentalApplication(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createRentalApplicationRef(dcInstance, inputVars));
}
;

const reviewRentalApplicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReviewRentalApplication', inputVars);
}
reviewRentalApplicationRef.operationName = 'ReviewRentalApplication';
exports.reviewRentalApplicationRef = reviewRentalApplicationRef;

exports.reviewRentalApplication = function reviewRentalApplication(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(reviewRentalApplicationRef(dcInstance, inputVars));
}
;

const attachApplicationDocumentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AttachApplicationDocuments', inputVars);
}
attachApplicationDocumentsRef.operationName = 'AttachApplicationDocuments';
exports.attachApplicationDocumentsRef = attachApplicationDocumentsRef;

exports.attachApplicationDocuments = function attachApplicationDocuments(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(attachApplicationDocumentsRef(dcInstance, inputVars));
}
;

const deleteRentalApplicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteRentalApplication', inputVars);
}
deleteRentalApplicationRef.operationName = 'DeleteRentalApplication';
exports.deleteRentalApplicationRef = deleteRentalApplicationRef;

exports.deleteRentalApplication = function deleteRentalApplication(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteRentalApplicationRef(dcInstance, inputVars));
}
;

const createCatalogItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCatalogItem', inputVars);
}
createCatalogItemRef.operationName = 'CreateCatalogItem';
exports.createCatalogItemRef = createCatalogItemRef;

exports.createCatalogItem = function createCatalogItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCatalogItemRef(dcInstance, inputVars));
}
;

const updateCatalogItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCatalogItem', inputVars);
}
updateCatalogItemRef.operationName = 'UpdateCatalogItem';
exports.updateCatalogItemRef = updateCatalogItemRef;

exports.updateCatalogItem = function updateCatalogItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateCatalogItemRef(dcInstance, inputVars));
}
;

const updateCatalogItemStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCatalogItemStatus', inputVars);
}
updateCatalogItemStatusRef.operationName = 'UpdateCatalogItemStatus';
exports.updateCatalogItemStatusRef = updateCatalogItemStatusRef;

exports.updateCatalogItemStatus = function updateCatalogItemStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateCatalogItemStatusRef(dcInstance, inputVars));
}
;

const deleteCatalogItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCatalogItem', inputVars);
}
deleteCatalogItemRef.operationName = 'DeleteCatalogItem';
exports.deleteCatalogItemRef = deleteCatalogItemRef;

exports.deleteCatalogItem = function deleteCatalogItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteCatalogItemRef(dcInstance, inputVars));
}
;

const addCatalogImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddCatalogImage', inputVars);
}
addCatalogImageRef.operationName = 'AddCatalogImage';
exports.addCatalogImageRef = addCatalogImageRef;

exports.addCatalogImage = function addCatalogImage(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addCatalogImageRef(dcInstance, inputVars));
}
;

const deleteCatalogImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCatalogImage', inputVars);
}
deleteCatalogImageRef.operationName = 'DeleteCatalogImage';
exports.deleteCatalogImageRef = deleteCatalogImageRef;

exports.deleteCatalogImage = function deleteCatalogImage(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteCatalogImageRef(dcInstance, inputVars));
}
;

const joinWaitlistRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'JoinWaitlist', inputVars);
}
joinWaitlistRef.operationName = 'JoinWaitlist';
exports.joinWaitlistRef = joinWaitlistRef;

exports.joinWaitlist = function joinWaitlist(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(joinWaitlistRef(dcInstance, inputVars));
}
;

const notifyWaitlistEntryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'NotifyWaitlistEntry', inputVars);
}
notifyWaitlistEntryRef.operationName = 'NotifyWaitlistEntry';
exports.notifyWaitlistEntryRef = notifyWaitlistEntryRef;

exports.notifyWaitlistEntry = function notifyWaitlistEntry(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(notifyWaitlistEntryRef(dcInstance, inputVars));
}
;

const expireWaitlistEntryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ExpireWaitlistEntry', inputVars);
}
expireWaitlistEntryRef.operationName = 'ExpireWaitlistEntry';
exports.expireWaitlistEntryRef = expireWaitlistEntryRef;

exports.expireWaitlistEntry = function expireWaitlistEntry(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(expireWaitlistEntryRef(dcInstance, inputVars));
}
;

const deleteWaitlistEntryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteWaitlistEntry', inputVars);
}
deleteWaitlistEntryRef.operationName = 'DeleteWaitlistEntry';
exports.deleteWaitlistEntryRef = deleteWaitlistEntryRef;

exports.deleteWaitlistEntry = function deleteWaitlistEntry(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteWaitlistEntryRef(dcInstance, inputVars));
}
;

const createContactInquiryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateContactInquiry', inputVars);
}
createContactInquiryRef.operationName = 'CreateContactInquiry';
exports.createContactInquiryRef = createContactInquiryRef;

exports.createContactInquiry = function createContactInquiry(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createContactInquiryRef(dcInstance, inputVars));
}
;

const updateInquiryStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInquiryStatus', inputVars);
}
updateInquiryStatusRef.operationName = 'UpdateInquiryStatus';
exports.updateInquiryStatusRef = updateInquiryStatusRef;

exports.updateInquiryStatus = function updateInquiryStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateInquiryStatusRef(dcInstance, inputVars));
}
;

const deleteContactInquiryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteContactInquiry', inputVars);
}
deleteContactInquiryRef.operationName = 'DeleteContactInquiry';
exports.deleteContactInquiryRef = deleteContactInquiryRef;

exports.deleteContactInquiry = function deleteContactInquiry(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteContactInquiryRef(dcInstance, inputVars));
}
;

const createAuditLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAuditLog', inputVars);
}
createAuditLogRef.operationName = 'CreateAuditLog';
exports.createAuditLogRef = createAuditLogRef;

exports.createAuditLog = function createAuditLog(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAuditLogRef(dcInstance, inputVars));
}
;

const listAllVehiclesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllVehicles');
}
listAllVehiclesRef.operationName = 'ListAllVehicles';
exports.listAllVehiclesRef = listAllVehiclesRef;

exports.listAllVehicles = function listAllVehicles(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllVehiclesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getVehicleByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetVehicleById', inputVars);
}
getVehicleByIdRef.operationName = 'GetVehicleById';
exports.getVehicleByIdRef = getVehicleByIdRef;

exports.getVehicleById = function getVehicleById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getVehicleByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listVehiclesByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVehiclesByStatus', inputVars);
}
listVehiclesByStatusRef.operationName = 'ListVehiclesByStatus';
exports.listVehiclesByStatusRef = listVehiclesByStatusRef;

exports.listVehiclesByStatus = function listVehiclesByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listVehiclesByStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listVehiclesByTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVehiclesByType', inputVars);
}
listVehiclesByTypeRef.operationName = 'ListVehiclesByType';
exports.listVehiclesByTypeRef = listVehiclesByTypeRef;

exports.listVehiclesByType = function listVehiclesByType(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listVehiclesByTypeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listVehiclesByOrgRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVehiclesByOrg', inputVars);
}
listVehiclesByOrgRef.operationName = 'ListVehiclesByOrg';
exports.listVehiclesByOrgRef = listVehiclesByOrgRef;

exports.listVehiclesByOrg = function listVehiclesByOrg(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listVehiclesByOrgRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllRentalsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllRentals');
}
listAllRentalsRef.operationName = 'ListAllRentals';
exports.listAllRentalsRef = listAllRentalsRef;

exports.listAllRentals = function listAllRentals(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllRentalsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getRentalByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRentalById', inputVars);
}
getRentalByIdRef.operationName = 'GetRentalById';
exports.getRentalByIdRef = getRentalByIdRef;

exports.getRentalById = function getRentalById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getRentalByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listRentalsByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListRentalsByStatus', inputVars);
}
listRentalsByStatusRef.operationName = 'ListRentalsByStatus';
exports.listRentalsByStatusRef = listRentalsByStatusRef;

exports.listRentalsByStatus = function listRentalsByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listRentalsByStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listRentalsByOrgRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListRentalsByOrg', inputVars);
}
listRentalsByOrgRef.operationName = 'ListRentalsByOrg';
exports.listRentalsByOrgRef = listRentalsByOrgRef;

exports.listRentalsByOrg = function listRentalsByOrg(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listRentalsByOrgRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllOrganisationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllOrganisations');
}
listAllOrganisationsRef.operationName = 'ListAllOrganisations';
exports.listAllOrganisationsRef = listAllOrganisationsRef;

exports.listAllOrganisations = function listAllOrganisations(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllOrganisationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrganisationByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganisationById', inputVars);
}
getOrganisationByIdRef.operationName = 'GetOrganisationById';
exports.getOrganisationByIdRef = getOrganisationByIdRef;

exports.getOrganisationById = function getOrganisationById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganisationByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listOrganisationsByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganisationsByStatus', inputVars);
}
listOrganisationsByStatusRef.operationName = 'ListOrganisationsByStatus';
exports.listOrganisationsByStatusRef = listOrganisationsByStatusRef;

exports.listOrganisationsByStatus = function listOrganisationsByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listOrganisationsByStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllOrgRequestsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllOrgRequests');
}
listAllOrgRequestsRef.operationName = 'ListAllOrgRequests';
exports.listAllOrgRequestsRef = listAllOrgRequestsRef;

exports.listAllOrgRequests = function listAllOrgRequests(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllOrgRequestsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrgRequestByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrgRequestById', inputVars);
}
getOrgRequestByIdRef.operationName = 'GetOrgRequestById';
exports.getOrgRequestByIdRef = getOrgRequestByIdRef;

exports.getOrgRequestById = function getOrgRequestById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrgRequestByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listOrgRequestsByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrgRequestsByStatus', inputVars);
}
listOrgRequestsByStatusRef.operationName = 'ListOrgRequestsByStatus';
exports.listOrgRequestsByStatusRef = listOrgRequestsByStatusRef;

exports.listOrgRequestsByStatus = function listOrgRequestsByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listOrgRequestsByStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllUsers');
}
listAllUsersRef.operationName = 'ListAllUsers';
exports.listAllUsersRef = listAllUsersRef;

exports.listAllUsers = function listAllUsers(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllUsersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getUserByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserById', inputVars);
}
getUserByIdRef.operationName = 'GetUserById';
exports.getUserByIdRef = getUserByIdRef;

exports.getUserById = function getUserById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listUsersByOrgRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsersByOrg', inputVars);
}
listUsersByOrgRef.operationName = 'ListUsersByOrg';
exports.listUsersByOrgRef = listUsersByOrgRef;

exports.listUsersByOrg = function listUsersByOrg(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUsersByOrgRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByEmail', inputVars);
}
getUserByEmailRef.operationName = 'GetUserByEmail';
exports.getUserByEmailRef = getUserByEmailRef;

exports.getUserByEmail = function getUserByEmail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserByEmailRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listUsersByRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsersByRole', inputVars);
}
listUsersByRoleRef.operationName = 'ListUsersByRole';
exports.listUsersByRoleRef = listUsersByRoleRef;

exports.listUsersByRole = function listUsersByRole(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUsersByRoleRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllMaintenanceQueriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllMaintenanceQueries');
}
listAllMaintenanceQueriesRef.operationName = 'ListAllMaintenanceQueries';
exports.listAllMaintenanceQueriesRef = listAllMaintenanceQueriesRef;

exports.listAllMaintenanceQueries = function listAllMaintenanceQueries(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllMaintenanceQueriesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMaintenanceByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMaintenanceById', inputVars);
}
getMaintenanceByIdRef.operationName = 'GetMaintenanceById';
exports.getMaintenanceByIdRef = getMaintenanceByIdRef;

exports.getMaintenanceById = function getMaintenanceById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMaintenanceByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listMaintenanceByVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMaintenanceByVehicle', inputVars);
}
listMaintenanceByVehicleRef.operationName = 'ListMaintenanceByVehicle';
exports.listMaintenanceByVehicleRef = listMaintenanceByVehicleRef;

exports.listMaintenanceByVehicle = function listMaintenanceByVehicle(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listMaintenanceByVehicleRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listMaintenanceByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMaintenanceByStatus', inputVars);
}
listMaintenanceByStatusRef.operationName = 'ListMaintenanceByStatus';
exports.listMaintenanceByStatusRef = listMaintenanceByStatusRef;

exports.listMaintenanceByStatus = function listMaintenanceByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listMaintenanceByStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listMaintenanceByPriorityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMaintenanceByPriority', inputVars);
}
listMaintenanceByPriorityRef.operationName = 'ListMaintenanceByPriority';
exports.listMaintenanceByPriorityRef = listMaintenanceByPriorityRef;

exports.listMaintenanceByPriority = function listMaintenanceByPriority(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listMaintenanceByPriorityRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllRentalApplicationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllRentalApplications');
}
listAllRentalApplicationsRef.operationName = 'ListAllRentalApplications';
exports.listAllRentalApplicationsRef = listAllRentalApplicationsRef;

exports.listAllRentalApplications = function listAllRentalApplications(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllRentalApplicationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getRentalApplicationByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRentalApplicationById', inputVars);
}
getRentalApplicationByIdRef.operationName = 'GetRentalApplicationById';
exports.getRentalApplicationByIdRef = getRentalApplicationByIdRef;

exports.getRentalApplicationById = function getRentalApplicationById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getRentalApplicationByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listRentalApplicationsByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListRentalApplicationsByStatus', inputVars);
}
listRentalApplicationsByStatusRef.operationName = 'ListRentalApplicationsByStatus';
exports.listRentalApplicationsByStatusRef = listRentalApplicationsByStatusRef;

exports.listRentalApplicationsByStatus = function listRentalApplicationsByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listRentalApplicationsByStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAuditLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAuditLogs', inputVars);
}
listAuditLogsRef.operationName = 'ListAuditLogs';
exports.listAuditLogsRef = listAuditLogsRef;

exports.listAuditLogs = function listAuditLogs(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(listAuditLogsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAuditLogsByActionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAuditLogsByAction', inputVars);
}
listAuditLogsByActionRef.operationName = 'ListAuditLogsByAction';
exports.listAuditLogsByActionRef = listAuditLogsByActionRef;

exports.listAuditLogsByAction = function listAuditLogsByAction(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAuditLogsByActionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAuditLogsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAuditLogsByUser', inputVars);
}
listAuditLogsByUserRef.operationName = 'ListAuditLogsByUser';
exports.listAuditLogsByUserRef = listAuditLogsByUserRef;

exports.listAuditLogsByUser = function listAuditLogsByUser(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listAuditLogsByUserRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllCatalogItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCatalogItems');
}
listAllCatalogItemsRef.operationName = 'ListAllCatalogItems';
exports.listAllCatalogItemsRef = listAllCatalogItemsRef;

exports.listAllCatalogItems = function listAllCatalogItems(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllCatalogItemsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCatalogItemsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCatalogItemsByCategory', inputVars);
}
listCatalogItemsByCategoryRef.operationName = 'ListCatalogItemsByCategory';
exports.listCatalogItemsByCategoryRef = listCatalogItemsByCategoryRef;

exports.listCatalogItemsByCategory = function listCatalogItemsByCategory(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCatalogItemsByCategoryRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getCatalogItemByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCatalogItemById', inputVars);
}
getCatalogItemByIdRef.operationName = 'GetCatalogItemById';
exports.getCatalogItemByIdRef = getCatalogItemByIdRef;

exports.getCatalogItemById = function getCatalogItemById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCatalogItemByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAvailableCatalogItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableCatalogItems');
}
listAvailableCatalogItemsRef.operationName = 'ListAvailableCatalogItems';
exports.listAvailableCatalogItemsRef = listAvailableCatalogItemsRef;

exports.listAvailableCatalogItems = function listAvailableCatalogItems(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAvailableCatalogItemsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listVehicleImagesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVehicleImages', inputVars);
}
listVehicleImagesRef.operationName = 'ListVehicleImages';
exports.listVehicleImagesRef = listVehicleImagesRef;

exports.listVehicleImages = function listVehicleImages(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listVehicleImagesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCatalogImagesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCatalogImages', inputVars);
}
listCatalogImagesRef.operationName = 'ListCatalogImages';
exports.listCatalogImagesRef = listCatalogImagesRef;

exports.listCatalogImages = function listCatalogImages(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCatalogImagesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllWaitlistEntriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllWaitlistEntries');
}
listAllWaitlistEntriesRef.operationName = 'ListAllWaitlistEntries';
exports.listAllWaitlistEntriesRef = listAllWaitlistEntriesRef;

exports.listAllWaitlistEntries = function listAllWaitlistEntries(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllWaitlistEntriesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listWaitlistByItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListWaitlistByItem', inputVars);
}
listWaitlistByItemRef.operationName = 'ListWaitlistByItem';
exports.listWaitlistByItemRef = listWaitlistByItemRef;

exports.listWaitlistByItem = function listWaitlistByItem(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listWaitlistByItemRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listWaitlistByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListWaitlistByStatus', inputVars);
}
listWaitlistByStatusRef.operationName = 'ListWaitlistByStatus';
exports.listWaitlistByStatusRef = listWaitlistByStatusRef;

exports.listWaitlistByStatus = function listWaitlistByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listWaitlistByStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAllContactInquiriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllContactInquiries');
}
listAllContactInquiriesRef.operationName = 'ListAllContactInquiries';
exports.listAllContactInquiriesRef = listAllContactInquiriesRef;

exports.listAllContactInquiries = function listAllContactInquiries(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllContactInquiriesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getContactInquiryByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetContactInquiryById', inputVars);
}
getContactInquiryByIdRef.operationName = 'GetContactInquiryById';
exports.getContactInquiryByIdRef = getContactInquiryByIdRef;

exports.getContactInquiryById = function getContactInquiryById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getContactInquiryByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listContactInquiriesByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListContactInquiriesByStatus', inputVars);
}
listContactInquiriesByStatusRef.operationName = 'ListContactInquiriesByStatus';
exports.listContactInquiriesByStatusRef = listContactInquiriesByStatusRef;

exports.listContactInquiriesByStatus = function listContactInquiriesByStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listContactInquiriesByStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
