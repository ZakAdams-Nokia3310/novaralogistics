import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum AccountType {
  CHEQUE = "CHEQUE",
  SAVINGS = "SAVINGS",
  BUSINESS = "BUSINESS",
};

export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
};

export enum BankName {
  ABSA = "ABSA",
  FNB = "FNB",
  STANDARD_BANK = "STANDARD_BANK",
  NEDBANK = "NEDBANK",
  CAPITEC = "CAPITEC",
  INVESTEC = "INVESTEC",
  AFRICAN_BANK = "AFRICAN_BANK",
  OTHER = "OTHER",
};

export enum CatalogCategory {
  TRUCK = "TRUCK",
  EXCAVATOR = "EXCAVATOR",
  CRANE = "CRANE",
  FORKLIFT = "FORKLIFT",
  GENERATOR = "GENERATOR",
  DRILL_RIG = "DRILL_RIG",
  WHEEL_LOADER = "WHEEL_LOADER",
  ARTICULATED_HAULER = "ARTICULATED_HAULER",
  BACKHOE_LOADER = "BACKHOE_LOADER",
  OTHER = "OTHER",
};

export enum EmploymentStatus {
  FULL_TIME_EMPLOYED = "FULL_TIME_EMPLOYED",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  BUSINESS_OWNER = "BUSINESS_OWNER",
  CONTRACTOR = "CONTRACTOR",
};

export enum InquiryStatus {
  NEW = "NEW",
  READ = "READ",
  REPLIED = "REPLIED",
};

export enum MaintenancePriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
};

export enum MaintenanceStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
};

export enum MaintenanceType {
  DRIVER_ISSUE = "DRIVER_ISSUE",
  ROADSIDE = "ROADSIDE",
  TYRES = "TYRES",
  WINDSCREEN = "WINDSCREEN",
  SERVICE = "SERVICE",
  GENERAL = "GENERAL",
};

export enum OrgRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
};

export enum OrgStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
};

export enum RentalPurpose {
  MINING_EXTRACTION = "MINING_EXTRACTION",
  CONSTRUCTION = "CONSTRUCTION",
  LOGISTICS_TRANSPORT = "LOGISTICS_TRANSPORT",
  WAREHOUSE_OPERATIONS = "WAREHOUSE_OPERATIONS",
  ENERGY_POWER = "ENERGY_POWER",
  OTHER = "OTHER",
};

export enum RentalStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  OVERDUE = "OVERDUE",
  COMPLETE = "COMPLETE",
  CANCELLED = "CANCELLED",
};

export enum SaProvince {
  GAUTENG = "GAUTENG",
  WESTERN_CAPE = "WESTERN_CAPE",
  KWAZULU_NATAL = "KWAZULU_NATAL",
  EASTERN_CAPE = "EASTERN_CAPE",
  MPUMALANGA = "MPUMALANGA",
  LIMPOPO = "LIMPOPO",
  NORTH_WEST = "NORTH_WEST",
  NORTHERN_CAPE = "NORTHERN_CAPE",
  FREE_STATE = "FREE_STATE",
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  DRIVER = "DRIVER",
  GUEST = "GUEST",
};

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
};

export enum VehicleStatus {
  AVAILABLE = "AVAILABLE",
  ON_RENT = "ON_RENT",
  MAINTENANCE = "MAINTENANCE",
  RETIRED = "RETIRED",
};

export enum VehicleType {
  EXCAVATOR = "EXCAVATOR",
  ARTICULATED_HAULER = "ARTICULATED_HAULER",
  WHEEL_LOADER = "WHEEL_LOADER",
  HEAVY_TRUCK = "HEAVY_TRUCK",
  BACKHOE_LOADER = "BACKHOE_LOADER",
  DRILL_RIG = "DRILL_RIG",
  CRANE = "CRANE",
  FORKLIFT = "FORKLIFT",
  GENERATOR = "GENERATOR",
  HIGH_REACH_TRUCK = "HIGH_REACH_TRUCK",
  CONTAINER_REACHSTACKER = "CONTAINER_REACHSTACKER",
  VAN = "VAN",
  OTHER = "OTHER",
};

export enum WaitlistStatus {
  PENDING = "PENDING",
  NOTIFIED = "NOTIFIED",
  EXPIRED = "EXPIRED",
};



export interface AddCatalogImageData {
  catalogImage_insert: CatalogImage_Key;
}

export interface AddCatalogImageVariables {
  catalogItemId: UUIDString;
  imageUrl: string;
  caption?: string | null;
  sortOrder?: number | null;
}

export interface AddVehicleImageData {
  vehicleImage_insert: VehicleImage_Key;
}

export interface AddVehicleImageVariables {
  vehicleId: UUIDString;
  imageUrl: string;
  caption?: string | null;
  sortOrder?: number | null;
}

export interface ApproveOrgRequestData {
  orgRequest_update?: OrgRequest_Key | null;
}

export interface ApproveOrgRequestVariables {
  id: UUIDString;
  resultingOrgId: UUIDString;
  adminNotes?: string | null;
}

export interface AttachApplicationDocumentsData {
  rentalApplication_update?: RentalApplication_Key | null;
}

export interface AttachApplicationDocumentsVariables {
  id: UUIDString;
  idDocumentUrl?: string | null;
  proofOfIncomeUrl?: string | null;
  supportingDocUrl?: string | null;
}

export interface AuditLog_Key {
  id: UUIDString;
  __typename?: 'AuditLog_Key';
}

export interface CatalogImage_Key {
  id: UUIDString;
  __typename?: 'CatalogImage_Key';
}

export interface CatalogItem_Key {
  id: UUIDString;
  __typename?: 'CatalogItem_Key';
}

export interface ContactInquiry_Key {
  id: UUIDString;
  __typename?: 'ContactInquiry_Key';
}

export interface CreateAuditLogData {
  auditLog_insert: AuditLog_Key;
}

export interface CreateAuditLogVariables {
  userId?: UUIDString | null;
  userName?: string | null;
  userRole?: string | null;
  action: string;
  details?: string | null;
  page?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface CreateCatalogItemData {
  catalogItem_insert: CatalogItem_Key;
}

export interface CreateCatalogItemVariables {
  name: string;
  subtitle?: string | null;
  category: CatalogCategory;
  description?: string | null;
  specs?: string | null;
  dailyRate: number;
  status?: VehicleStatus | null;
  availableFrom?: DateString | null;
  imageUrl: string;
}

export interface CreateContactInquiryData {
  contactInquiry_insert: ContactInquiry_Key;
}

export interface CreateContactInquiryVariables {
  referenceId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CreateMaintenanceQueryData {
  maintenanceQuery_insert: MaintenanceQuery_Key;
}

export interface CreateMaintenanceQueryVariables {
  vehicleId: UUIDString;
  vehicleLabel: string;
  type: MaintenanceType;
  description: string;
  priority: MaintenancePriority;
  loggedByName: string;
  loggedByUserId?: UUIDString | null;
  issueImageUrl?: string | null;
}

export interface CreateOrgRequestData {
  orgRequest_insert: OrgRequest_Key;
}

export interface CreateOrgRequestVariables {
  orgName: string;
  sector: string;
  regId: string;
  contactName: string;
  contactEmail: string;
  domain: string;
}

export interface CreateOrganisationData {
  organisation_insert: Organisation_Key;
}

export interface CreateOrganisationVariables {
  name: string;
  sector: string;
  regId: string;
  contactEmail: string;
  domain: string;
  logoUrl?: string | null;
}

export interface CreateRentalApplicationData {
  rentalApplication_insert: RentalApplication_Key;
}

export interface CreateRentalApplicationVariables {
  ref: string;
  applicantUserId?: UUIDString | null;
  organisationId?: UUIDString | null;
  firstName: string;
  lastName: string;
  idNumber: string;
  dateOfBirth: DateString;
  email: string;
  phone: string;
  address: string;
  city?: string | null;
  province?: SaProvince | null;
  postalCode?: string | null;
  employmentStatus: EmploymentStatus;
  employerName: string;
  monthlyIncome: number;
  yearsEmployed?: number | null;
  bank: BankName;
  accountType?: AccountType | null;
  outstandingCredit?: number | null;
  creditCheckConsent?: boolean | null;
  vehicleId?: UUIDString | null;
  equipmentName: string;
  dailyRate?: number | null;
  startDate: DateString;
  endDate: DateString;
  estimatedCost?: number | null;
  deliveryAddress: string;
  purpose?: RentalPurpose | null;
  rentalNotes?: string | null;
  consentCreditCheck: boolean;
  consentTerms: boolean;
  consentUnderstanding: boolean;
}

export interface CreateRentalData {
  rental_insert: Rental_Key;
}

export interface CreateRentalVariables {
  vehicleId?: UUIDString | null;
  equipmentName: string;
  clientName: string;
  organisationId?: UUIDString | null;
  startDate: DateString;
  returnDate: DateString;
  valueZar: number;
  status?: RentalStatus | null;
  notes?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  name: string;
  email: string;
  role: UserRole;
  organisationId?: UUIDString | null;
  avatarUrl?: string | null;
}

export interface CreateVehicleData {
  vehicle_insert: Vehicle_Key;
}

export interface CreateVehicleVariables {
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  regPlate: string;
  description?: string | null;
  km: number;
  serviceIntervalKm: number;
  nextServiceKm: number;
  imageUrl?: string | null;
  organisationId?: UUIDString | null;
}

export interface DeleteCatalogImageData {
  catalogImage_delete?: CatalogImage_Key | null;
}

export interface DeleteCatalogImageVariables {
  id: UUIDString;
}

export interface DeleteCatalogItemData {
  catalogItem_delete?: CatalogItem_Key | null;
}

export interface DeleteCatalogItemVariables {
  id: UUIDString;
}

export interface DeleteContactInquiryData {
  contactInquiry_delete?: ContactInquiry_Key | null;
}

export interface DeleteContactInquiryVariables {
  id: UUIDString;
}

export interface DeleteMaintenanceQueryData {
  maintenanceQuery_delete?: MaintenanceQuery_Key | null;
}

export interface DeleteMaintenanceQueryVariables {
  id: UUIDString;
}

export interface DeleteOrgRequestData {
  orgRequest_delete?: OrgRequest_Key | null;
}

export interface DeleteOrgRequestVariables {
  id: UUIDString;
}

export interface DeleteOrganisationData {
  organisation_delete?: Organisation_Key | null;
}

export interface DeleteOrganisationVariables {
  id: UUIDString;
}

export interface DeleteRentalApplicationData {
  rentalApplication_delete?: RentalApplication_Key | null;
}

export interface DeleteRentalApplicationVariables {
  id: UUIDString;
}

export interface DeleteRentalData {
  rental_delete?: Rental_Key | null;
}

export interface DeleteRentalVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface DeleteUserVariables {
  id: UUIDString;
}

export interface DeleteVehicleData {
  vehicle_delete?: Vehicle_Key | null;
}

export interface DeleteVehicleImageData {
  vehicleImage_delete?: VehicleImage_Key | null;
}

export interface DeleteVehicleImageVariables {
  id: UUIDString;
}

export interface DeleteVehicleVariables {
  id: UUIDString;
}

export interface DeleteWaitlistEntryData {
  waitlistEntry_delete?: WaitlistEntry_Key | null;
}

export interface DeleteWaitlistEntryVariables {
  id: UUIDString;
}

export interface ExpireWaitlistEntryData {
  waitlistEntry_update?: WaitlistEntry_Key | null;
}

export interface ExpireWaitlistEntryVariables {
  id: UUIDString;
}

export interface GetCatalogItemByIdData {
  catalogItem?: {
    id: UUIDString;
    name: string;
    subtitle?: string | null;
    category: CatalogCategory;
    description?: string | null;
    specs?: string | null;
    dailyRate: number;
    status: VehicleStatus;
    availableFrom?: DateString | null;
    imageUrl: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & CatalogItem_Key;
}

export interface GetCatalogItemByIdVariables {
  id: UUIDString;
}

export interface GetContactInquiryByIdData {
  contactInquiry?: {
    id: UUIDString;
    referenceId: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: InquiryStatus;
    repliedBy?: {
      id: UUIDString;
      name: string;
      email: string;
    } & User_Key;
    repliedAt?: TimestampString | null;
    submittedAt: TimestampString;
  } & ContactInquiry_Key;
}

export interface GetContactInquiryByIdVariables {
  id: UUIDString;
}

export interface GetMaintenanceByIdData {
  maintenanceQuery?: {
    id: UUIDString;
    vehicle: {
      id: UUIDString;
      make: string;
      model: string;
      regPlate: string;
      type: VehicleType;
    } & Vehicle_Key;
    vehicleLabel: string;
    loggedByName: string;
    loggedByUser?: {
      id: UUIDString;
      name: string;
      email: string;
    } & User_Key;
    type: MaintenanceType;
    description: string;
    priority: MaintenancePriority;
    status: MaintenanceStatus;
    resolvedAt?: TimestampString | null;
    updatedAt: TimestampString;
  } & MaintenanceQuery_Key;
}

export interface GetMaintenanceByIdVariables {
  id: UUIDString;
}

export interface GetOrgRequestByIdData {
  orgRequest?: {
    id: UUIDString;
    orgName: string;
    sector: string;
    regId: string;
    contactName: string;
    contactEmail: string;
    domain: string;
    status: OrgRequestStatus;
    adminNotes?: string | null;
    resultingOrg?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    submittedAt: TimestampString;
    updatedAt: TimestampString;
  } & OrgRequest_Key;
}

export interface GetOrgRequestByIdVariables {
  id: UUIDString;
}

export interface GetOrganisationByIdData {
  organisation?: {
    id: UUIDString;
    name: string;
    sector: string;
    regId: string;
    contactEmail: string;
    domain: string;
    logoUrl?: string | null;
    status: OrgStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organisation_Key;
}

export interface GetOrganisationByIdVariables {
  id: UUIDString;
}

export interface GetRentalApplicationByIdData {
  rentalApplication?: {
    id: UUIDString;
    applicantUser?: {
      id: UUIDString;
      name: string;
      email: string;
    } & User_Key;
    firstName: string;
    lastName: string;
    idNumber: string;
    dateOfBirth: DateString;
    email: string;
    phone: string;
    address: string;
    city?: string | null;
    province?: SaProvince | null;
    postalCode?: string | null;
    employmentStatus: EmploymentStatus;
    employerName: string;
    monthlyIncome: number;
    yearsEmployed?: number | null;
    bank: BankName;
    accountType: AccountType;
    outstandingCredit: number;
    vehicle?: {
      id: UUIDString;
      make: string;
      model: string;
      regPlate: string;
    } & Vehicle_Key;
    equipmentName: string;
    startDate: DateString;
    endDate: DateString;
    deliveryAddress: string;
    purpose?: RentalPurpose | null;
    rentalNotes?: string | null;
    status: ApplicationStatus;
    submittedAt: TimestampString;
    updatedAt: TimestampString;
  } & RentalApplication_Key;
}

export interface GetRentalApplicationByIdVariables {
  id: UUIDString;
}

export interface GetRentalByIdData {
  rental?: {
    id: UUIDString;
    vehicle?: {
      id: UUIDString;
      make: string;
      model: string;
      regPlate: string;
      type: VehicleType;
      imageUrl?: string | null;
    } & Vehicle_Key;
    equipmentName: string;
    clientName: string;
    organisation?: {
      id: UUIDString;
      name: string;
      contactEmail: string;
    } & Organisation_Key;
    startDate: DateString;
    returnDate: DateString;
    valueZar: number;
    status: RentalStatus;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Rental_Key;
}

export interface GetRentalByIdVariables {
  id: UUIDString;
}

export interface GetUserByEmailData {
  users: ({
    id: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    organisation?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    status: UserStatus;
    avatarUrl?: string | null;
    bio?: string | null;
    position?: string | null;
    department?: string | null;
    phone?: string | null;
    createdAt: TimestampString;
  } & User_Key)[];
}

export interface GetUserByEmailVariables {
  email: string;
}

export interface GetUserByIdData {
  user?: {
    id: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    organisation?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    status: UserStatus;
    avatarUrl?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key;
}

export interface GetUserByIdVariables {
  id: UUIDString;
}

export interface GetVehicleByIdData {
  vehicle?: {
    id: UUIDString;
    organisation?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    make: string;
    model: string;
    year: number;
    type: VehicleType;
    regPlate: string;
    description?: string | null;
    km: number;
    serviceIntervalKm: number;
    nextServiceKm: number;
    status: VehicleStatus;
    imageUrl?: string | null;
    vin?: string | null;
    trackingCompany?: string | null;
    lastServiceDate?: DateString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Vehicle_Key;
}

export interface GetVehicleByIdVariables {
  id: UUIDString;
}

export interface JoinWaitlistData {
  waitlistEntry_insert: WaitlistEntry_Key;
}

export interface JoinWaitlistVariables {
  catalogItemId: UUIDString;
  userId?: UUIDString | null;
  name: string;
  email: string;
  phone?: string | null;
}

export interface ListAllCatalogItemsData {
  catalogItems: ({
    id: UUIDString;
    name: string;
    subtitle?: string | null;
    category: CatalogCategory;
    description?: string | null;
    specs?: string | null;
    dailyRate: number;
    status: VehicleStatus;
    imageUrl: string;
  } & CatalogItem_Key)[];
}

export interface ListAllContactInquiriesData {
  contactInquiries: ({
    id: UUIDString;
    referenceId: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: InquiryStatus;
    repliedBy?: {
      id: UUIDString;
      name: string;
    } & User_Key;
    repliedAt?: TimestampString | null;
    submittedAt: TimestampString;
  } & ContactInquiry_Key)[];
}

export interface ListAllMaintenanceQueriesData {
  maintenanceQueries: ({
    id: UUIDString;
    vehicle: {
      id: UUIDString;
      make: string;
      model: string;
      regPlate: string;
    } & Vehicle_Key;
    vehicleLabel: string;
    loggedByName: string;
    loggedByUser?: {
      id: UUIDString;
      name: string;
    } & User_Key;
    type: MaintenanceType;
    description: string;
    priority: MaintenancePriority;
    status: MaintenanceStatus;
    resolvedAt?: TimestampString | null;
    updatedAt: TimestampString;
  } & MaintenanceQuery_Key)[];
}

export interface ListAllOrgRequestsData {
  orgRequests: ({
    id: UUIDString;
    orgName: string;
    sector: string;
    regId: string;
    contactName: string;
    contactEmail: string;
    domain: string;
    status: OrgRequestStatus;
    adminNotes?: string | null;
    resultingOrg?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    submittedAt: TimestampString;
    updatedAt: TimestampString;
  } & OrgRequest_Key)[];
}

export interface ListAllOrganisationsData {
  organisations: ({
    id: UUIDString;
    name: string;
    sector: string;
    regId: string;
    contactEmail: string;
    domain: string;
    logoUrl?: string | null;
    status: OrgStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organisation_Key)[];
}

export interface ListAllRentalApplicationsData {
  rentalApplications: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    equipmentName: string;
    vehicle?: {
      id: UUIDString;
      make: string;
      model: string;
    } & Vehicle_Key;
    startDate: DateString;
    endDate: DateString;
    status: ApplicationStatus;
    submittedAt: TimestampString;
    updatedAt: TimestampString;
  } & RentalApplication_Key)[];
}

export interface ListAllRentalsData {
  rentals: ({
    id: UUIDString;
    vehicle?: {
      id: UUIDString;
      make: string;
      model: string;
      regPlate: string;
    } & Vehicle_Key;
    equipmentName: string;
    clientName: string;
    organisation?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    startDate: DateString;
    returnDate: DateString;
    valueZar: number;
    status: RentalStatus;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Rental_Key)[];
}

export interface ListAllUsersData {
  users: ({
    id: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    organisation?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    status: UserStatus;
    avatarUrl?: string | null;
    bio?: string | null;
    position?: string | null;
    department?: string | null;
    phone?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key)[];
}

export interface ListAllVehiclesData {
  vehicles: ({
    id: UUIDString;
    organisation?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    make: string;
    model: string;
    year: number;
    type: VehicleType;
    regPlate: string;
    description?: string | null;
    km: number;
    serviceIntervalKm: number;
    nextServiceKm: number;
    status: VehicleStatus;
    imageUrl?: string | null;
    vin?: string | null;
    trackingCompany?: string | null;
    lastServiceDate?: DateString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Vehicle_Key)[];
}

export interface ListAllWaitlistEntriesData {
  waitlistEntries: ({
    id: UUIDString;
    catalogItem: {
      id: UUIDString;
      name: string;
    } & CatalogItem_Key;
    user?: {
      id: UUIDString;
      name: string;
      email: string;
    } & User_Key;
    name: string;
    email: string;
    phone?: string | null;
    status: WaitlistStatus;
    submittedAt: TimestampString;
    notifiedAt?: TimestampString | null;
  } & WaitlistEntry_Key)[];
}

export interface ListAuditLogsByActionData {
  auditLogs: ({
    id: UUIDString;
    userName?: string | null;
    userRole?: string | null;
    action: string;
    details?: string | null;
    page?: string | null;
    createdAt: TimestampString;
  } & AuditLog_Key)[];
}

export interface ListAuditLogsByActionVariables {
  action: string;
}

export interface ListAuditLogsByUserData {
  auditLogs: ({
    id: UUIDString;
    userName?: string | null;
    userRole?: string | null;
    action: string;
    details?: string | null;
    page?: string | null;
    createdAt: TimestampString;
  } & AuditLog_Key)[];
}

export interface ListAuditLogsByUserVariables {
  userId: UUIDString;
}

export interface ListAuditLogsData {
  auditLogs: ({
    id: UUIDString;
    user?: {
      id: UUIDString;
      name: string;
    } & User_Key;
    userName?: string | null;
    userRole?: string | null;
    action: string;
    details?: string | null;
    page?: string | null;
    ipAddress?: string | null;
    createdAt: TimestampString;
  } & AuditLog_Key)[];
}

export interface ListAuditLogsVariables {
  limit?: number | null;
}

export interface ListAvailableCatalogItemsData {
  catalogItems: ({
    id: UUIDString;
    name: string;
    subtitle?: string | null;
    category: CatalogCategory;
    description?: string | null;
    specs?: string | null;
    dailyRate: number;
    imageUrl: string;
  } & CatalogItem_Key)[];
}

export interface ListCatalogImagesData {
  catalogImages: ({
    id: UUIDString;
    imageUrl: string;
    caption?: string | null;
    sortOrder: number;
    uploadedAt: TimestampString;
  } & CatalogImage_Key)[];
}

export interface ListCatalogImagesVariables {
  catalogItemId: UUIDString;
}

export interface ListCatalogItemsByCategoryData {
  catalogItems: ({
    id: UUIDString;
    name: string;
    category: CatalogCategory;
    description?: string | null;
    dailyRate: number;
    specs?: string | null;
    status: VehicleStatus;
    imageUrl: string;
  } & CatalogItem_Key)[];
}

export interface ListCatalogItemsByCategoryVariables {
  category: CatalogCategory;
}

export interface ListContactInquiriesByStatusData {
  contactInquiries: ({
    id: UUIDString;
    referenceId: string;
    name: string;
    email: string;
    subject: string;
    status: InquiryStatus;
    submittedAt: TimestampString;
  } & ContactInquiry_Key)[];
}

export interface ListContactInquiriesByStatusVariables {
  status: InquiryStatus;
}

export interface ListMaintenanceByPriorityData {
  maintenanceQueries: ({
    id: UUIDString;
    vehicle: {
      id: UUIDString;
      make: string;
      model: string;
      regPlate: string;
    } & Vehicle_Key;
    type: MaintenanceType;
    description: string;
    priority: MaintenancePriority;
    status: MaintenanceStatus;
    createdAt: TimestampString;
  } & MaintenanceQuery_Key)[];
}

export interface ListMaintenanceByPriorityVariables {
  priority: MaintenancePriority;
}

export interface ListMaintenanceByStatusData {
  maintenanceQueries: ({
    id: UUIDString;
    vehicle: {
      id: UUIDString;
      make: string;
      model: string;
      regPlate: string;
    } & Vehicle_Key;
    type: MaintenanceType;
    description: string;
    priority: MaintenancePriority;
    status: MaintenanceStatus;
    createdAt: TimestampString;
  } & MaintenanceQuery_Key)[];
}

export interface ListMaintenanceByStatusVariables {
  status: MaintenanceStatus;
}

export interface ListMaintenanceByVehicleData {
  maintenanceQueries: ({
    id: UUIDString;
    type: MaintenanceType;
    description: string;
    priority: MaintenancePriority;
    status: MaintenanceStatus;
    loggedByName: string;
    createdAt: TimestampString;
    resolvedAt?: TimestampString | null;
  } & MaintenanceQuery_Key)[];
}

export interface ListMaintenanceByVehicleVariables {
  vehicleId: UUIDString;
}

export interface ListOrgRequestsByStatusData {
  orgRequests: ({
    id: UUIDString;
    orgName: string;
    contactName: string;
    contactEmail: string;
    status: OrgRequestStatus;
    submittedAt: TimestampString;
  } & OrgRequest_Key)[];
}

export interface ListOrgRequestsByStatusVariables {
  status: OrgRequestStatus;
}

export interface ListOrganisationsByStatusData {
  organisations: ({
    id: UUIDString;
    name: string;
    sector: string;
    contactEmail: string;
    status: OrgStatus;
  } & Organisation_Key)[];
}

export interface ListOrganisationsByStatusVariables {
  status: OrgStatus;
}

export interface ListRentalApplicationsByStatusData {
  rentalApplications: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    email: string;
    equipmentName: string;
    startDate: DateString;
    endDate: DateString;
    status: ApplicationStatus;
    submittedAt: TimestampString;
  } & RentalApplication_Key)[];
}

export interface ListRentalApplicationsByStatusVariables {
  status: ApplicationStatus;
}

export interface ListRentalsByOrgData {
  rentals: ({
    id: UUIDString;
    vehicle?: {
      id: UUIDString;
      make: string;
      model: string;
      regPlate: string;
    } & Vehicle_Key;
    equipmentName: string;
    startDate: DateString;
    returnDate: DateString;
    valueZar: number;
    status: RentalStatus;
  } & Rental_Key)[];
}

export interface ListRentalsByOrgVariables {
  organisationId: UUIDString;
}

export interface ListRentalsByStatusData {
  rentals: ({
    id: UUIDString;
    vehicle?: {
      id: UUIDString;
      make: string;
      model: string;
      regPlate: string;
    } & Vehicle_Key;
    equipmentName: string;
    clientName: string;
    organisation?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    startDate: DateString;
    returnDate: DateString;
    valueZar: number;
    status: RentalStatus;
  } & Rental_Key)[];
}

export interface ListRentalsByStatusVariables {
  status: RentalStatus;
}

export interface ListUsersByOrgData {
  users: ({
    id: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
  } & User_Key)[];
}

export interface ListUsersByOrgVariables {
  organisationId: UUIDString;
}

export interface ListUsersByRoleData {
  users: ({
    id: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    avatarUrl?: string | null;
  } & User_Key)[];
}

export interface ListUsersByRoleVariables {
  role: UserRole;
}

export interface ListVehicleImagesData {
  vehicleImages: ({
    id: UUIDString;
    imageUrl: string;
    caption?: string | null;
    sortOrder: number;
    uploadedAt: TimestampString;
  } & VehicleImage_Key)[];
}

export interface ListVehicleImagesVariables {
  vehicleId: UUIDString;
}

export interface ListVehiclesByOrgData {
  vehicles: ({
    id: UUIDString;
    organisation?: {
      id: UUIDString;
      name: string;
    } & Organisation_Key;
    make: string;
    model: string;
    year: number;
    type: VehicleType;
    regPlate: string;
    description?: string | null;
    km: number;
    serviceIntervalKm: number;
    nextServiceKm: number;
    status: VehicleStatus;
    imageUrl?: string | null;
    vin?: string | null;
    trackingCompany?: string | null;
    lastServiceDate?: DateString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Vehicle_Key)[];
}

export interface ListVehiclesByOrgVariables {
  organisationId: UUIDString;
}

export interface ListVehiclesByStatusData {
  vehicles: ({
    id: UUIDString;
    make: string;
    model: string;
    year: number;
    type: VehicleType;
    regPlate: string;
    km: number;
    status: VehicleStatus;
    imageUrl?: string | null;
  } & Vehicle_Key)[];
}

export interface ListVehiclesByStatusVariables {
  status: VehicleStatus;
}

export interface ListVehiclesByTypeData {
  vehicles: ({
    id: UUIDString;
    make: string;
    model: string;
    year: number;
    type: VehicleType;
    regPlate: string;
    status: VehicleStatus;
    imageUrl?: string | null;
  } & Vehicle_Key)[];
}

export interface ListVehiclesByTypeVariables {
  type: VehicleType;
}

export interface ListWaitlistByItemData {
  waitlistEntries: ({
    id: UUIDString;
    name: string;
    email: string;
    phone?: string | null;
    status: WaitlistStatus;
    submittedAt: TimestampString;
    notifiedAt?: TimestampString | null;
  } & WaitlistEntry_Key)[];
}

export interface ListWaitlistByItemVariables {
  catalogItemId: UUIDString;
}

export interface ListWaitlistByStatusData {
  waitlistEntries: ({
    id: UUIDString;
    catalogItem: {
      id: UUIDString;
      name: string;
    } & CatalogItem_Key;
    name: string;
    email: string;
    status: WaitlistStatus;
    submittedAt: TimestampString;
  } & WaitlistEntry_Key)[];
}

export interface ListWaitlistByStatusVariables {
  status: WaitlistStatus;
}

export interface MaintenanceQuery_Key {
  id: UUIDString;
  __typename?: 'MaintenanceQuery_Key';
}

export interface NotifyWaitlistEntryData {
  waitlistEntry_update?: WaitlistEntry_Key | null;
}

export interface NotifyWaitlistEntryVariables {
  id: UUIDString;
}

export interface OrgRequest_Key {
  id: UUIDString;
  __typename?: 'OrgRequest_Key';
}

export interface Organisation_Key {
  id: UUIDString;
  __typename?: 'Organisation_Key';
}

export interface RecordFailedLoginData {
  user_update?: User_Key | null;
}

export interface RecordFailedLoginVariables {
  id: UUIDString;
  failedAttempts: number;
  lockedUntil?: TimestampString | null;
}

export interface RecordUserLoginData {
  user_update?: User_Key | null;
}

export interface RecordUserLoginVariables {
  id: UUIDString;
}

export interface RejectOrgRequestData {
  orgRequest_update?: OrgRequest_Key | null;
}

export interface RejectOrgRequestVariables {
  id: UUIDString;
  adminNotes?: string | null;
}

export interface RentalApplication_Key {
  id: UUIDString;
  __typename?: 'RentalApplication_Key';
}

export interface Rental_Key {
  id: UUIDString;
  __typename?: 'Rental_Key';
}

export interface ResolveMaintenanceQueryData {
  maintenanceQuery_update?: MaintenanceQuery_Key | null;
}

export interface ResolveMaintenanceQueryVariables {
  id: UUIDString;
  resolvedById: UUIDString;
  resolutionNotes?: string | null;
}

export interface ReviewRentalApplicationData {
  rentalApplication_update?: RentalApplication_Key | null;
}

export interface ReviewRentalApplicationVariables {
  id: UUIDString;
  status: ApplicationStatus;
  reviewedById: UUIDString;
  rejectionReason?: string | null;
}

export interface UpdateCatalogItemData {
  catalogItem_update?: CatalogItem_Key | null;
}

export interface UpdateCatalogItemStatusData {
  catalogItem_update?: CatalogItem_Key | null;
}

export interface UpdateCatalogItemStatusVariables {
  id: UUIDString;
  status: VehicleStatus;
  availableFrom?: DateString | null;
}

export interface UpdateCatalogItemVariables {
  id: UUIDString;
  name?: string | null;
  subtitle?: string | null;
  description?: string | null;
  specs?: string | null;
  dailyRate?: number | null;
  imageUrl?: string | null;
}

export interface UpdateInquiryStatusData {
  contactInquiry_update?: ContactInquiry_Key | null;
}

export interface UpdateInquiryStatusVariables {
  id: UUIDString;
  status: InquiryStatus;
  repliedById?: UUIDString | null;
}

export interface UpdateMaintenancePriorityData {
  maintenanceQuery_update?: MaintenanceQuery_Key | null;
}

export interface UpdateMaintenancePriorityVariables {
  id: UUIDString;
  priority: MaintenancePriority;
}

export interface UpdateMaintenanceStatusData {
  maintenanceQuery_update?: MaintenanceQuery_Key | null;
}

export interface UpdateMaintenanceStatusVariables {
  id: UUIDString;
  status: MaintenanceStatus;
}

export interface UpdateOrgStatusData {
  organisation_update?: Organisation_Key | null;
}

export interface UpdateOrgStatusVariables {
  id: UUIDString;
  status: OrgStatus;
}

export interface UpdateOrganisationData {
  organisation_update?: Organisation_Key | null;
}

export interface UpdateOrganisationVariables {
  id: UUIDString;
  name?: string | null;
  sector?: string | null;
  contactEmail?: string | null;
  domain?: string | null;
  logoUrl?: string | null;
}

export interface UpdateRentalData {
  rental_update?: Rental_Key | null;
}

export interface UpdateRentalStatusData {
  rental_update?: Rental_Key | null;
}

export interface UpdateRentalStatusVariables {
  id: UUIDString;
  status: RentalStatus;
}

export interface UpdateRentalVariables {
  id: UUIDString;
  startDate?: DateString | null;
  returnDate?: DateString | null;
  valueZar?: number | null;
  status?: RentalStatus | null;
  notes?: string | null;
}

export interface UpdateUserAvatarData {
  user_update?: User_Key | null;
}

export interface UpdateUserAvatarVariables {
  id: UUIDString;
  avatarUrl: string;
}

export interface UpdateUserProfileData {
  user_update?: User_Key | null;
}

export interface UpdateUserProfileVariables {
  id: UUIDString;
  name?: string | null;
  bio?: string | null;
  position?: string | null;
  department?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
}

export interface UpdateUserRoleData {
  user_update?: User_Key | null;
}

export interface UpdateUserRoleVariables {
  id: UUIDString;
  role: UserRole;
}

export interface UpdateUserStatusData {
  user_update?: User_Key | null;
}

export interface UpdateUserStatusVariables {
  id: UUIDString;
  status: UserStatus;
}

export interface UpdateVehicleDetailsData {
  vehicle_update?: Vehicle_Key | null;
}

export interface UpdateVehicleDetailsVariables {
  id: UUIDString;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  regPlate: string;
  description?: string | null;
  km: number;
  serviceIntervalKm: number;
  nextServiceKm: number;
  vin?: string | null;
  trackingCompany?: string | null;
  lastServiceDate?: DateString | null;
}

export interface UpdateVehicleImageData {
  vehicle_update?: Vehicle_Key | null;
}

export interface UpdateVehicleImageVariables {
  id: UUIDString;
  imageUrl: string;
}

export interface UpdateVehicleKmData {
  vehicle_update?: Vehicle_Key | null;
}

export interface UpdateVehicleKmVariables {
  id: UUIDString;
  km: number;
}

export interface UpdateVehicleOrgData {
  vehicle_update?: Vehicle_Key | null;
}

export interface UpdateVehicleOrgVariables {
  id: UUIDString;
  organisationId?: UUIDString | null;
}

export interface UpdateVehicleServiceData {
  vehicle_update?: Vehicle_Key | null;
}

export interface UpdateVehicleServiceVariables {
  id: UUIDString;
  nextServiceKm: number;
  serviceIntervalKm: number;
}

export interface UpdateVehicleStatusData {
  vehicle_update?: Vehicle_Key | null;
}

export interface UpdateVehicleStatusVariables {
  id: UUIDString;
  status: VehicleStatus;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface VehicleImage_Key {
  id: UUIDString;
  __typename?: 'VehicleImage_Key';
}

export interface Vehicle_Key {
  id: UUIDString;
  __typename?: 'Vehicle_Key';
}

export interface WaitlistEntry_Key {
  id: UUIDString;
  __typename?: 'WaitlistEntry_Key';
}

interface CreateOrganisationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganisationVariables): MutationRef<CreateOrganisationData, CreateOrganisationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrganisationVariables): MutationRef<CreateOrganisationData, CreateOrganisationVariables>;
  operationName: string;
}
export const createOrganisationRef: CreateOrganisationRef;

export function createOrganisation(vars: CreateOrganisationVariables): MutationPromise<CreateOrganisationData, CreateOrganisationVariables>;
export function createOrganisation(dc: DataConnect, vars: CreateOrganisationVariables): MutationPromise<CreateOrganisationData, CreateOrganisationVariables>;

interface UpdateOrgStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrgStatusVariables): MutationRef<UpdateOrgStatusData, UpdateOrgStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrgStatusVariables): MutationRef<UpdateOrgStatusData, UpdateOrgStatusVariables>;
  operationName: string;
}
export const updateOrgStatusRef: UpdateOrgStatusRef;

export function updateOrgStatus(vars: UpdateOrgStatusVariables): MutationPromise<UpdateOrgStatusData, UpdateOrgStatusVariables>;
export function updateOrgStatus(dc: DataConnect, vars: UpdateOrgStatusVariables): MutationPromise<UpdateOrgStatusData, UpdateOrgStatusVariables>;

interface UpdateOrganisationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganisationVariables): MutationRef<UpdateOrganisationData, UpdateOrganisationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrganisationVariables): MutationRef<UpdateOrganisationData, UpdateOrganisationVariables>;
  operationName: string;
}
export const updateOrganisationRef: UpdateOrganisationRef;

export function updateOrganisation(vars: UpdateOrganisationVariables): MutationPromise<UpdateOrganisationData, UpdateOrganisationVariables>;
export function updateOrganisation(dc: DataConnect, vars: UpdateOrganisationVariables): MutationPromise<UpdateOrganisationData, UpdateOrganisationVariables>;

interface DeleteOrganisationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrganisationVariables): MutationRef<DeleteOrganisationData, DeleteOrganisationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteOrganisationVariables): MutationRef<DeleteOrganisationData, DeleteOrganisationVariables>;
  operationName: string;
}
export const deleteOrganisationRef: DeleteOrganisationRef;

export function deleteOrganisation(vars: DeleteOrganisationVariables): MutationPromise<DeleteOrganisationData, DeleteOrganisationVariables>;
export function deleteOrganisation(dc: DataConnect, vars: DeleteOrganisationVariables): MutationPromise<DeleteOrganisationData, DeleteOrganisationVariables>;

interface CreateOrgRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrgRequestVariables): MutationRef<CreateOrgRequestData, CreateOrgRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrgRequestVariables): MutationRef<CreateOrgRequestData, CreateOrgRequestVariables>;
  operationName: string;
}
export const createOrgRequestRef: CreateOrgRequestRef;

export function createOrgRequest(vars: CreateOrgRequestVariables): MutationPromise<CreateOrgRequestData, CreateOrgRequestVariables>;
export function createOrgRequest(dc: DataConnect, vars: CreateOrgRequestVariables): MutationPromise<CreateOrgRequestData, CreateOrgRequestVariables>;

interface ApproveOrgRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApproveOrgRequestVariables): MutationRef<ApproveOrgRequestData, ApproveOrgRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ApproveOrgRequestVariables): MutationRef<ApproveOrgRequestData, ApproveOrgRequestVariables>;
  operationName: string;
}
export const approveOrgRequestRef: ApproveOrgRequestRef;

export function approveOrgRequest(vars: ApproveOrgRequestVariables): MutationPromise<ApproveOrgRequestData, ApproveOrgRequestVariables>;
export function approveOrgRequest(dc: DataConnect, vars: ApproveOrgRequestVariables): MutationPromise<ApproveOrgRequestData, ApproveOrgRequestVariables>;

interface RejectOrgRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RejectOrgRequestVariables): MutationRef<RejectOrgRequestData, RejectOrgRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RejectOrgRequestVariables): MutationRef<RejectOrgRequestData, RejectOrgRequestVariables>;
  operationName: string;
}
export const rejectOrgRequestRef: RejectOrgRequestRef;

export function rejectOrgRequest(vars: RejectOrgRequestVariables): MutationPromise<RejectOrgRequestData, RejectOrgRequestVariables>;
export function rejectOrgRequest(dc: DataConnect, vars: RejectOrgRequestVariables): MutationPromise<RejectOrgRequestData, RejectOrgRequestVariables>;

interface DeleteOrgRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrgRequestVariables): MutationRef<DeleteOrgRequestData, DeleteOrgRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteOrgRequestVariables): MutationRef<DeleteOrgRequestData, DeleteOrgRequestVariables>;
  operationName: string;
}
export const deleteOrgRequestRef: DeleteOrgRequestRef;

export function deleteOrgRequest(vars: DeleteOrgRequestVariables): MutationPromise<DeleteOrgRequestData, DeleteOrgRequestVariables>;
export function deleteOrgRequest(dc: DataConnect, vars: DeleteOrgRequestVariables): MutationPromise<DeleteOrgRequestData, DeleteOrgRequestVariables>;

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserStatusVariables): MutationRef<UpdateUserStatusData, UpdateUserStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserStatusVariables): MutationRef<UpdateUserStatusData, UpdateUserStatusVariables>;
  operationName: string;
}
export const updateUserStatusRef: UpdateUserStatusRef;

export function updateUserStatus(vars: UpdateUserStatusVariables): MutationPromise<UpdateUserStatusData, UpdateUserStatusVariables>;
export function updateUserStatus(dc: DataConnect, vars: UpdateUserStatusVariables): MutationPromise<UpdateUserStatusData, UpdateUserStatusVariables>;

interface UpdateUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  operationName: string;
}
export const updateUserRoleRef: UpdateUserRoleRef;

export function updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface UpdateUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
  operationName: string;
}
export const updateUserProfileRef: UpdateUserProfileRef;

export function updateUserProfile(vars: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;
export function updateUserProfile(dc: DataConnect, vars: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

interface UpdateUserAvatarRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserAvatarVariables): MutationRef<UpdateUserAvatarData, UpdateUserAvatarVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserAvatarVariables): MutationRef<UpdateUserAvatarData, UpdateUserAvatarVariables>;
  operationName: string;
}
export const updateUserAvatarRef: UpdateUserAvatarRef;

export function updateUserAvatar(vars: UpdateUserAvatarVariables): MutationPromise<UpdateUserAvatarData, UpdateUserAvatarVariables>;
export function updateUserAvatar(dc: DataConnect, vars: UpdateUserAvatarVariables): MutationPromise<UpdateUserAvatarData, UpdateUserAvatarVariables>;

interface RecordUserLoginRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordUserLoginVariables): MutationRef<RecordUserLoginData, RecordUserLoginVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordUserLoginVariables): MutationRef<RecordUserLoginData, RecordUserLoginVariables>;
  operationName: string;
}
export const recordUserLoginRef: RecordUserLoginRef;

export function recordUserLogin(vars: RecordUserLoginVariables): MutationPromise<RecordUserLoginData, RecordUserLoginVariables>;
export function recordUserLogin(dc: DataConnect, vars: RecordUserLoginVariables): MutationPromise<RecordUserLoginData, RecordUserLoginVariables>;

interface RecordFailedLoginRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordFailedLoginVariables): MutationRef<RecordFailedLoginData, RecordFailedLoginVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordFailedLoginVariables): MutationRef<RecordFailedLoginData, RecordFailedLoginVariables>;
  operationName: string;
}
export const recordFailedLoginRef: RecordFailedLoginRef;

export function recordFailedLogin(vars: RecordFailedLoginVariables): MutationPromise<RecordFailedLoginData, RecordFailedLoginVariables>;
export function recordFailedLogin(dc: DataConnect, vars: RecordFailedLoginVariables): MutationPromise<RecordFailedLoginData, RecordFailedLoginVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;
export function deleteUser(dc: DataConnect, vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface CreateVehicleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateVehicleVariables): MutationRef<CreateVehicleData, CreateVehicleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateVehicleVariables): MutationRef<CreateVehicleData, CreateVehicleVariables>;
  operationName: string;
}
export const createVehicleRef: CreateVehicleRef;

export function createVehicle(vars: CreateVehicleVariables): MutationPromise<CreateVehicleData, CreateVehicleVariables>;
export function createVehicle(dc: DataConnect, vars: CreateVehicleVariables): MutationPromise<CreateVehicleData, CreateVehicleVariables>;

interface UpdateVehicleStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleStatusVariables): MutationRef<UpdateVehicleStatusData, UpdateVehicleStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateVehicleStatusVariables): MutationRef<UpdateVehicleStatusData, UpdateVehicleStatusVariables>;
  operationName: string;
}
export const updateVehicleStatusRef: UpdateVehicleStatusRef;

export function updateVehicleStatus(vars: UpdateVehicleStatusVariables): MutationPromise<UpdateVehicleStatusData, UpdateVehicleStatusVariables>;
export function updateVehicleStatus(dc: DataConnect, vars: UpdateVehicleStatusVariables): MutationPromise<UpdateVehicleStatusData, UpdateVehicleStatusVariables>;

interface UpdateVehicleKmRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleKmVariables): MutationRef<UpdateVehicleKmData, UpdateVehicleKmVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateVehicleKmVariables): MutationRef<UpdateVehicleKmData, UpdateVehicleKmVariables>;
  operationName: string;
}
export const updateVehicleKmRef: UpdateVehicleKmRef;

export function updateVehicleKm(vars: UpdateVehicleKmVariables): MutationPromise<UpdateVehicleKmData, UpdateVehicleKmVariables>;
export function updateVehicleKm(dc: DataConnect, vars: UpdateVehicleKmVariables): MutationPromise<UpdateVehicleKmData, UpdateVehicleKmVariables>;

interface UpdateVehicleServiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleServiceVariables): MutationRef<UpdateVehicleServiceData, UpdateVehicleServiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateVehicleServiceVariables): MutationRef<UpdateVehicleServiceData, UpdateVehicleServiceVariables>;
  operationName: string;
}
export const updateVehicleServiceRef: UpdateVehicleServiceRef;

export function updateVehicleService(vars: UpdateVehicleServiceVariables): MutationPromise<UpdateVehicleServiceData, UpdateVehicleServiceVariables>;
export function updateVehicleService(dc: DataConnect, vars: UpdateVehicleServiceVariables): MutationPromise<UpdateVehicleServiceData, UpdateVehicleServiceVariables>;

interface UpdateVehicleOrgRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleOrgVariables): MutationRef<UpdateVehicleOrgData, UpdateVehicleOrgVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateVehicleOrgVariables): MutationRef<UpdateVehicleOrgData, UpdateVehicleOrgVariables>;
  operationName: string;
}
export const updateVehicleOrgRef: UpdateVehicleOrgRef;

export function updateVehicleOrg(vars: UpdateVehicleOrgVariables): MutationPromise<UpdateVehicleOrgData, UpdateVehicleOrgVariables>;
export function updateVehicleOrg(dc: DataConnect, vars: UpdateVehicleOrgVariables): MutationPromise<UpdateVehicleOrgData, UpdateVehicleOrgVariables>;

interface UpdateVehicleDetailsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleDetailsVariables): MutationRef<UpdateVehicleDetailsData, UpdateVehicleDetailsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateVehicleDetailsVariables): MutationRef<UpdateVehicleDetailsData, UpdateVehicleDetailsVariables>;
  operationName: string;
}
export const updateVehicleDetailsRef: UpdateVehicleDetailsRef;

export function updateVehicleDetails(vars: UpdateVehicleDetailsVariables): MutationPromise<UpdateVehicleDetailsData, UpdateVehicleDetailsVariables>;
export function updateVehicleDetails(dc: DataConnect, vars: UpdateVehicleDetailsVariables): MutationPromise<UpdateVehicleDetailsData, UpdateVehicleDetailsVariables>;

interface UpdateVehicleImageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleImageVariables): MutationRef<UpdateVehicleImageData, UpdateVehicleImageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateVehicleImageVariables): MutationRef<UpdateVehicleImageData, UpdateVehicleImageVariables>;
  operationName: string;
}
export const updateVehicleImageRef: UpdateVehicleImageRef;

export function updateVehicleImage(vars: UpdateVehicleImageVariables): MutationPromise<UpdateVehicleImageData, UpdateVehicleImageVariables>;
export function updateVehicleImage(dc: DataConnect, vars: UpdateVehicleImageVariables): MutationPromise<UpdateVehicleImageData, UpdateVehicleImageVariables>;

interface DeleteVehicleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteVehicleVariables): MutationRef<DeleteVehicleData, DeleteVehicleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteVehicleVariables): MutationRef<DeleteVehicleData, DeleteVehicleVariables>;
  operationName: string;
}
export const deleteVehicleRef: DeleteVehicleRef;

export function deleteVehicle(vars: DeleteVehicleVariables): MutationPromise<DeleteVehicleData, DeleteVehicleVariables>;
export function deleteVehicle(dc: DataConnect, vars: DeleteVehicleVariables): MutationPromise<DeleteVehicleData, DeleteVehicleVariables>;

interface AddVehicleImageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddVehicleImageVariables): MutationRef<AddVehicleImageData, AddVehicleImageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddVehicleImageVariables): MutationRef<AddVehicleImageData, AddVehicleImageVariables>;
  operationName: string;
}
export const addVehicleImageRef: AddVehicleImageRef;

export function addVehicleImage(vars: AddVehicleImageVariables): MutationPromise<AddVehicleImageData, AddVehicleImageVariables>;
export function addVehicleImage(dc: DataConnect, vars: AddVehicleImageVariables): MutationPromise<AddVehicleImageData, AddVehicleImageVariables>;

interface DeleteVehicleImageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteVehicleImageVariables): MutationRef<DeleteVehicleImageData, DeleteVehicleImageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteVehicleImageVariables): MutationRef<DeleteVehicleImageData, DeleteVehicleImageVariables>;
  operationName: string;
}
export const deleteVehicleImageRef: DeleteVehicleImageRef;

export function deleteVehicleImage(vars: DeleteVehicleImageVariables): MutationPromise<DeleteVehicleImageData, DeleteVehicleImageVariables>;
export function deleteVehicleImage(dc: DataConnect, vars: DeleteVehicleImageVariables): MutationPromise<DeleteVehicleImageData, DeleteVehicleImageVariables>;

interface CreateMaintenanceQueryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMaintenanceQueryVariables): MutationRef<CreateMaintenanceQueryData, CreateMaintenanceQueryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMaintenanceQueryVariables): MutationRef<CreateMaintenanceQueryData, CreateMaintenanceQueryVariables>;
  operationName: string;
}
export const createMaintenanceQueryRef: CreateMaintenanceQueryRef;

export function createMaintenanceQuery(vars: CreateMaintenanceQueryVariables): MutationPromise<CreateMaintenanceQueryData, CreateMaintenanceQueryVariables>;
export function createMaintenanceQuery(dc: DataConnect, vars: CreateMaintenanceQueryVariables): MutationPromise<CreateMaintenanceQueryData, CreateMaintenanceQueryVariables>;

interface UpdateMaintenanceStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMaintenanceStatusVariables): MutationRef<UpdateMaintenanceStatusData, UpdateMaintenanceStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMaintenanceStatusVariables): MutationRef<UpdateMaintenanceStatusData, UpdateMaintenanceStatusVariables>;
  operationName: string;
}
export const updateMaintenanceStatusRef: UpdateMaintenanceStatusRef;

export function updateMaintenanceStatus(vars: UpdateMaintenanceStatusVariables): MutationPromise<UpdateMaintenanceStatusData, UpdateMaintenanceStatusVariables>;
export function updateMaintenanceStatus(dc: DataConnect, vars: UpdateMaintenanceStatusVariables): MutationPromise<UpdateMaintenanceStatusData, UpdateMaintenanceStatusVariables>;

interface ResolveMaintenanceQueryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveMaintenanceQueryVariables): MutationRef<ResolveMaintenanceQueryData, ResolveMaintenanceQueryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ResolveMaintenanceQueryVariables): MutationRef<ResolveMaintenanceQueryData, ResolveMaintenanceQueryVariables>;
  operationName: string;
}
export const resolveMaintenanceQueryRef: ResolveMaintenanceQueryRef;

export function resolveMaintenanceQuery(vars: ResolveMaintenanceQueryVariables): MutationPromise<ResolveMaintenanceQueryData, ResolveMaintenanceQueryVariables>;
export function resolveMaintenanceQuery(dc: DataConnect, vars: ResolveMaintenanceQueryVariables): MutationPromise<ResolveMaintenanceQueryData, ResolveMaintenanceQueryVariables>;

interface UpdateMaintenancePriorityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMaintenancePriorityVariables): MutationRef<UpdateMaintenancePriorityData, UpdateMaintenancePriorityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMaintenancePriorityVariables): MutationRef<UpdateMaintenancePriorityData, UpdateMaintenancePriorityVariables>;
  operationName: string;
}
export const updateMaintenancePriorityRef: UpdateMaintenancePriorityRef;

export function updateMaintenancePriority(vars: UpdateMaintenancePriorityVariables): MutationPromise<UpdateMaintenancePriorityData, UpdateMaintenancePriorityVariables>;
export function updateMaintenancePriority(dc: DataConnect, vars: UpdateMaintenancePriorityVariables): MutationPromise<UpdateMaintenancePriorityData, UpdateMaintenancePriorityVariables>;

interface DeleteMaintenanceQueryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMaintenanceQueryVariables): MutationRef<DeleteMaintenanceQueryData, DeleteMaintenanceQueryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMaintenanceQueryVariables): MutationRef<DeleteMaintenanceQueryData, DeleteMaintenanceQueryVariables>;
  operationName: string;
}
export const deleteMaintenanceQueryRef: DeleteMaintenanceQueryRef;

export function deleteMaintenanceQuery(vars: DeleteMaintenanceQueryVariables): MutationPromise<DeleteMaintenanceQueryData, DeleteMaintenanceQueryVariables>;
export function deleteMaintenanceQuery(dc: DataConnect, vars: DeleteMaintenanceQueryVariables): MutationPromise<DeleteMaintenanceQueryData, DeleteMaintenanceQueryVariables>;

interface CreateRentalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRentalVariables): MutationRef<CreateRentalData, CreateRentalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRentalVariables): MutationRef<CreateRentalData, CreateRentalVariables>;
  operationName: string;
}
export const createRentalRef: CreateRentalRef;

export function createRental(vars: CreateRentalVariables): MutationPromise<CreateRentalData, CreateRentalVariables>;
export function createRental(dc: DataConnect, vars: CreateRentalVariables): MutationPromise<CreateRentalData, CreateRentalVariables>;

interface UpdateRentalStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRentalStatusVariables): MutationRef<UpdateRentalStatusData, UpdateRentalStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateRentalStatusVariables): MutationRef<UpdateRentalStatusData, UpdateRentalStatusVariables>;
  operationName: string;
}
export const updateRentalStatusRef: UpdateRentalStatusRef;

export function updateRentalStatus(vars: UpdateRentalStatusVariables): MutationPromise<UpdateRentalStatusData, UpdateRentalStatusVariables>;
export function updateRentalStatus(dc: DataConnect, vars: UpdateRentalStatusVariables): MutationPromise<UpdateRentalStatusData, UpdateRentalStatusVariables>;

interface UpdateRentalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRentalVariables): MutationRef<UpdateRentalData, UpdateRentalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateRentalVariables): MutationRef<UpdateRentalData, UpdateRentalVariables>;
  operationName: string;
}
export const updateRentalRef: UpdateRentalRef;

export function updateRental(vars: UpdateRentalVariables): MutationPromise<UpdateRentalData, UpdateRentalVariables>;
export function updateRental(dc: DataConnect, vars: UpdateRentalVariables): MutationPromise<UpdateRentalData, UpdateRentalVariables>;

interface DeleteRentalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteRentalVariables): MutationRef<DeleteRentalData, DeleteRentalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteRentalVariables): MutationRef<DeleteRentalData, DeleteRentalVariables>;
  operationName: string;
}
export const deleteRentalRef: DeleteRentalRef;

export function deleteRental(vars: DeleteRentalVariables): MutationPromise<DeleteRentalData, DeleteRentalVariables>;
export function deleteRental(dc: DataConnect, vars: DeleteRentalVariables): MutationPromise<DeleteRentalData, DeleteRentalVariables>;

interface CreateRentalApplicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRentalApplicationVariables): MutationRef<CreateRentalApplicationData, CreateRentalApplicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRentalApplicationVariables): MutationRef<CreateRentalApplicationData, CreateRentalApplicationVariables>;
  operationName: string;
}
export const createRentalApplicationRef: CreateRentalApplicationRef;

export function createRentalApplication(vars: CreateRentalApplicationVariables): MutationPromise<CreateRentalApplicationData, CreateRentalApplicationVariables>;
export function createRentalApplication(dc: DataConnect, vars: CreateRentalApplicationVariables): MutationPromise<CreateRentalApplicationData, CreateRentalApplicationVariables>;

interface ReviewRentalApplicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReviewRentalApplicationVariables): MutationRef<ReviewRentalApplicationData, ReviewRentalApplicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReviewRentalApplicationVariables): MutationRef<ReviewRentalApplicationData, ReviewRentalApplicationVariables>;
  operationName: string;
}
export const reviewRentalApplicationRef: ReviewRentalApplicationRef;

export function reviewRentalApplication(vars: ReviewRentalApplicationVariables): MutationPromise<ReviewRentalApplicationData, ReviewRentalApplicationVariables>;
export function reviewRentalApplication(dc: DataConnect, vars: ReviewRentalApplicationVariables): MutationPromise<ReviewRentalApplicationData, ReviewRentalApplicationVariables>;

interface AttachApplicationDocumentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AttachApplicationDocumentsVariables): MutationRef<AttachApplicationDocumentsData, AttachApplicationDocumentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AttachApplicationDocumentsVariables): MutationRef<AttachApplicationDocumentsData, AttachApplicationDocumentsVariables>;
  operationName: string;
}
export const attachApplicationDocumentsRef: AttachApplicationDocumentsRef;

export function attachApplicationDocuments(vars: AttachApplicationDocumentsVariables): MutationPromise<AttachApplicationDocumentsData, AttachApplicationDocumentsVariables>;
export function attachApplicationDocuments(dc: DataConnect, vars: AttachApplicationDocumentsVariables): MutationPromise<AttachApplicationDocumentsData, AttachApplicationDocumentsVariables>;

interface DeleteRentalApplicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteRentalApplicationVariables): MutationRef<DeleteRentalApplicationData, DeleteRentalApplicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteRentalApplicationVariables): MutationRef<DeleteRentalApplicationData, DeleteRentalApplicationVariables>;
  operationName: string;
}
export const deleteRentalApplicationRef: DeleteRentalApplicationRef;

export function deleteRentalApplication(vars: DeleteRentalApplicationVariables): MutationPromise<DeleteRentalApplicationData, DeleteRentalApplicationVariables>;
export function deleteRentalApplication(dc: DataConnect, vars: DeleteRentalApplicationVariables): MutationPromise<DeleteRentalApplicationData, DeleteRentalApplicationVariables>;

interface CreateCatalogItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCatalogItemVariables): MutationRef<CreateCatalogItemData, CreateCatalogItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCatalogItemVariables): MutationRef<CreateCatalogItemData, CreateCatalogItemVariables>;
  operationName: string;
}
export const createCatalogItemRef: CreateCatalogItemRef;

export function createCatalogItem(vars: CreateCatalogItemVariables): MutationPromise<CreateCatalogItemData, CreateCatalogItemVariables>;
export function createCatalogItem(dc: DataConnect, vars: CreateCatalogItemVariables): MutationPromise<CreateCatalogItemData, CreateCatalogItemVariables>;

interface UpdateCatalogItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCatalogItemVariables): MutationRef<UpdateCatalogItemData, UpdateCatalogItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCatalogItemVariables): MutationRef<UpdateCatalogItemData, UpdateCatalogItemVariables>;
  operationName: string;
}
export const updateCatalogItemRef: UpdateCatalogItemRef;

export function updateCatalogItem(vars: UpdateCatalogItemVariables): MutationPromise<UpdateCatalogItemData, UpdateCatalogItemVariables>;
export function updateCatalogItem(dc: DataConnect, vars: UpdateCatalogItemVariables): MutationPromise<UpdateCatalogItemData, UpdateCatalogItemVariables>;

interface UpdateCatalogItemStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCatalogItemStatusVariables): MutationRef<UpdateCatalogItemStatusData, UpdateCatalogItemStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCatalogItemStatusVariables): MutationRef<UpdateCatalogItemStatusData, UpdateCatalogItemStatusVariables>;
  operationName: string;
}
export const updateCatalogItemStatusRef: UpdateCatalogItemStatusRef;

export function updateCatalogItemStatus(vars: UpdateCatalogItemStatusVariables): MutationPromise<UpdateCatalogItemStatusData, UpdateCatalogItemStatusVariables>;
export function updateCatalogItemStatus(dc: DataConnect, vars: UpdateCatalogItemStatusVariables): MutationPromise<UpdateCatalogItemStatusData, UpdateCatalogItemStatusVariables>;

interface DeleteCatalogItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCatalogItemVariables): MutationRef<DeleteCatalogItemData, DeleteCatalogItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCatalogItemVariables): MutationRef<DeleteCatalogItemData, DeleteCatalogItemVariables>;
  operationName: string;
}
export const deleteCatalogItemRef: DeleteCatalogItemRef;

export function deleteCatalogItem(vars: DeleteCatalogItemVariables): MutationPromise<DeleteCatalogItemData, DeleteCatalogItemVariables>;
export function deleteCatalogItem(dc: DataConnect, vars: DeleteCatalogItemVariables): MutationPromise<DeleteCatalogItemData, DeleteCatalogItemVariables>;

interface AddCatalogImageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddCatalogImageVariables): MutationRef<AddCatalogImageData, AddCatalogImageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddCatalogImageVariables): MutationRef<AddCatalogImageData, AddCatalogImageVariables>;
  operationName: string;
}
export const addCatalogImageRef: AddCatalogImageRef;

export function addCatalogImage(vars: AddCatalogImageVariables): MutationPromise<AddCatalogImageData, AddCatalogImageVariables>;
export function addCatalogImage(dc: DataConnect, vars: AddCatalogImageVariables): MutationPromise<AddCatalogImageData, AddCatalogImageVariables>;

interface DeleteCatalogImageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCatalogImageVariables): MutationRef<DeleteCatalogImageData, DeleteCatalogImageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCatalogImageVariables): MutationRef<DeleteCatalogImageData, DeleteCatalogImageVariables>;
  operationName: string;
}
export const deleteCatalogImageRef: DeleteCatalogImageRef;

export function deleteCatalogImage(vars: DeleteCatalogImageVariables): MutationPromise<DeleteCatalogImageData, DeleteCatalogImageVariables>;
export function deleteCatalogImage(dc: DataConnect, vars: DeleteCatalogImageVariables): MutationPromise<DeleteCatalogImageData, DeleteCatalogImageVariables>;

interface JoinWaitlistRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: JoinWaitlistVariables): MutationRef<JoinWaitlistData, JoinWaitlistVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: JoinWaitlistVariables): MutationRef<JoinWaitlistData, JoinWaitlistVariables>;
  operationName: string;
}
export const joinWaitlistRef: JoinWaitlistRef;

export function joinWaitlist(vars: JoinWaitlistVariables): MutationPromise<JoinWaitlistData, JoinWaitlistVariables>;
export function joinWaitlist(dc: DataConnect, vars: JoinWaitlistVariables): MutationPromise<JoinWaitlistData, JoinWaitlistVariables>;

interface NotifyWaitlistEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: NotifyWaitlistEntryVariables): MutationRef<NotifyWaitlistEntryData, NotifyWaitlistEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: NotifyWaitlistEntryVariables): MutationRef<NotifyWaitlistEntryData, NotifyWaitlistEntryVariables>;
  operationName: string;
}
export const notifyWaitlistEntryRef: NotifyWaitlistEntryRef;

export function notifyWaitlistEntry(vars: NotifyWaitlistEntryVariables): MutationPromise<NotifyWaitlistEntryData, NotifyWaitlistEntryVariables>;
export function notifyWaitlistEntry(dc: DataConnect, vars: NotifyWaitlistEntryVariables): MutationPromise<NotifyWaitlistEntryData, NotifyWaitlistEntryVariables>;

interface ExpireWaitlistEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ExpireWaitlistEntryVariables): MutationRef<ExpireWaitlistEntryData, ExpireWaitlistEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ExpireWaitlistEntryVariables): MutationRef<ExpireWaitlistEntryData, ExpireWaitlistEntryVariables>;
  operationName: string;
}
export const expireWaitlistEntryRef: ExpireWaitlistEntryRef;

export function expireWaitlistEntry(vars: ExpireWaitlistEntryVariables): MutationPromise<ExpireWaitlistEntryData, ExpireWaitlistEntryVariables>;
export function expireWaitlistEntry(dc: DataConnect, vars: ExpireWaitlistEntryVariables): MutationPromise<ExpireWaitlistEntryData, ExpireWaitlistEntryVariables>;

interface DeleteWaitlistEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWaitlistEntryVariables): MutationRef<DeleteWaitlistEntryData, DeleteWaitlistEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteWaitlistEntryVariables): MutationRef<DeleteWaitlistEntryData, DeleteWaitlistEntryVariables>;
  operationName: string;
}
export const deleteWaitlistEntryRef: DeleteWaitlistEntryRef;

export function deleteWaitlistEntry(vars: DeleteWaitlistEntryVariables): MutationPromise<DeleteWaitlistEntryData, DeleteWaitlistEntryVariables>;
export function deleteWaitlistEntry(dc: DataConnect, vars: DeleteWaitlistEntryVariables): MutationPromise<DeleteWaitlistEntryData, DeleteWaitlistEntryVariables>;

interface CreateContactInquiryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateContactInquiryVariables): MutationRef<CreateContactInquiryData, CreateContactInquiryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateContactInquiryVariables): MutationRef<CreateContactInquiryData, CreateContactInquiryVariables>;
  operationName: string;
}
export const createContactInquiryRef: CreateContactInquiryRef;

export function createContactInquiry(vars: CreateContactInquiryVariables): MutationPromise<CreateContactInquiryData, CreateContactInquiryVariables>;
export function createContactInquiry(dc: DataConnect, vars: CreateContactInquiryVariables): MutationPromise<CreateContactInquiryData, CreateContactInquiryVariables>;

interface UpdateInquiryStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInquiryStatusVariables): MutationRef<UpdateInquiryStatusData, UpdateInquiryStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateInquiryStatusVariables): MutationRef<UpdateInquiryStatusData, UpdateInquiryStatusVariables>;
  operationName: string;
}
export const updateInquiryStatusRef: UpdateInquiryStatusRef;

export function updateInquiryStatus(vars: UpdateInquiryStatusVariables): MutationPromise<UpdateInquiryStatusData, UpdateInquiryStatusVariables>;
export function updateInquiryStatus(dc: DataConnect, vars: UpdateInquiryStatusVariables): MutationPromise<UpdateInquiryStatusData, UpdateInquiryStatusVariables>;

interface DeleteContactInquiryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteContactInquiryVariables): MutationRef<DeleteContactInquiryData, DeleteContactInquiryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteContactInquiryVariables): MutationRef<DeleteContactInquiryData, DeleteContactInquiryVariables>;
  operationName: string;
}
export const deleteContactInquiryRef: DeleteContactInquiryRef;

export function deleteContactInquiry(vars: DeleteContactInquiryVariables): MutationPromise<DeleteContactInquiryData, DeleteContactInquiryVariables>;
export function deleteContactInquiry(dc: DataConnect, vars: DeleteContactInquiryVariables): MutationPromise<DeleteContactInquiryData, DeleteContactInquiryVariables>;

interface CreateAuditLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
  operationName: string;
}
export const createAuditLogRef: CreateAuditLogRef;

export function createAuditLog(vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;
export function createAuditLog(dc: DataConnect, vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface ListAllVehiclesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllVehiclesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllVehiclesData, undefined>;
  operationName: string;
}
export const listAllVehiclesRef: ListAllVehiclesRef;

export function listAllVehicles(options?: ExecuteQueryOptions): QueryPromise<ListAllVehiclesData, undefined>;
export function listAllVehicles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllVehiclesData, undefined>;

interface GetVehicleByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetVehicleByIdVariables): QueryRef<GetVehicleByIdData, GetVehicleByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetVehicleByIdVariables): QueryRef<GetVehicleByIdData, GetVehicleByIdVariables>;
  operationName: string;
}
export const getVehicleByIdRef: GetVehicleByIdRef;

export function getVehicleById(vars: GetVehicleByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetVehicleByIdData, GetVehicleByIdVariables>;
export function getVehicleById(dc: DataConnect, vars: GetVehicleByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetVehicleByIdData, GetVehicleByIdVariables>;

interface ListVehiclesByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVehiclesByStatusVariables): QueryRef<ListVehiclesByStatusData, ListVehiclesByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListVehiclesByStatusVariables): QueryRef<ListVehiclesByStatusData, ListVehiclesByStatusVariables>;
  operationName: string;
}
export const listVehiclesByStatusRef: ListVehiclesByStatusRef;

export function listVehiclesByStatus(vars: ListVehiclesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByStatusData, ListVehiclesByStatusVariables>;
export function listVehiclesByStatus(dc: DataConnect, vars: ListVehiclesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByStatusData, ListVehiclesByStatusVariables>;

interface ListVehiclesByTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVehiclesByTypeVariables): QueryRef<ListVehiclesByTypeData, ListVehiclesByTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListVehiclesByTypeVariables): QueryRef<ListVehiclesByTypeData, ListVehiclesByTypeVariables>;
  operationName: string;
}
export const listVehiclesByTypeRef: ListVehiclesByTypeRef;

export function listVehiclesByType(vars: ListVehiclesByTypeVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByTypeData, ListVehiclesByTypeVariables>;
export function listVehiclesByType(dc: DataConnect, vars: ListVehiclesByTypeVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByTypeData, ListVehiclesByTypeVariables>;

interface ListVehiclesByOrgRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVehiclesByOrgVariables): QueryRef<ListVehiclesByOrgData, ListVehiclesByOrgVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListVehiclesByOrgVariables): QueryRef<ListVehiclesByOrgData, ListVehiclesByOrgVariables>;
  operationName: string;
}
export const listVehiclesByOrgRef: ListVehiclesByOrgRef;

export function listVehiclesByOrg(vars: ListVehiclesByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByOrgData, ListVehiclesByOrgVariables>;
export function listVehiclesByOrg(dc: DataConnect, vars: ListVehiclesByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByOrgData, ListVehiclesByOrgVariables>;

interface ListAllRentalsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllRentalsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllRentalsData, undefined>;
  operationName: string;
}
export const listAllRentalsRef: ListAllRentalsRef;

export function listAllRentals(options?: ExecuteQueryOptions): QueryPromise<ListAllRentalsData, undefined>;
export function listAllRentals(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllRentalsData, undefined>;

interface GetRentalByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRentalByIdVariables): QueryRef<GetRentalByIdData, GetRentalByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRentalByIdVariables): QueryRef<GetRentalByIdData, GetRentalByIdVariables>;
  operationName: string;
}
export const getRentalByIdRef: GetRentalByIdRef;

export function getRentalById(vars: GetRentalByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRentalByIdData, GetRentalByIdVariables>;
export function getRentalById(dc: DataConnect, vars: GetRentalByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRentalByIdData, GetRentalByIdVariables>;

interface ListRentalsByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListRentalsByStatusVariables): QueryRef<ListRentalsByStatusData, ListRentalsByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListRentalsByStatusVariables): QueryRef<ListRentalsByStatusData, ListRentalsByStatusVariables>;
  operationName: string;
}
export const listRentalsByStatusRef: ListRentalsByStatusRef;

export function listRentalsByStatus(vars: ListRentalsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalsByStatusData, ListRentalsByStatusVariables>;
export function listRentalsByStatus(dc: DataConnect, vars: ListRentalsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalsByStatusData, ListRentalsByStatusVariables>;

interface ListRentalsByOrgRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListRentalsByOrgVariables): QueryRef<ListRentalsByOrgData, ListRentalsByOrgVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListRentalsByOrgVariables): QueryRef<ListRentalsByOrgData, ListRentalsByOrgVariables>;
  operationName: string;
}
export const listRentalsByOrgRef: ListRentalsByOrgRef;

export function listRentalsByOrg(vars: ListRentalsByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalsByOrgData, ListRentalsByOrgVariables>;
export function listRentalsByOrg(dc: DataConnect, vars: ListRentalsByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalsByOrgData, ListRentalsByOrgVariables>;

interface ListAllOrganisationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllOrganisationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllOrganisationsData, undefined>;
  operationName: string;
}
export const listAllOrganisationsRef: ListAllOrganisationsRef;

export function listAllOrganisations(options?: ExecuteQueryOptions): QueryPromise<ListAllOrganisationsData, undefined>;
export function listAllOrganisations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllOrganisationsData, undefined>;

interface GetOrganisationByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganisationByIdVariables): QueryRef<GetOrganisationByIdData, GetOrganisationByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganisationByIdVariables): QueryRef<GetOrganisationByIdData, GetOrganisationByIdVariables>;
  operationName: string;
}
export const getOrganisationByIdRef: GetOrganisationByIdRef;

export function getOrganisationById(vars: GetOrganisationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganisationByIdData, GetOrganisationByIdVariables>;
export function getOrganisationById(dc: DataConnect, vars: GetOrganisationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganisationByIdData, GetOrganisationByIdVariables>;

interface ListOrganisationsByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrganisationsByStatusVariables): QueryRef<ListOrganisationsByStatusData, ListOrganisationsByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListOrganisationsByStatusVariables): QueryRef<ListOrganisationsByStatusData, ListOrganisationsByStatusVariables>;
  operationName: string;
}
export const listOrganisationsByStatusRef: ListOrganisationsByStatusRef;

export function listOrganisationsByStatus(vars: ListOrganisationsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganisationsByStatusData, ListOrganisationsByStatusVariables>;
export function listOrganisationsByStatus(dc: DataConnect, vars: ListOrganisationsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganisationsByStatusData, ListOrganisationsByStatusVariables>;

interface ListAllOrgRequestsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllOrgRequestsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllOrgRequestsData, undefined>;
  operationName: string;
}
export const listAllOrgRequestsRef: ListAllOrgRequestsRef;

export function listAllOrgRequests(options?: ExecuteQueryOptions): QueryPromise<ListAllOrgRequestsData, undefined>;
export function listAllOrgRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllOrgRequestsData, undefined>;

interface GetOrgRequestByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrgRequestByIdVariables): QueryRef<GetOrgRequestByIdData, GetOrgRequestByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrgRequestByIdVariables): QueryRef<GetOrgRequestByIdData, GetOrgRequestByIdVariables>;
  operationName: string;
}
export const getOrgRequestByIdRef: GetOrgRequestByIdRef;

export function getOrgRequestById(vars: GetOrgRequestByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrgRequestByIdData, GetOrgRequestByIdVariables>;
export function getOrgRequestById(dc: DataConnect, vars: GetOrgRequestByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrgRequestByIdData, GetOrgRequestByIdVariables>;

interface ListOrgRequestsByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrgRequestsByStatusVariables): QueryRef<ListOrgRequestsByStatusData, ListOrgRequestsByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListOrgRequestsByStatusVariables): QueryRef<ListOrgRequestsByStatusData, ListOrgRequestsByStatusVariables>;
  operationName: string;
}
export const listOrgRequestsByStatusRef: ListOrgRequestsByStatusRef;

export function listOrgRequestsByStatus(vars: ListOrgRequestsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrgRequestsByStatusData, ListOrgRequestsByStatusVariables>;
export function listOrgRequestsByStatus(dc: DataConnect, vars: ListOrgRequestsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrgRequestsByStatusData, ListOrgRequestsByStatusVariables>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface GetUserByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  operationName: string;
}
export const getUserByIdRef: GetUserByIdRef;

export function getUserById(vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;
export function getUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface ListUsersByOrgRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUsersByOrgVariables): QueryRef<ListUsersByOrgData, ListUsersByOrgVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUsersByOrgVariables): QueryRef<ListUsersByOrgData, ListUsersByOrgVariables>;
  operationName: string;
}
export const listUsersByOrgRef: ListUsersByOrgRef;

export function listUsersByOrg(vars: ListUsersByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByOrgData, ListUsersByOrgVariables>;
export function listUsersByOrg(dc: DataConnect, vars: ListUsersByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByOrgData, ListUsersByOrgVariables>;

interface GetUserByEmailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
  operationName: string;
}
export const getUserByEmailRef: GetUserByEmailRef;

export function getUserByEmail(vars: GetUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;
export function getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface ListUsersByRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUsersByRoleVariables): QueryRef<ListUsersByRoleData, ListUsersByRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUsersByRoleVariables): QueryRef<ListUsersByRoleData, ListUsersByRoleVariables>;
  operationName: string;
}
export const listUsersByRoleRef: ListUsersByRoleRef;

export function listUsersByRole(vars: ListUsersByRoleVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByRoleData, ListUsersByRoleVariables>;
export function listUsersByRole(dc: DataConnect, vars: ListUsersByRoleVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByRoleData, ListUsersByRoleVariables>;

interface ListAllMaintenanceQueriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllMaintenanceQueriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllMaintenanceQueriesData, undefined>;
  operationName: string;
}
export const listAllMaintenanceQueriesRef: ListAllMaintenanceQueriesRef;

export function listAllMaintenanceQueries(options?: ExecuteQueryOptions): QueryPromise<ListAllMaintenanceQueriesData, undefined>;
export function listAllMaintenanceQueries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllMaintenanceQueriesData, undefined>;

interface GetMaintenanceByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMaintenanceByIdVariables): QueryRef<GetMaintenanceByIdData, GetMaintenanceByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMaintenanceByIdVariables): QueryRef<GetMaintenanceByIdData, GetMaintenanceByIdVariables>;
  operationName: string;
}
export const getMaintenanceByIdRef: GetMaintenanceByIdRef;

export function getMaintenanceById(vars: GetMaintenanceByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetMaintenanceByIdData, GetMaintenanceByIdVariables>;
export function getMaintenanceById(dc: DataConnect, vars: GetMaintenanceByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetMaintenanceByIdData, GetMaintenanceByIdVariables>;

interface ListMaintenanceByVehicleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMaintenanceByVehicleVariables): QueryRef<ListMaintenanceByVehicleData, ListMaintenanceByVehicleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMaintenanceByVehicleVariables): QueryRef<ListMaintenanceByVehicleData, ListMaintenanceByVehicleVariables>;
  operationName: string;
}
export const listMaintenanceByVehicleRef: ListMaintenanceByVehicleRef;

export function listMaintenanceByVehicle(vars: ListMaintenanceByVehicleVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByVehicleData, ListMaintenanceByVehicleVariables>;
export function listMaintenanceByVehicle(dc: DataConnect, vars: ListMaintenanceByVehicleVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByVehicleData, ListMaintenanceByVehicleVariables>;

interface ListMaintenanceByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMaintenanceByStatusVariables): QueryRef<ListMaintenanceByStatusData, ListMaintenanceByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMaintenanceByStatusVariables): QueryRef<ListMaintenanceByStatusData, ListMaintenanceByStatusVariables>;
  operationName: string;
}
export const listMaintenanceByStatusRef: ListMaintenanceByStatusRef;

export function listMaintenanceByStatus(vars: ListMaintenanceByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByStatusData, ListMaintenanceByStatusVariables>;
export function listMaintenanceByStatus(dc: DataConnect, vars: ListMaintenanceByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByStatusData, ListMaintenanceByStatusVariables>;

interface ListMaintenanceByPriorityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMaintenanceByPriorityVariables): QueryRef<ListMaintenanceByPriorityData, ListMaintenanceByPriorityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMaintenanceByPriorityVariables): QueryRef<ListMaintenanceByPriorityData, ListMaintenanceByPriorityVariables>;
  operationName: string;
}
export const listMaintenanceByPriorityRef: ListMaintenanceByPriorityRef;

export function listMaintenanceByPriority(vars: ListMaintenanceByPriorityVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByPriorityData, ListMaintenanceByPriorityVariables>;
export function listMaintenanceByPriority(dc: DataConnect, vars: ListMaintenanceByPriorityVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByPriorityData, ListMaintenanceByPriorityVariables>;

interface ListAllRentalApplicationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllRentalApplicationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllRentalApplicationsData, undefined>;
  operationName: string;
}
export const listAllRentalApplicationsRef: ListAllRentalApplicationsRef;

export function listAllRentalApplications(options?: ExecuteQueryOptions): QueryPromise<ListAllRentalApplicationsData, undefined>;
export function listAllRentalApplications(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllRentalApplicationsData, undefined>;

interface GetRentalApplicationByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRentalApplicationByIdVariables): QueryRef<GetRentalApplicationByIdData, GetRentalApplicationByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRentalApplicationByIdVariables): QueryRef<GetRentalApplicationByIdData, GetRentalApplicationByIdVariables>;
  operationName: string;
}
export const getRentalApplicationByIdRef: GetRentalApplicationByIdRef;

export function getRentalApplicationById(vars: GetRentalApplicationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRentalApplicationByIdData, GetRentalApplicationByIdVariables>;
export function getRentalApplicationById(dc: DataConnect, vars: GetRentalApplicationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRentalApplicationByIdData, GetRentalApplicationByIdVariables>;

interface ListRentalApplicationsByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListRentalApplicationsByStatusVariables): QueryRef<ListRentalApplicationsByStatusData, ListRentalApplicationsByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListRentalApplicationsByStatusVariables): QueryRef<ListRentalApplicationsByStatusData, ListRentalApplicationsByStatusVariables>;
  operationName: string;
}
export const listRentalApplicationsByStatusRef: ListRentalApplicationsByStatusRef;

export function listRentalApplicationsByStatus(vars: ListRentalApplicationsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalApplicationsByStatusData, ListRentalApplicationsByStatusVariables>;
export function listRentalApplicationsByStatus(dc: DataConnect, vars: ListRentalApplicationsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalApplicationsByStatusData, ListRentalApplicationsByStatusVariables>;

interface ListAuditLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListAuditLogsVariables): QueryRef<ListAuditLogsData, ListAuditLogsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListAuditLogsVariables): QueryRef<ListAuditLogsData, ListAuditLogsVariables>;
  operationName: string;
}
export const listAuditLogsRef: ListAuditLogsRef;

export function listAuditLogs(vars?: ListAuditLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsData, ListAuditLogsVariables>;
export function listAuditLogs(dc: DataConnect, vars?: ListAuditLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsData, ListAuditLogsVariables>;

interface ListAuditLogsByActionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAuditLogsByActionVariables): QueryRef<ListAuditLogsByActionData, ListAuditLogsByActionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAuditLogsByActionVariables): QueryRef<ListAuditLogsByActionData, ListAuditLogsByActionVariables>;
  operationName: string;
}
export const listAuditLogsByActionRef: ListAuditLogsByActionRef;

export function listAuditLogsByAction(vars: ListAuditLogsByActionVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsByActionData, ListAuditLogsByActionVariables>;
export function listAuditLogsByAction(dc: DataConnect, vars: ListAuditLogsByActionVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsByActionData, ListAuditLogsByActionVariables>;

interface ListAuditLogsByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAuditLogsByUserVariables): QueryRef<ListAuditLogsByUserData, ListAuditLogsByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAuditLogsByUserVariables): QueryRef<ListAuditLogsByUserData, ListAuditLogsByUserVariables>;
  operationName: string;
}
export const listAuditLogsByUserRef: ListAuditLogsByUserRef;

export function listAuditLogsByUser(vars: ListAuditLogsByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsByUserData, ListAuditLogsByUserVariables>;
export function listAuditLogsByUser(dc: DataConnect, vars: ListAuditLogsByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsByUserData, ListAuditLogsByUserVariables>;

interface ListAllCatalogItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllCatalogItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllCatalogItemsData, undefined>;
  operationName: string;
}
export const listAllCatalogItemsRef: ListAllCatalogItemsRef;

export function listAllCatalogItems(options?: ExecuteQueryOptions): QueryPromise<ListAllCatalogItemsData, undefined>;
export function listAllCatalogItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllCatalogItemsData, undefined>;

interface ListCatalogItemsByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCatalogItemsByCategoryVariables): QueryRef<ListCatalogItemsByCategoryData, ListCatalogItemsByCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCatalogItemsByCategoryVariables): QueryRef<ListCatalogItemsByCategoryData, ListCatalogItemsByCategoryVariables>;
  operationName: string;
}
export const listCatalogItemsByCategoryRef: ListCatalogItemsByCategoryRef;

export function listCatalogItemsByCategory(vars: ListCatalogItemsByCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<ListCatalogItemsByCategoryData, ListCatalogItemsByCategoryVariables>;
export function listCatalogItemsByCategory(dc: DataConnect, vars: ListCatalogItemsByCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<ListCatalogItemsByCategoryData, ListCatalogItemsByCategoryVariables>;

interface GetCatalogItemByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCatalogItemByIdVariables): QueryRef<GetCatalogItemByIdData, GetCatalogItemByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCatalogItemByIdVariables): QueryRef<GetCatalogItemByIdData, GetCatalogItemByIdVariables>;
  operationName: string;
}
export const getCatalogItemByIdRef: GetCatalogItemByIdRef;

export function getCatalogItemById(vars: GetCatalogItemByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetCatalogItemByIdData, GetCatalogItemByIdVariables>;
export function getCatalogItemById(dc: DataConnect, vars: GetCatalogItemByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetCatalogItemByIdData, GetCatalogItemByIdVariables>;

interface ListAvailableCatalogItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableCatalogItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAvailableCatalogItemsData, undefined>;
  operationName: string;
}
export const listAvailableCatalogItemsRef: ListAvailableCatalogItemsRef;

export function listAvailableCatalogItems(options?: ExecuteQueryOptions): QueryPromise<ListAvailableCatalogItemsData, undefined>;
export function listAvailableCatalogItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAvailableCatalogItemsData, undefined>;

interface ListVehicleImagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVehicleImagesVariables): QueryRef<ListVehicleImagesData, ListVehicleImagesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListVehicleImagesVariables): QueryRef<ListVehicleImagesData, ListVehicleImagesVariables>;
  operationName: string;
}
export const listVehicleImagesRef: ListVehicleImagesRef;

export function listVehicleImages(vars: ListVehicleImagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehicleImagesData, ListVehicleImagesVariables>;
export function listVehicleImages(dc: DataConnect, vars: ListVehicleImagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehicleImagesData, ListVehicleImagesVariables>;

interface ListCatalogImagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCatalogImagesVariables): QueryRef<ListCatalogImagesData, ListCatalogImagesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCatalogImagesVariables): QueryRef<ListCatalogImagesData, ListCatalogImagesVariables>;
  operationName: string;
}
export const listCatalogImagesRef: ListCatalogImagesRef;

export function listCatalogImages(vars: ListCatalogImagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCatalogImagesData, ListCatalogImagesVariables>;
export function listCatalogImages(dc: DataConnect, vars: ListCatalogImagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCatalogImagesData, ListCatalogImagesVariables>;

interface ListAllWaitlistEntriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllWaitlistEntriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllWaitlistEntriesData, undefined>;
  operationName: string;
}
export const listAllWaitlistEntriesRef: ListAllWaitlistEntriesRef;

export function listAllWaitlistEntries(options?: ExecuteQueryOptions): QueryPromise<ListAllWaitlistEntriesData, undefined>;
export function listAllWaitlistEntries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllWaitlistEntriesData, undefined>;

interface ListWaitlistByItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListWaitlistByItemVariables): QueryRef<ListWaitlistByItemData, ListWaitlistByItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListWaitlistByItemVariables): QueryRef<ListWaitlistByItemData, ListWaitlistByItemVariables>;
  operationName: string;
}
export const listWaitlistByItemRef: ListWaitlistByItemRef;

export function listWaitlistByItem(vars: ListWaitlistByItemVariables, options?: ExecuteQueryOptions): QueryPromise<ListWaitlistByItemData, ListWaitlistByItemVariables>;
export function listWaitlistByItem(dc: DataConnect, vars: ListWaitlistByItemVariables, options?: ExecuteQueryOptions): QueryPromise<ListWaitlistByItemData, ListWaitlistByItemVariables>;

interface ListWaitlistByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListWaitlistByStatusVariables): QueryRef<ListWaitlistByStatusData, ListWaitlistByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListWaitlistByStatusVariables): QueryRef<ListWaitlistByStatusData, ListWaitlistByStatusVariables>;
  operationName: string;
}
export const listWaitlistByStatusRef: ListWaitlistByStatusRef;

export function listWaitlistByStatus(vars: ListWaitlistByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListWaitlistByStatusData, ListWaitlistByStatusVariables>;
export function listWaitlistByStatus(dc: DataConnect, vars: ListWaitlistByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListWaitlistByStatusData, ListWaitlistByStatusVariables>;

interface ListAllContactInquiriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllContactInquiriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllContactInquiriesData, undefined>;
  operationName: string;
}
export const listAllContactInquiriesRef: ListAllContactInquiriesRef;

export function listAllContactInquiries(options?: ExecuteQueryOptions): QueryPromise<ListAllContactInquiriesData, undefined>;
export function listAllContactInquiries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllContactInquiriesData, undefined>;

interface GetContactInquiryByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetContactInquiryByIdVariables): QueryRef<GetContactInquiryByIdData, GetContactInquiryByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetContactInquiryByIdVariables): QueryRef<GetContactInquiryByIdData, GetContactInquiryByIdVariables>;
  operationName: string;
}
export const getContactInquiryByIdRef: GetContactInquiryByIdRef;

export function getContactInquiryById(vars: GetContactInquiryByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetContactInquiryByIdData, GetContactInquiryByIdVariables>;
export function getContactInquiryById(dc: DataConnect, vars: GetContactInquiryByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetContactInquiryByIdData, GetContactInquiryByIdVariables>;

interface ListContactInquiriesByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListContactInquiriesByStatusVariables): QueryRef<ListContactInquiriesByStatusData, ListContactInquiriesByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListContactInquiriesByStatusVariables): QueryRef<ListContactInquiriesByStatusData, ListContactInquiriesByStatusVariables>;
  operationName: string;
}
export const listContactInquiriesByStatusRef: ListContactInquiriesByStatusRef;

export function listContactInquiriesByStatus(vars: ListContactInquiriesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListContactInquiriesByStatusData, ListContactInquiriesByStatusVariables>;
export function listContactInquiriesByStatus(dc: DataConnect, vars: ListContactInquiriesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListContactInquiriesByStatusData, ListContactInquiriesByStatusVariables>;

