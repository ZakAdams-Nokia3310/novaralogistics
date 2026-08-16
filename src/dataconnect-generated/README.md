# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `equipcore`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllVehicles*](#listallvehicles)
  - [*GetVehicleById*](#getvehiclebyid)
  - [*ListVehiclesByStatus*](#listvehiclesbystatus)
  - [*ListVehiclesByType*](#listvehiclesbytype)
  - [*ListVehiclesByOrg*](#listvehiclesbyorg)
  - [*ListAllRentals*](#listallrentals)
  - [*GetRentalById*](#getrentalbyid)
  - [*ListRentalsByStatus*](#listrentalsbystatus)
  - [*ListRentalsByOrg*](#listrentalsbyorg)
  - [*ListAllOrganisations*](#listallorganisations)
  - [*GetOrganisationById*](#getorganisationbyid)
  - [*ListOrganisationsByStatus*](#listorganisationsbystatus)
  - [*ListAllOrgRequests*](#listallorgrequests)
  - [*GetOrgRequestById*](#getorgrequestbyid)
  - [*ListOrgRequestsByStatus*](#listorgrequestsbystatus)
  - [*ListAllUsers*](#listallusers)
  - [*GetUserById*](#getuserbyid)
  - [*ListUsersByOrg*](#listusersbyorg)
  - [*GetUserByEmail*](#getuserbyemail)
  - [*GetUserTotpByEmail*](#getusertotpbyemail)
  - [*ListUsersByRole*](#listusersbyrole)
  - [*ListAllMaintenanceQueries*](#listallmaintenancequeries)
  - [*GetMaintenanceById*](#getmaintenancebyid)
  - [*ListMaintenanceByVehicle*](#listmaintenancebyvehicle)
  - [*ListMaintenanceByStatus*](#listmaintenancebystatus)
  - [*ListMaintenanceByPriority*](#listmaintenancebypriority)
  - [*ListAllRentalApplications*](#listallrentalapplications)
  - [*GetRentalApplicationById*](#getrentalapplicationbyid)
  - [*ListRentalApplicationsByStatus*](#listrentalapplicationsbystatus)
  - [*ListAuditLogs*](#listauditlogs)
  - [*ListAuditLogsByAction*](#listauditlogsbyaction)
  - [*ListAuditLogsByUser*](#listauditlogsbyuser)
  - [*ListAllCatalogItems*](#listallcatalogitems)
  - [*ListCatalogItemsByCategory*](#listcatalogitemsbycategory)
  - [*GetCatalogItemById*](#getcatalogitembyid)
  - [*ListAvailableCatalogItems*](#listavailablecatalogitems)
  - [*ListVehicleImages*](#listvehicleimages)
  - [*ListCatalogImages*](#listcatalogimages)
  - [*ListAllWaitlistEntries*](#listallwaitlistentries)
  - [*ListWaitlistByItem*](#listwaitlistbyitem)
  - [*ListWaitlistByStatus*](#listwaitlistbystatus)
  - [*ListAllContactInquiries*](#listallcontactinquiries)
  - [*GetContactInquiryById*](#getcontactinquirybyid)
  - [*ListContactInquiriesByStatus*](#listcontactinquiriesbystatus)
- [**Mutations**](#mutations)
  - [*CreateOrganisation*](#createorganisation)
  - [*UpdateOrgStatus*](#updateorgstatus)
  - [*UpdateOrganisation*](#updateorganisation)
  - [*DeleteOrganisation*](#deleteorganisation)
  - [*CreateOrgRequest*](#createorgrequest)
  - [*ApproveOrgRequest*](#approveorgrequest)
  - [*RejectOrgRequest*](#rejectorgrequest)
  - [*DeleteOrgRequest*](#deleteorgrequest)
  - [*CreateUser*](#createuser)
  - [*UpdateUserStatus*](#updateuserstatus)
  - [*UpdateUserRole*](#updateuserrole)
  - [*UpdateUserProfile*](#updateuserprofile)
  - [*UpdateUserAvatar*](#updateuseravatar)
  - [*RecordUserLogin*](#recorduserlogin)
  - [*RecordFailedLogin*](#recordfailedlogin)
  - [*DeleteUser*](#deleteuser)
  - [*CreateVehicle*](#createvehicle)
  - [*UpdateVehicleStatus*](#updatevehiclestatus)
  - [*UpdateVehicleKm*](#updatevehiclekm)
  - [*UpdateVehicleService*](#updatevehicleservice)
  - [*UpdateVehicleOrg*](#updatevehicleorg)
  - [*UpdateVehicleDetails*](#updatevehicledetails)
  - [*UpdateVehicleImage*](#updatevehicleimage)
  - [*DeleteVehicle*](#deletevehicle)
  - [*AddVehicleImage*](#addvehicleimage)
  - [*DeleteVehicleImage*](#deletevehicleimage)
  - [*CreateMaintenanceQuery*](#createmaintenancequery)
  - [*UpdateMaintenanceStatus*](#updatemaintenancestatus)
  - [*ResolveMaintenanceQuery*](#resolvemaintenancequery)
  - [*UpdateMaintenancePriority*](#updatemaintenancepriority)
  - [*DeleteMaintenanceQuery*](#deletemaintenancequery)
  - [*CreateRental*](#createrental)
  - [*UpdateRentalStatus*](#updaterentalstatus)
  - [*UpdateRental*](#updaterental)
  - [*DeleteRental*](#deleterental)
  - [*CreateRentalApplication*](#createrentalapplication)
  - [*ReviewRentalApplication*](#reviewrentalapplication)
  - [*AttachApplicationDocuments*](#attachapplicationdocuments)
  - [*DeleteRentalApplication*](#deleterentalapplication)
  - [*CreateCatalogItem*](#createcatalogitem)
  - [*UpdateCatalogItem*](#updatecatalogitem)
  - [*UpdateCatalogItemStatus*](#updatecatalogitemstatus)
  - [*DeleteCatalogItem*](#deletecatalogitem)
  - [*AddCatalogImage*](#addcatalogimage)
  - [*DeleteCatalogImage*](#deletecatalogimage)
  - [*JoinWaitlist*](#joinwaitlist)
  - [*NotifyWaitlistEntry*](#notifywaitlistentry)
  - [*ExpireWaitlistEntry*](#expirewaitlistentry)
  - [*DeleteWaitlistEntry*](#deletewaitlistentry)
  - [*CreateContactInquiry*](#createcontactinquiry)
  - [*UpdateInquiryStatus*](#updateinquirystatus)
  - [*DeleteContactInquiry*](#deletecontactinquiry)
  - [*CreateAuditLog*](#createauditlog)
  - [*SetUserTotpPending*](#setusertotppending)
  - [*ConfirmUserTotpEnrollment*](#confirmusertotpenrollment)
  - [*RecordTotpVerification*](#recordtotpverification)
  - [*UpdateUserTotpBackupCodes*](#updateusertotpbackupcodes)
  - [*DisableUserTotp*](#disableusertotp)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `equipcore`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `equipcore` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllVehicles
You can execute the `ListAllVehicles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllVehicles(options?: ExecuteQueryOptions): QueryPromise<ListAllVehiclesData, undefined>;

interface ListAllVehiclesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllVehiclesData, undefined>;
}
export const listAllVehiclesRef: ListAllVehiclesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllVehicles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllVehiclesData, undefined>;

interface ListAllVehiclesRef {
  ...
  (dc: DataConnect): QueryRef<ListAllVehiclesData, undefined>;
}
export const listAllVehiclesRef: ListAllVehiclesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllVehiclesRef:
```typescript
const name = listAllVehiclesRef.operationName;
console.log(name);
```

### Variables
The `ListAllVehicles` query has no variables.
### Return Type
Recall that executing the `ListAllVehicles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllVehiclesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllVehicles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllVehicles } from '@dataconnect/generated';


// Call the `listAllVehicles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllVehicles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllVehicles(dataConnect);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
listAllVehicles().then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

### Using `ListAllVehicles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllVehiclesRef } from '@dataconnect/generated';


// Call the `listAllVehiclesRef()` function to get a reference to the query.
const ref = listAllVehiclesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllVehiclesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

## GetVehicleById
You can execute the `GetVehicleById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getVehicleById(vars: GetVehicleByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetVehicleByIdData, GetVehicleByIdVariables>;

interface GetVehicleByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetVehicleByIdVariables): QueryRef<GetVehicleByIdData, GetVehicleByIdVariables>;
}
export const getVehicleByIdRef: GetVehicleByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getVehicleById(dc: DataConnect, vars: GetVehicleByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetVehicleByIdData, GetVehicleByIdVariables>;

interface GetVehicleByIdRef {
  ...
  (dc: DataConnect, vars: GetVehicleByIdVariables): QueryRef<GetVehicleByIdData, GetVehicleByIdVariables>;
}
export const getVehicleByIdRef: GetVehicleByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getVehicleByIdRef:
```typescript
const name = getVehicleByIdRef.operationName;
console.log(name);
```

### Variables
The `GetVehicleById` query requires an argument of type `GetVehicleByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetVehicleByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetVehicleById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetVehicleByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetVehicleById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getVehicleById, GetVehicleByIdVariables } from '@dataconnect/generated';

// The `GetVehicleById` query requires an argument of type `GetVehicleByIdVariables`:
const getVehicleByIdVars: GetVehicleByIdVariables = {
  id: ..., 
};

// Call the `getVehicleById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getVehicleById(getVehicleByIdVars);
// Variables can be defined inline as well.
const { data } = await getVehicleById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getVehicleById(dataConnect, getVehicleByIdVars);

console.log(data.vehicle);

// Or, you can use the `Promise` API.
getVehicleById(getVehicleByIdVars).then((response) => {
  const data = response.data;
  console.log(data.vehicle);
});
```

### Using `GetVehicleById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getVehicleByIdRef, GetVehicleByIdVariables } from '@dataconnect/generated';

// The `GetVehicleById` query requires an argument of type `GetVehicleByIdVariables`:
const getVehicleByIdVars: GetVehicleByIdVariables = {
  id: ..., 
};

// Call the `getVehicleByIdRef()` function to get a reference to the query.
const ref = getVehicleByIdRef(getVehicleByIdVars);
// Variables can be defined inline as well.
const ref = getVehicleByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getVehicleByIdRef(dataConnect, getVehicleByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vehicle);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicle);
});
```

## ListVehiclesByStatus
You can execute the `ListVehiclesByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVehiclesByStatus(vars: ListVehiclesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByStatusData, ListVehiclesByStatusVariables>;

interface ListVehiclesByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVehiclesByStatusVariables): QueryRef<ListVehiclesByStatusData, ListVehiclesByStatusVariables>;
}
export const listVehiclesByStatusRef: ListVehiclesByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVehiclesByStatus(dc: DataConnect, vars: ListVehiclesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByStatusData, ListVehiclesByStatusVariables>;

interface ListVehiclesByStatusRef {
  ...
  (dc: DataConnect, vars: ListVehiclesByStatusVariables): QueryRef<ListVehiclesByStatusData, ListVehiclesByStatusVariables>;
}
export const listVehiclesByStatusRef: ListVehiclesByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVehiclesByStatusRef:
```typescript
const name = listVehiclesByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListVehiclesByStatus` query requires an argument of type `ListVehiclesByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListVehiclesByStatusVariables {
  status: VehicleStatus;
}
```
### Return Type
Recall that executing the `ListVehiclesByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVehiclesByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListVehiclesByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVehiclesByStatus, ListVehiclesByStatusVariables } from '@dataconnect/generated';

// The `ListVehiclesByStatus` query requires an argument of type `ListVehiclesByStatusVariables`:
const listVehiclesByStatusVars: ListVehiclesByStatusVariables = {
  status: ..., 
};

// Call the `listVehiclesByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVehiclesByStatus(listVehiclesByStatusVars);
// Variables can be defined inline as well.
const { data } = await listVehiclesByStatus({ status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVehiclesByStatus(dataConnect, listVehiclesByStatusVars);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
listVehiclesByStatus(listVehiclesByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

### Using `ListVehiclesByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVehiclesByStatusRef, ListVehiclesByStatusVariables } from '@dataconnect/generated';

// The `ListVehiclesByStatus` query requires an argument of type `ListVehiclesByStatusVariables`:
const listVehiclesByStatusVars: ListVehiclesByStatusVariables = {
  status: ..., 
};

// Call the `listVehiclesByStatusRef()` function to get a reference to the query.
const ref = listVehiclesByStatusRef(listVehiclesByStatusVars);
// Variables can be defined inline as well.
const ref = listVehiclesByStatusRef({ status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVehiclesByStatusRef(dataConnect, listVehiclesByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

## ListVehiclesByType
You can execute the `ListVehiclesByType` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVehiclesByType(vars: ListVehiclesByTypeVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByTypeData, ListVehiclesByTypeVariables>;

interface ListVehiclesByTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVehiclesByTypeVariables): QueryRef<ListVehiclesByTypeData, ListVehiclesByTypeVariables>;
}
export const listVehiclesByTypeRef: ListVehiclesByTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVehiclesByType(dc: DataConnect, vars: ListVehiclesByTypeVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByTypeData, ListVehiclesByTypeVariables>;

interface ListVehiclesByTypeRef {
  ...
  (dc: DataConnect, vars: ListVehiclesByTypeVariables): QueryRef<ListVehiclesByTypeData, ListVehiclesByTypeVariables>;
}
export const listVehiclesByTypeRef: ListVehiclesByTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVehiclesByTypeRef:
```typescript
const name = listVehiclesByTypeRef.operationName;
console.log(name);
```

### Variables
The `ListVehiclesByType` query requires an argument of type `ListVehiclesByTypeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListVehiclesByTypeVariables {
  type: VehicleType;
}
```
### Return Type
Recall that executing the `ListVehiclesByType` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVehiclesByTypeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListVehiclesByType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVehiclesByType, ListVehiclesByTypeVariables } from '@dataconnect/generated';

// The `ListVehiclesByType` query requires an argument of type `ListVehiclesByTypeVariables`:
const listVehiclesByTypeVars: ListVehiclesByTypeVariables = {
  type: ..., 
};

// Call the `listVehiclesByType()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVehiclesByType(listVehiclesByTypeVars);
// Variables can be defined inline as well.
const { data } = await listVehiclesByType({ type: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVehiclesByType(dataConnect, listVehiclesByTypeVars);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
listVehiclesByType(listVehiclesByTypeVars).then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

### Using `ListVehiclesByType`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVehiclesByTypeRef, ListVehiclesByTypeVariables } from '@dataconnect/generated';

// The `ListVehiclesByType` query requires an argument of type `ListVehiclesByTypeVariables`:
const listVehiclesByTypeVars: ListVehiclesByTypeVariables = {
  type: ..., 
};

// Call the `listVehiclesByTypeRef()` function to get a reference to the query.
const ref = listVehiclesByTypeRef(listVehiclesByTypeVars);
// Variables can be defined inline as well.
const ref = listVehiclesByTypeRef({ type: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVehiclesByTypeRef(dataConnect, listVehiclesByTypeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

## ListVehiclesByOrg
You can execute the `ListVehiclesByOrg` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVehiclesByOrg(vars: ListVehiclesByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByOrgData, ListVehiclesByOrgVariables>;

interface ListVehiclesByOrgRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVehiclesByOrgVariables): QueryRef<ListVehiclesByOrgData, ListVehiclesByOrgVariables>;
}
export const listVehiclesByOrgRef: ListVehiclesByOrgRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVehiclesByOrg(dc: DataConnect, vars: ListVehiclesByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehiclesByOrgData, ListVehiclesByOrgVariables>;

interface ListVehiclesByOrgRef {
  ...
  (dc: DataConnect, vars: ListVehiclesByOrgVariables): QueryRef<ListVehiclesByOrgData, ListVehiclesByOrgVariables>;
}
export const listVehiclesByOrgRef: ListVehiclesByOrgRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVehiclesByOrgRef:
```typescript
const name = listVehiclesByOrgRef.operationName;
console.log(name);
```

### Variables
The `ListVehiclesByOrg` query requires an argument of type `ListVehiclesByOrgVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListVehiclesByOrgVariables {
  organisationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListVehiclesByOrg` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVehiclesByOrgData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListVehiclesByOrg`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVehiclesByOrg, ListVehiclesByOrgVariables } from '@dataconnect/generated';

// The `ListVehiclesByOrg` query requires an argument of type `ListVehiclesByOrgVariables`:
const listVehiclesByOrgVars: ListVehiclesByOrgVariables = {
  organisationId: ..., 
};

// Call the `listVehiclesByOrg()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVehiclesByOrg(listVehiclesByOrgVars);
// Variables can be defined inline as well.
const { data } = await listVehiclesByOrg({ organisationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVehiclesByOrg(dataConnect, listVehiclesByOrgVars);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
listVehiclesByOrg(listVehiclesByOrgVars).then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

### Using `ListVehiclesByOrg`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVehiclesByOrgRef, ListVehiclesByOrgVariables } from '@dataconnect/generated';

// The `ListVehiclesByOrg` query requires an argument of type `ListVehiclesByOrgVariables`:
const listVehiclesByOrgVars: ListVehiclesByOrgVariables = {
  organisationId: ..., 
};

// Call the `listVehiclesByOrgRef()` function to get a reference to the query.
const ref = listVehiclesByOrgRef(listVehiclesByOrgVars);
// Variables can be defined inline as well.
const ref = listVehiclesByOrgRef({ organisationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVehiclesByOrgRef(dataConnect, listVehiclesByOrgVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vehicles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicles);
});
```

## ListAllRentals
You can execute the `ListAllRentals` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllRentals(options?: ExecuteQueryOptions): QueryPromise<ListAllRentalsData, undefined>;

interface ListAllRentalsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllRentalsData, undefined>;
}
export const listAllRentalsRef: ListAllRentalsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllRentals(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllRentalsData, undefined>;

interface ListAllRentalsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllRentalsData, undefined>;
}
export const listAllRentalsRef: ListAllRentalsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllRentalsRef:
```typescript
const name = listAllRentalsRef.operationName;
console.log(name);
```

### Variables
The `ListAllRentals` query has no variables.
### Return Type
Recall that executing the `ListAllRentals` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllRentalsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllRentals`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllRentals } from '@dataconnect/generated';


// Call the `listAllRentals()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllRentals();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllRentals(dataConnect);

console.log(data.rentals);

// Or, you can use the `Promise` API.
listAllRentals().then((response) => {
  const data = response.data;
  console.log(data.rentals);
});
```

### Using `ListAllRentals`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllRentalsRef } from '@dataconnect/generated';


// Call the `listAllRentalsRef()` function to get a reference to the query.
const ref = listAllRentalsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllRentalsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rentals);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rentals);
});
```

## GetRentalById
You can execute the `GetRentalById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getRentalById(vars: GetRentalByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRentalByIdData, GetRentalByIdVariables>;

interface GetRentalByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRentalByIdVariables): QueryRef<GetRentalByIdData, GetRentalByIdVariables>;
}
export const getRentalByIdRef: GetRentalByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRentalById(dc: DataConnect, vars: GetRentalByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRentalByIdData, GetRentalByIdVariables>;

interface GetRentalByIdRef {
  ...
  (dc: DataConnect, vars: GetRentalByIdVariables): QueryRef<GetRentalByIdData, GetRentalByIdVariables>;
}
export const getRentalByIdRef: GetRentalByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRentalByIdRef:
```typescript
const name = getRentalByIdRef.operationName;
console.log(name);
```

### Variables
The `GetRentalById` query requires an argument of type `GetRentalByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRentalByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetRentalById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRentalByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetRentalById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRentalById, GetRentalByIdVariables } from '@dataconnect/generated';

// The `GetRentalById` query requires an argument of type `GetRentalByIdVariables`:
const getRentalByIdVars: GetRentalByIdVariables = {
  id: ..., 
};

// Call the `getRentalById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRentalById(getRentalByIdVars);
// Variables can be defined inline as well.
const { data } = await getRentalById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRentalById(dataConnect, getRentalByIdVars);

console.log(data.rental);

// Or, you can use the `Promise` API.
getRentalById(getRentalByIdVars).then((response) => {
  const data = response.data;
  console.log(data.rental);
});
```

### Using `GetRentalById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRentalByIdRef, GetRentalByIdVariables } from '@dataconnect/generated';

// The `GetRentalById` query requires an argument of type `GetRentalByIdVariables`:
const getRentalByIdVars: GetRentalByIdVariables = {
  id: ..., 
};

// Call the `getRentalByIdRef()` function to get a reference to the query.
const ref = getRentalByIdRef(getRentalByIdVars);
// Variables can be defined inline as well.
const ref = getRentalByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRentalByIdRef(dataConnect, getRentalByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rental);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rental);
});
```

## ListRentalsByStatus
You can execute the `ListRentalsByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listRentalsByStatus(vars: ListRentalsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalsByStatusData, ListRentalsByStatusVariables>;

interface ListRentalsByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListRentalsByStatusVariables): QueryRef<ListRentalsByStatusData, ListRentalsByStatusVariables>;
}
export const listRentalsByStatusRef: ListRentalsByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listRentalsByStatus(dc: DataConnect, vars: ListRentalsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalsByStatusData, ListRentalsByStatusVariables>;

interface ListRentalsByStatusRef {
  ...
  (dc: DataConnect, vars: ListRentalsByStatusVariables): QueryRef<ListRentalsByStatusData, ListRentalsByStatusVariables>;
}
export const listRentalsByStatusRef: ListRentalsByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listRentalsByStatusRef:
```typescript
const name = listRentalsByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListRentalsByStatus` query requires an argument of type `ListRentalsByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListRentalsByStatusVariables {
  status: RentalStatus;
}
```
### Return Type
Recall that executing the `ListRentalsByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListRentalsByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListRentalsByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listRentalsByStatus, ListRentalsByStatusVariables } from '@dataconnect/generated';

// The `ListRentalsByStatus` query requires an argument of type `ListRentalsByStatusVariables`:
const listRentalsByStatusVars: ListRentalsByStatusVariables = {
  status: ..., 
};

// Call the `listRentalsByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listRentalsByStatus(listRentalsByStatusVars);
// Variables can be defined inline as well.
const { data } = await listRentalsByStatus({ status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listRentalsByStatus(dataConnect, listRentalsByStatusVars);

console.log(data.rentals);

// Or, you can use the `Promise` API.
listRentalsByStatus(listRentalsByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.rentals);
});
```

### Using `ListRentalsByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listRentalsByStatusRef, ListRentalsByStatusVariables } from '@dataconnect/generated';

// The `ListRentalsByStatus` query requires an argument of type `ListRentalsByStatusVariables`:
const listRentalsByStatusVars: ListRentalsByStatusVariables = {
  status: ..., 
};

// Call the `listRentalsByStatusRef()` function to get a reference to the query.
const ref = listRentalsByStatusRef(listRentalsByStatusVars);
// Variables can be defined inline as well.
const ref = listRentalsByStatusRef({ status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listRentalsByStatusRef(dataConnect, listRentalsByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rentals);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rentals);
});
```

## ListRentalsByOrg
You can execute the `ListRentalsByOrg` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listRentalsByOrg(vars: ListRentalsByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalsByOrgData, ListRentalsByOrgVariables>;

interface ListRentalsByOrgRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListRentalsByOrgVariables): QueryRef<ListRentalsByOrgData, ListRentalsByOrgVariables>;
}
export const listRentalsByOrgRef: ListRentalsByOrgRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listRentalsByOrg(dc: DataConnect, vars: ListRentalsByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalsByOrgData, ListRentalsByOrgVariables>;

interface ListRentalsByOrgRef {
  ...
  (dc: DataConnect, vars: ListRentalsByOrgVariables): QueryRef<ListRentalsByOrgData, ListRentalsByOrgVariables>;
}
export const listRentalsByOrgRef: ListRentalsByOrgRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listRentalsByOrgRef:
```typescript
const name = listRentalsByOrgRef.operationName;
console.log(name);
```

### Variables
The `ListRentalsByOrg` query requires an argument of type `ListRentalsByOrgVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListRentalsByOrgVariables {
  organisationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListRentalsByOrg` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListRentalsByOrgData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListRentalsByOrg`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listRentalsByOrg, ListRentalsByOrgVariables } from '@dataconnect/generated';

// The `ListRentalsByOrg` query requires an argument of type `ListRentalsByOrgVariables`:
const listRentalsByOrgVars: ListRentalsByOrgVariables = {
  organisationId: ..., 
};

// Call the `listRentalsByOrg()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listRentalsByOrg(listRentalsByOrgVars);
// Variables can be defined inline as well.
const { data } = await listRentalsByOrg({ organisationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listRentalsByOrg(dataConnect, listRentalsByOrgVars);

console.log(data.rentals);

// Or, you can use the `Promise` API.
listRentalsByOrg(listRentalsByOrgVars).then((response) => {
  const data = response.data;
  console.log(data.rentals);
});
```

### Using `ListRentalsByOrg`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listRentalsByOrgRef, ListRentalsByOrgVariables } from '@dataconnect/generated';

// The `ListRentalsByOrg` query requires an argument of type `ListRentalsByOrgVariables`:
const listRentalsByOrgVars: ListRentalsByOrgVariables = {
  organisationId: ..., 
};

// Call the `listRentalsByOrgRef()` function to get a reference to the query.
const ref = listRentalsByOrgRef(listRentalsByOrgVars);
// Variables can be defined inline as well.
const ref = listRentalsByOrgRef({ organisationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listRentalsByOrgRef(dataConnect, listRentalsByOrgVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rentals);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rentals);
});
```

## ListAllOrganisations
You can execute the `ListAllOrganisations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllOrganisations(options?: ExecuteQueryOptions): QueryPromise<ListAllOrganisationsData, undefined>;

interface ListAllOrganisationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllOrganisationsData, undefined>;
}
export const listAllOrganisationsRef: ListAllOrganisationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllOrganisations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllOrganisationsData, undefined>;

interface ListAllOrganisationsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllOrganisationsData, undefined>;
}
export const listAllOrganisationsRef: ListAllOrganisationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllOrganisationsRef:
```typescript
const name = listAllOrganisationsRef.operationName;
console.log(name);
```

### Variables
The `ListAllOrganisations` query has no variables.
### Return Type
Recall that executing the `ListAllOrganisations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllOrganisationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllOrganisations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllOrganisations } from '@dataconnect/generated';


// Call the `listAllOrganisations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllOrganisations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllOrganisations(dataConnect);

console.log(data.organisations);

// Or, you can use the `Promise` API.
listAllOrganisations().then((response) => {
  const data = response.data;
  console.log(data.organisations);
});
```

### Using `ListAllOrganisations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllOrganisationsRef } from '@dataconnect/generated';


// Call the `listAllOrganisationsRef()` function to get a reference to the query.
const ref = listAllOrganisationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllOrganisationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organisations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organisations);
});
```

## GetOrganisationById
You can execute the `GetOrganisationById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getOrganisationById(vars: GetOrganisationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganisationByIdData, GetOrganisationByIdVariables>;

interface GetOrganisationByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganisationByIdVariables): QueryRef<GetOrganisationByIdData, GetOrganisationByIdVariables>;
}
export const getOrganisationByIdRef: GetOrganisationByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganisationById(dc: DataConnect, vars: GetOrganisationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganisationByIdData, GetOrganisationByIdVariables>;

interface GetOrganisationByIdRef {
  ...
  (dc: DataConnect, vars: GetOrganisationByIdVariables): QueryRef<GetOrganisationByIdData, GetOrganisationByIdVariables>;
}
export const getOrganisationByIdRef: GetOrganisationByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganisationByIdRef:
```typescript
const name = getOrganisationByIdRef.operationName;
console.log(name);
```

### Variables
The `GetOrganisationById` query requires an argument of type `GetOrganisationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganisationByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganisationById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganisationByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOrganisationById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganisationById, GetOrganisationByIdVariables } from '@dataconnect/generated';

// The `GetOrganisationById` query requires an argument of type `GetOrganisationByIdVariables`:
const getOrganisationByIdVars: GetOrganisationByIdVariables = {
  id: ..., 
};

// Call the `getOrganisationById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganisationById(getOrganisationByIdVars);
// Variables can be defined inline as well.
const { data } = await getOrganisationById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganisationById(dataConnect, getOrganisationByIdVars);

console.log(data.organisation);

// Or, you can use the `Promise` API.
getOrganisationById(getOrganisationByIdVars).then((response) => {
  const data = response.data;
  console.log(data.organisation);
});
```

### Using `GetOrganisationById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganisationByIdRef, GetOrganisationByIdVariables } from '@dataconnect/generated';

// The `GetOrganisationById` query requires an argument of type `GetOrganisationByIdVariables`:
const getOrganisationByIdVars: GetOrganisationByIdVariables = {
  id: ..., 
};

// Call the `getOrganisationByIdRef()` function to get a reference to the query.
const ref = getOrganisationByIdRef(getOrganisationByIdVars);
// Variables can be defined inline as well.
const ref = getOrganisationByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganisationByIdRef(dataConnect, getOrganisationByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organisation);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organisation);
});
```

## ListOrganisationsByStatus
You can execute the `ListOrganisationsByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listOrganisationsByStatus(vars: ListOrganisationsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganisationsByStatusData, ListOrganisationsByStatusVariables>;

interface ListOrganisationsByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrganisationsByStatusVariables): QueryRef<ListOrganisationsByStatusData, ListOrganisationsByStatusVariables>;
}
export const listOrganisationsByStatusRef: ListOrganisationsByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrganisationsByStatus(dc: DataConnect, vars: ListOrganisationsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganisationsByStatusData, ListOrganisationsByStatusVariables>;

interface ListOrganisationsByStatusRef {
  ...
  (dc: DataConnect, vars: ListOrganisationsByStatusVariables): QueryRef<ListOrganisationsByStatusData, ListOrganisationsByStatusVariables>;
}
export const listOrganisationsByStatusRef: ListOrganisationsByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrganisationsByStatusRef:
```typescript
const name = listOrganisationsByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListOrganisationsByStatus` query requires an argument of type `ListOrganisationsByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListOrganisationsByStatusVariables {
  status: OrgStatus;
}
```
### Return Type
Recall that executing the `ListOrganisationsByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrganisationsByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOrganisationsByStatusData {
  organisations: ({
    id: UUIDString;
    name: string;
    sector: string;
    contactEmail: string;
    status: OrgStatus;
  } & Organisation_Key)[];
}
```
### Using `ListOrganisationsByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrganisationsByStatus, ListOrganisationsByStatusVariables } from '@dataconnect/generated';

// The `ListOrganisationsByStatus` query requires an argument of type `ListOrganisationsByStatusVariables`:
const listOrganisationsByStatusVars: ListOrganisationsByStatusVariables = {
  status: ..., 
};

// Call the `listOrganisationsByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrganisationsByStatus(listOrganisationsByStatusVars);
// Variables can be defined inline as well.
const { data } = await listOrganisationsByStatus({ status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrganisationsByStatus(dataConnect, listOrganisationsByStatusVars);

console.log(data.organisations);

// Or, you can use the `Promise` API.
listOrganisationsByStatus(listOrganisationsByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.organisations);
});
```

### Using `ListOrganisationsByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrganisationsByStatusRef, ListOrganisationsByStatusVariables } from '@dataconnect/generated';

// The `ListOrganisationsByStatus` query requires an argument of type `ListOrganisationsByStatusVariables`:
const listOrganisationsByStatusVars: ListOrganisationsByStatusVariables = {
  status: ..., 
};

// Call the `listOrganisationsByStatusRef()` function to get a reference to the query.
const ref = listOrganisationsByStatusRef(listOrganisationsByStatusVars);
// Variables can be defined inline as well.
const ref = listOrganisationsByStatusRef({ status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrganisationsByStatusRef(dataConnect, listOrganisationsByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organisations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organisations);
});
```

## ListAllOrgRequests
You can execute the `ListAllOrgRequests` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllOrgRequests(options?: ExecuteQueryOptions): QueryPromise<ListAllOrgRequestsData, undefined>;

interface ListAllOrgRequestsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllOrgRequestsData, undefined>;
}
export const listAllOrgRequestsRef: ListAllOrgRequestsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllOrgRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllOrgRequestsData, undefined>;

interface ListAllOrgRequestsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllOrgRequestsData, undefined>;
}
export const listAllOrgRequestsRef: ListAllOrgRequestsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllOrgRequestsRef:
```typescript
const name = listAllOrgRequestsRef.operationName;
console.log(name);
```

### Variables
The `ListAllOrgRequests` query has no variables.
### Return Type
Recall that executing the `ListAllOrgRequests` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllOrgRequestsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllOrgRequests`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllOrgRequests } from '@dataconnect/generated';


// Call the `listAllOrgRequests()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllOrgRequests();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllOrgRequests(dataConnect);

console.log(data.orgRequests);

// Or, you can use the `Promise` API.
listAllOrgRequests().then((response) => {
  const data = response.data;
  console.log(data.orgRequests);
});
```

### Using `ListAllOrgRequests`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllOrgRequestsRef } from '@dataconnect/generated';


// Call the `listAllOrgRequestsRef()` function to get a reference to the query.
const ref = listAllOrgRequestsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllOrgRequestsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orgRequests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orgRequests);
});
```

## GetOrgRequestById
You can execute the `GetOrgRequestById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getOrgRequestById(vars: GetOrgRequestByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrgRequestByIdData, GetOrgRequestByIdVariables>;

interface GetOrgRequestByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrgRequestByIdVariables): QueryRef<GetOrgRequestByIdData, GetOrgRequestByIdVariables>;
}
export const getOrgRequestByIdRef: GetOrgRequestByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrgRequestById(dc: DataConnect, vars: GetOrgRequestByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrgRequestByIdData, GetOrgRequestByIdVariables>;

interface GetOrgRequestByIdRef {
  ...
  (dc: DataConnect, vars: GetOrgRequestByIdVariables): QueryRef<GetOrgRequestByIdData, GetOrgRequestByIdVariables>;
}
export const getOrgRequestByIdRef: GetOrgRequestByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrgRequestByIdRef:
```typescript
const name = getOrgRequestByIdRef.operationName;
console.log(name);
```

### Variables
The `GetOrgRequestById` query requires an argument of type `GetOrgRequestByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrgRequestByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrgRequestById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrgRequestByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOrgRequestById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrgRequestById, GetOrgRequestByIdVariables } from '@dataconnect/generated';

// The `GetOrgRequestById` query requires an argument of type `GetOrgRequestByIdVariables`:
const getOrgRequestByIdVars: GetOrgRequestByIdVariables = {
  id: ..., 
};

// Call the `getOrgRequestById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrgRequestById(getOrgRequestByIdVars);
// Variables can be defined inline as well.
const { data } = await getOrgRequestById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrgRequestById(dataConnect, getOrgRequestByIdVars);

console.log(data.orgRequest);

// Or, you can use the `Promise` API.
getOrgRequestById(getOrgRequestByIdVars).then((response) => {
  const data = response.data;
  console.log(data.orgRequest);
});
```

### Using `GetOrgRequestById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrgRequestByIdRef, GetOrgRequestByIdVariables } from '@dataconnect/generated';

// The `GetOrgRequestById` query requires an argument of type `GetOrgRequestByIdVariables`:
const getOrgRequestByIdVars: GetOrgRequestByIdVariables = {
  id: ..., 
};

// Call the `getOrgRequestByIdRef()` function to get a reference to the query.
const ref = getOrgRequestByIdRef(getOrgRequestByIdVars);
// Variables can be defined inline as well.
const ref = getOrgRequestByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrgRequestByIdRef(dataConnect, getOrgRequestByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orgRequest);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orgRequest);
});
```

## ListOrgRequestsByStatus
You can execute the `ListOrgRequestsByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listOrgRequestsByStatus(vars: ListOrgRequestsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrgRequestsByStatusData, ListOrgRequestsByStatusVariables>;

interface ListOrgRequestsByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrgRequestsByStatusVariables): QueryRef<ListOrgRequestsByStatusData, ListOrgRequestsByStatusVariables>;
}
export const listOrgRequestsByStatusRef: ListOrgRequestsByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrgRequestsByStatus(dc: DataConnect, vars: ListOrgRequestsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrgRequestsByStatusData, ListOrgRequestsByStatusVariables>;

interface ListOrgRequestsByStatusRef {
  ...
  (dc: DataConnect, vars: ListOrgRequestsByStatusVariables): QueryRef<ListOrgRequestsByStatusData, ListOrgRequestsByStatusVariables>;
}
export const listOrgRequestsByStatusRef: ListOrgRequestsByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrgRequestsByStatusRef:
```typescript
const name = listOrgRequestsByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListOrgRequestsByStatus` query requires an argument of type `ListOrgRequestsByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListOrgRequestsByStatusVariables {
  status: OrgRequestStatus;
}
```
### Return Type
Recall that executing the `ListOrgRequestsByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrgRequestsByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListOrgRequestsByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrgRequestsByStatus, ListOrgRequestsByStatusVariables } from '@dataconnect/generated';

// The `ListOrgRequestsByStatus` query requires an argument of type `ListOrgRequestsByStatusVariables`:
const listOrgRequestsByStatusVars: ListOrgRequestsByStatusVariables = {
  status: ..., 
};

// Call the `listOrgRequestsByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrgRequestsByStatus(listOrgRequestsByStatusVars);
// Variables can be defined inline as well.
const { data } = await listOrgRequestsByStatus({ status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrgRequestsByStatus(dataConnect, listOrgRequestsByStatusVars);

console.log(data.orgRequests);

// Or, you can use the `Promise` API.
listOrgRequestsByStatus(listOrgRequestsByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.orgRequests);
});
```

### Using `ListOrgRequestsByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrgRequestsByStatusRef, ListOrgRequestsByStatusVariables } from '@dataconnect/generated';

// The `ListOrgRequestsByStatus` query requires an argument of type `ListOrgRequestsByStatusVariables`:
const listOrgRequestsByStatusVars: ListOrgRequestsByStatusVariables = {
  status: ..., 
};

// Call the `listOrgRequestsByStatusRef()` function to get a reference to the query.
const ref = listOrgRequestsByStatusRef(listOrgRequestsByStatusVars);
// Variables can be defined inline as well.
const ref = listOrgRequestsByStatusRef({ status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrgRequestsByStatusRef(dataConnect, listOrgRequestsByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orgRequests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orgRequests);
});
```

## ListAllUsers
You can execute the `ListAllUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllUsersRef:
```typescript
const name = listAllUsersRef.operationName;
console.log(name);
```

### Variables
The `ListAllUsers` query has no variables.
### Return Type
Recall that executing the `ListAllUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllUsers } from '@dataconnect/generated';


// Call the `listAllUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listAllUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListAllUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllUsersRef } from '@dataconnect/generated';


// Call the `listAllUsersRef()` function to get a reference to the query.
const ref = listAllUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetUserById
You can execute the `GetUserById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserById(vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByIdRef:
```typescript
const name = getUserByIdRef.operationName;
console.log(name);
```

### Variables
The `GetUserById` query requires an argument of type `GetUserByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserById, GetUserByIdVariables } from '@dataconnect/generated';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  id: ..., 
};

// Call the `getUserById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserById(getUserByIdVars);
// Variables can be defined inline as well.
const { data } = await getUserById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserById(dataConnect, getUserByIdVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserById(getUserByIdVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByIdRef, GetUserByIdVariables } from '@dataconnect/generated';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  id: ..., 
};

// Call the `getUserByIdRef()` function to get a reference to the query.
const ref = getUserByIdRef(getUserByIdVars);
// Variables can be defined inline as well.
const ref = getUserByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByIdRef(dataConnect, getUserByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsersByOrg
You can execute the `ListUsersByOrg` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsersByOrg(vars: ListUsersByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByOrgData, ListUsersByOrgVariables>;

interface ListUsersByOrgRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUsersByOrgVariables): QueryRef<ListUsersByOrgData, ListUsersByOrgVariables>;
}
export const listUsersByOrgRef: ListUsersByOrgRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsersByOrg(dc: DataConnect, vars: ListUsersByOrgVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByOrgData, ListUsersByOrgVariables>;

interface ListUsersByOrgRef {
  ...
  (dc: DataConnect, vars: ListUsersByOrgVariables): QueryRef<ListUsersByOrgData, ListUsersByOrgVariables>;
}
export const listUsersByOrgRef: ListUsersByOrgRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersByOrgRef:
```typescript
const name = listUsersByOrgRef.operationName;
console.log(name);
```

### Variables
The `ListUsersByOrg` query requires an argument of type `ListUsersByOrgVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUsersByOrgVariables {
  organisationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListUsersByOrg` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersByOrgData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersByOrgData {
  users: ({
    id: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
  } & User_Key)[];
}
```
### Using `ListUsersByOrg`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsersByOrg, ListUsersByOrgVariables } from '@dataconnect/generated';

// The `ListUsersByOrg` query requires an argument of type `ListUsersByOrgVariables`:
const listUsersByOrgVars: ListUsersByOrgVariables = {
  organisationId: ..., 
};

// Call the `listUsersByOrg()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsersByOrg(listUsersByOrgVars);
// Variables can be defined inline as well.
const { data } = await listUsersByOrg({ organisationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsersByOrg(dataConnect, listUsersByOrgVars);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsersByOrg(listUsersByOrgVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsersByOrg`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersByOrgRef, ListUsersByOrgVariables } from '@dataconnect/generated';

// The `ListUsersByOrg` query requires an argument of type `ListUsersByOrgVariables`:
const listUsersByOrgVars: ListUsersByOrgVariables = {
  organisationId: ..., 
};

// Call the `listUsersByOrgRef()` function to get a reference to the query.
const ref = listUsersByOrgRef(listUsersByOrgVars);
// Variables can be defined inline as well.
const ref = listUsersByOrgRef({ organisationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersByOrgRef(dataConnect, listUsersByOrgVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetUserByEmail
You can execute the `GetUserByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserByEmail(vars: GetUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByEmailRef:
```typescript
const name = getUserByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetUserByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByEmail, GetUserByEmailVariables } from '@dataconnect/generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByEmail(getUserByEmailVars);
// Variables can be defined inline as well.
const { data } = await getUserByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByEmail(dataConnect, getUserByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByEmail(getUserByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByEmailRef, GetUserByEmailVariables } from '@dataconnect/generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmailRef()` function to get a reference to the query.
const ref = getUserByEmailRef(getUserByEmailVars);
// Variables can be defined inline as well.
const ref = getUserByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByEmailRef(dataConnect, getUserByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetUserTotpByEmail
You can execute the `GetUserTotpByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserTotpByEmail(vars: GetUserTotpByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserTotpByEmailData, GetUserTotpByEmailVariables>;

interface GetUserTotpByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserTotpByEmailVariables): QueryRef<GetUserTotpByEmailData, GetUserTotpByEmailVariables>;
}
export const getUserTotpByEmailRef: GetUserTotpByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserTotpByEmail(dc: DataConnect, vars: GetUserTotpByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserTotpByEmailData, GetUserTotpByEmailVariables>;

interface GetUserTotpByEmailRef {
  ...
  (dc: DataConnect, vars: GetUserTotpByEmailVariables): QueryRef<GetUserTotpByEmailData, GetUserTotpByEmailVariables>;
}
export const getUserTotpByEmailRef: GetUserTotpByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserTotpByEmailRef:
```typescript
const name = getUserTotpByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetUserTotpByEmail` query requires an argument of type `GetUserTotpByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserTotpByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetUserTotpByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserTotpByEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserTotpByEmailData {
  users: ({
    id: UUIDString;
    role: UserRole;
    totpEnabled: boolean;
    totpSecretEnc?: string | null;
    totpBackupCodesEnc?: string | null;
    totpVerifiedAt?: TimestampString | null;
  } & User_Key)[];
}
```
### Using `GetUserTotpByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserTotpByEmail, GetUserTotpByEmailVariables } from '@dataconnect/generated';

// The `GetUserTotpByEmail` query requires an argument of type `GetUserTotpByEmailVariables`:
const getUserTotpByEmailVars: GetUserTotpByEmailVariables = {
  email: ..., 
};

// Call the `getUserTotpByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserTotpByEmail(getUserTotpByEmailVars);
// Variables can be defined inline as well.
const { data } = await getUserTotpByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserTotpByEmail(dataConnect, getUserTotpByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserTotpByEmail(getUserTotpByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserTotpByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserTotpByEmailRef, GetUserTotpByEmailVariables } from '@dataconnect/generated';

// The `GetUserTotpByEmail` query requires an argument of type `GetUserTotpByEmailVariables`:
const getUserTotpByEmailVars: GetUserTotpByEmailVariables = {
  email: ..., 
};

// Call the `getUserTotpByEmailRef()` function to get a reference to the query.
const ref = getUserTotpByEmailRef(getUserTotpByEmailVars);
// Variables can be defined inline as well.
const ref = getUserTotpByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserTotpByEmailRef(dataConnect, getUserTotpByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListUsersByRole
You can execute the `ListUsersByRole` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsersByRole(vars: ListUsersByRoleVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByRoleData, ListUsersByRoleVariables>;

interface ListUsersByRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUsersByRoleVariables): QueryRef<ListUsersByRoleData, ListUsersByRoleVariables>;
}
export const listUsersByRoleRef: ListUsersByRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsersByRole(dc: DataConnect, vars: ListUsersByRoleVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByRoleData, ListUsersByRoleVariables>;

interface ListUsersByRoleRef {
  ...
  (dc: DataConnect, vars: ListUsersByRoleVariables): QueryRef<ListUsersByRoleData, ListUsersByRoleVariables>;
}
export const listUsersByRoleRef: ListUsersByRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersByRoleRef:
```typescript
const name = listUsersByRoleRef.operationName;
console.log(name);
```

### Variables
The `ListUsersByRole` query requires an argument of type `ListUsersByRoleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUsersByRoleVariables {
  role: UserRole;
}
```
### Return Type
Recall that executing the `ListUsersByRole` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersByRoleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUsersByRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsersByRole, ListUsersByRoleVariables } from '@dataconnect/generated';

// The `ListUsersByRole` query requires an argument of type `ListUsersByRoleVariables`:
const listUsersByRoleVars: ListUsersByRoleVariables = {
  role: ..., 
};

// Call the `listUsersByRole()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsersByRole(listUsersByRoleVars);
// Variables can be defined inline as well.
const { data } = await listUsersByRole({ role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsersByRole(dataConnect, listUsersByRoleVars);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsersByRole(listUsersByRoleVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsersByRole`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersByRoleRef, ListUsersByRoleVariables } from '@dataconnect/generated';

// The `ListUsersByRole` query requires an argument of type `ListUsersByRoleVariables`:
const listUsersByRoleVars: ListUsersByRoleVariables = {
  role: ..., 
};

// Call the `listUsersByRoleRef()` function to get a reference to the query.
const ref = listUsersByRoleRef(listUsersByRoleVars);
// Variables can be defined inline as well.
const ref = listUsersByRoleRef({ role: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersByRoleRef(dataConnect, listUsersByRoleVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListAllMaintenanceQueries
You can execute the `ListAllMaintenanceQueries` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllMaintenanceQueries(options?: ExecuteQueryOptions): QueryPromise<ListAllMaintenanceQueriesData, undefined>;

interface ListAllMaintenanceQueriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllMaintenanceQueriesData, undefined>;
}
export const listAllMaintenanceQueriesRef: ListAllMaintenanceQueriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllMaintenanceQueries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllMaintenanceQueriesData, undefined>;

interface ListAllMaintenanceQueriesRef {
  ...
  (dc: DataConnect): QueryRef<ListAllMaintenanceQueriesData, undefined>;
}
export const listAllMaintenanceQueriesRef: ListAllMaintenanceQueriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllMaintenanceQueriesRef:
```typescript
const name = listAllMaintenanceQueriesRef.operationName;
console.log(name);
```

### Variables
The `ListAllMaintenanceQueries` query has no variables.
### Return Type
Recall that executing the `ListAllMaintenanceQueries` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllMaintenanceQueriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllMaintenanceQueries`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllMaintenanceQueries } from '@dataconnect/generated';


// Call the `listAllMaintenanceQueries()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllMaintenanceQueries();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllMaintenanceQueries(dataConnect);

console.log(data.maintenanceQueries);

// Or, you can use the `Promise` API.
listAllMaintenanceQueries().then((response) => {
  const data = response.data;
  console.log(data.maintenanceQueries);
});
```

### Using `ListAllMaintenanceQueries`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllMaintenanceQueriesRef } from '@dataconnect/generated';


// Call the `listAllMaintenanceQueriesRef()` function to get a reference to the query.
const ref = listAllMaintenanceQueriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllMaintenanceQueriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.maintenanceQueries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQueries);
});
```

## GetMaintenanceById
You can execute the `GetMaintenanceById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMaintenanceById(vars: GetMaintenanceByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetMaintenanceByIdData, GetMaintenanceByIdVariables>;

interface GetMaintenanceByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMaintenanceByIdVariables): QueryRef<GetMaintenanceByIdData, GetMaintenanceByIdVariables>;
}
export const getMaintenanceByIdRef: GetMaintenanceByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMaintenanceById(dc: DataConnect, vars: GetMaintenanceByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetMaintenanceByIdData, GetMaintenanceByIdVariables>;

interface GetMaintenanceByIdRef {
  ...
  (dc: DataConnect, vars: GetMaintenanceByIdVariables): QueryRef<GetMaintenanceByIdData, GetMaintenanceByIdVariables>;
}
export const getMaintenanceByIdRef: GetMaintenanceByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMaintenanceByIdRef:
```typescript
const name = getMaintenanceByIdRef.operationName;
console.log(name);
```

### Variables
The `GetMaintenanceById` query requires an argument of type `GetMaintenanceByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMaintenanceByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMaintenanceById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMaintenanceByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMaintenanceById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMaintenanceById, GetMaintenanceByIdVariables } from '@dataconnect/generated';

// The `GetMaintenanceById` query requires an argument of type `GetMaintenanceByIdVariables`:
const getMaintenanceByIdVars: GetMaintenanceByIdVariables = {
  id: ..., 
};

// Call the `getMaintenanceById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMaintenanceById(getMaintenanceByIdVars);
// Variables can be defined inline as well.
const { data } = await getMaintenanceById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMaintenanceById(dataConnect, getMaintenanceByIdVars);

console.log(data.maintenanceQuery);

// Or, you can use the `Promise` API.
getMaintenanceById(getMaintenanceByIdVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery);
});
```

### Using `GetMaintenanceById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMaintenanceByIdRef, GetMaintenanceByIdVariables } from '@dataconnect/generated';

// The `GetMaintenanceById` query requires an argument of type `GetMaintenanceByIdVariables`:
const getMaintenanceByIdVars: GetMaintenanceByIdVariables = {
  id: ..., 
};

// Call the `getMaintenanceByIdRef()` function to get a reference to the query.
const ref = getMaintenanceByIdRef(getMaintenanceByIdVars);
// Variables can be defined inline as well.
const ref = getMaintenanceByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMaintenanceByIdRef(dataConnect, getMaintenanceByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.maintenanceQuery);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery);
});
```

## ListMaintenanceByVehicle
You can execute the `ListMaintenanceByVehicle` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMaintenanceByVehicle(vars: ListMaintenanceByVehicleVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByVehicleData, ListMaintenanceByVehicleVariables>;

interface ListMaintenanceByVehicleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMaintenanceByVehicleVariables): QueryRef<ListMaintenanceByVehicleData, ListMaintenanceByVehicleVariables>;
}
export const listMaintenanceByVehicleRef: ListMaintenanceByVehicleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMaintenanceByVehicle(dc: DataConnect, vars: ListMaintenanceByVehicleVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByVehicleData, ListMaintenanceByVehicleVariables>;

interface ListMaintenanceByVehicleRef {
  ...
  (dc: DataConnect, vars: ListMaintenanceByVehicleVariables): QueryRef<ListMaintenanceByVehicleData, ListMaintenanceByVehicleVariables>;
}
export const listMaintenanceByVehicleRef: ListMaintenanceByVehicleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMaintenanceByVehicleRef:
```typescript
const name = listMaintenanceByVehicleRef.operationName;
console.log(name);
```

### Variables
The `ListMaintenanceByVehicle` query requires an argument of type `ListMaintenanceByVehicleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMaintenanceByVehicleVariables {
  vehicleId: UUIDString;
}
```
### Return Type
Recall that executing the `ListMaintenanceByVehicle` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMaintenanceByVehicleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMaintenanceByVehicle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMaintenanceByVehicle, ListMaintenanceByVehicleVariables } from '@dataconnect/generated';

// The `ListMaintenanceByVehicle` query requires an argument of type `ListMaintenanceByVehicleVariables`:
const listMaintenanceByVehicleVars: ListMaintenanceByVehicleVariables = {
  vehicleId: ..., 
};

// Call the `listMaintenanceByVehicle()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMaintenanceByVehicle(listMaintenanceByVehicleVars);
// Variables can be defined inline as well.
const { data } = await listMaintenanceByVehicle({ vehicleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMaintenanceByVehicle(dataConnect, listMaintenanceByVehicleVars);

console.log(data.maintenanceQueries);

// Or, you can use the `Promise` API.
listMaintenanceByVehicle(listMaintenanceByVehicleVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQueries);
});
```

### Using `ListMaintenanceByVehicle`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMaintenanceByVehicleRef, ListMaintenanceByVehicleVariables } from '@dataconnect/generated';

// The `ListMaintenanceByVehicle` query requires an argument of type `ListMaintenanceByVehicleVariables`:
const listMaintenanceByVehicleVars: ListMaintenanceByVehicleVariables = {
  vehicleId: ..., 
};

// Call the `listMaintenanceByVehicleRef()` function to get a reference to the query.
const ref = listMaintenanceByVehicleRef(listMaintenanceByVehicleVars);
// Variables can be defined inline as well.
const ref = listMaintenanceByVehicleRef({ vehicleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMaintenanceByVehicleRef(dataConnect, listMaintenanceByVehicleVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.maintenanceQueries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQueries);
});
```

## ListMaintenanceByStatus
You can execute the `ListMaintenanceByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMaintenanceByStatus(vars: ListMaintenanceByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByStatusData, ListMaintenanceByStatusVariables>;

interface ListMaintenanceByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMaintenanceByStatusVariables): QueryRef<ListMaintenanceByStatusData, ListMaintenanceByStatusVariables>;
}
export const listMaintenanceByStatusRef: ListMaintenanceByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMaintenanceByStatus(dc: DataConnect, vars: ListMaintenanceByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByStatusData, ListMaintenanceByStatusVariables>;

interface ListMaintenanceByStatusRef {
  ...
  (dc: DataConnect, vars: ListMaintenanceByStatusVariables): QueryRef<ListMaintenanceByStatusData, ListMaintenanceByStatusVariables>;
}
export const listMaintenanceByStatusRef: ListMaintenanceByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMaintenanceByStatusRef:
```typescript
const name = listMaintenanceByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListMaintenanceByStatus` query requires an argument of type `ListMaintenanceByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMaintenanceByStatusVariables {
  status: MaintenanceStatus;
}
```
### Return Type
Recall that executing the `ListMaintenanceByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMaintenanceByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMaintenanceByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMaintenanceByStatus, ListMaintenanceByStatusVariables } from '@dataconnect/generated';

// The `ListMaintenanceByStatus` query requires an argument of type `ListMaintenanceByStatusVariables`:
const listMaintenanceByStatusVars: ListMaintenanceByStatusVariables = {
  status: ..., 
};

// Call the `listMaintenanceByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMaintenanceByStatus(listMaintenanceByStatusVars);
// Variables can be defined inline as well.
const { data } = await listMaintenanceByStatus({ status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMaintenanceByStatus(dataConnect, listMaintenanceByStatusVars);

console.log(data.maintenanceQueries);

// Or, you can use the `Promise` API.
listMaintenanceByStatus(listMaintenanceByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQueries);
});
```

### Using `ListMaintenanceByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMaintenanceByStatusRef, ListMaintenanceByStatusVariables } from '@dataconnect/generated';

// The `ListMaintenanceByStatus` query requires an argument of type `ListMaintenanceByStatusVariables`:
const listMaintenanceByStatusVars: ListMaintenanceByStatusVariables = {
  status: ..., 
};

// Call the `listMaintenanceByStatusRef()` function to get a reference to the query.
const ref = listMaintenanceByStatusRef(listMaintenanceByStatusVars);
// Variables can be defined inline as well.
const ref = listMaintenanceByStatusRef({ status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMaintenanceByStatusRef(dataConnect, listMaintenanceByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.maintenanceQueries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQueries);
});
```

## ListMaintenanceByPriority
You can execute the `ListMaintenanceByPriority` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMaintenanceByPriority(vars: ListMaintenanceByPriorityVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByPriorityData, ListMaintenanceByPriorityVariables>;

interface ListMaintenanceByPriorityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMaintenanceByPriorityVariables): QueryRef<ListMaintenanceByPriorityData, ListMaintenanceByPriorityVariables>;
}
export const listMaintenanceByPriorityRef: ListMaintenanceByPriorityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMaintenanceByPriority(dc: DataConnect, vars: ListMaintenanceByPriorityVariables, options?: ExecuteQueryOptions): QueryPromise<ListMaintenanceByPriorityData, ListMaintenanceByPriorityVariables>;

interface ListMaintenanceByPriorityRef {
  ...
  (dc: DataConnect, vars: ListMaintenanceByPriorityVariables): QueryRef<ListMaintenanceByPriorityData, ListMaintenanceByPriorityVariables>;
}
export const listMaintenanceByPriorityRef: ListMaintenanceByPriorityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMaintenanceByPriorityRef:
```typescript
const name = listMaintenanceByPriorityRef.operationName;
console.log(name);
```

### Variables
The `ListMaintenanceByPriority` query requires an argument of type `ListMaintenanceByPriorityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMaintenanceByPriorityVariables {
  priority: MaintenancePriority;
}
```
### Return Type
Recall that executing the `ListMaintenanceByPriority` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMaintenanceByPriorityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMaintenanceByPriority`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMaintenanceByPriority, ListMaintenanceByPriorityVariables } from '@dataconnect/generated';

// The `ListMaintenanceByPriority` query requires an argument of type `ListMaintenanceByPriorityVariables`:
const listMaintenanceByPriorityVars: ListMaintenanceByPriorityVariables = {
  priority: ..., 
};

// Call the `listMaintenanceByPriority()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMaintenanceByPriority(listMaintenanceByPriorityVars);
// Variables can be defined inline as well.
const { data } = await listMaintenanceByPriority({ priority: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMaintenanceByPriority(dataConnect, listMaintenanceByPriorityVars);

console.log(data.maintenanceQueries);

// Or, you can use the `Promise` API.
listMaintenanceByPriority(listMaintenanceByPriorityVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQueries);
});
```

### Using `ListMaintenanceByPriority`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMaintenanceByPriorityRef, ListMaintenanceByPriorityVariables } from '@dataconnect/generated';

// The `ListMaintenanceByPriority` query requires an argument of type `ListMaintenanceByPriorityVariables`:
const listMaintenanceByPriorityVars: ListMaintenanceByPriorityVariables = {
  priority: ..., 
};

// Call the `listMaintenanceByPriorityRef()` function to get a reference to the query.
const ref = listMaintenanceByPriorityRef(listMaintenanceByPriorityVars);
// Variables can be defined inline as well.
const ref = listMaintenanceByPriorityRef({ priority: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMaintenanceByPriorityRef(dataConnect, listMaintenanceByPriorityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.maintenanceQueries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQueries);
});
```

## ListAllRentalApplications
You can execute the `ListAllRentalApplications` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllRentalApplications(options?: ExecuteQueryOptions): QueryPromise<ListAllRentalApplicationsData, undefined>;

interface ListAllRentalApplicationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllRentalApplicationsData, undefined>;
}
export const listAllRentalApplicationsRef: ListAllRentalApplicationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllRentalApplications(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllRentalApplicationsData, undefined>;

interface ListAllRentalApplicationsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllRentalApplicationsData, undefined>;
}
export const listAllRentalApplicationsRef: ListAllRentalApplicationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllRentalApplicationsRef:
```typescript
const name = listAllRentalApplicationsRef.operationName;
console.log(name);
```

### Variables
The `ListAllRentalApplications` query has no variables.
### Return Type
Recall that executing the `ListAllRentalApplications` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllRentalApplicationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllRentalApplications`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllRentalApplications } from '@dataconnect/generated';


// Call the `listAllRentalApplications()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllRentalApplications();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllRentalApplications(dataConnect);

console.log(data.rentalApplications);

// Or, you can use the `Promise` API.
listAllRentalApplications().then((response) => {
  const data = response.data;
  console.log(data.rentalApplications);
});
```

### Using `ListAllRentalApplications`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllRentalApplicationsRef } from '@dataconnect/generated';


// Call the `listAllRentalApplicationsRef()` function to get a reference to the query.
const ref = listAllRentalApplicationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllRentalApplicationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rentalApplications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rentalApplications);
});
```

## GetRentalApplicationById
You can execute the `GetRentalApplicationById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getRentalApplicationById(vars: GetRentalApplicationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRentalApplicationByIdData, GetRentalApplicationByIdVariables>;

interface GetRentalApplicationByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRentalApplicationByIdVariables): QueryRef<GetRentalApplicationByIdData, GetRentalApplicationByIdVariables>;
}
export const getRentalApplicationByIdRef: GetRentalApplicationByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRentalApplicationById(dc: DataConnect, vars: GetRentalApplicationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRentalApplicationByIdData, GetRentalApplicationByIdVariables>;

interface GetRentalApplicationByIdRef {
  ...
  (dc: DataConnect, vars: GetRentalApplicationByIdVariables): QueryRef<GetRentalApplicationByIdData, GetRentalApplicationByIdVariables>;
}
export const getRentalApplicationByIdRef: GetRentalApplicationByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRentalApplicationByIdRef:
```typescript
const name = getRentalApplicationByIdRef.operationName;
console.log(name);
```

### Variables
The `GetRentalApplicationById` query requires an argument of type `GetRentalApplicationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRentalApplicationByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetRentalApplicationById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRentalApplicationByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetRentalApplicationById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRentalApplicationById, GetRentalApplicationByIdVariables } from '@dataconnect/generated';

// The `GetRentalApplicationById` query requires an argument of type `GetRentalApplicationByIdVariables`:
const getRentalApplicationByIdVars: GetRentalApplicationByIdVariables = {
  id: ..., 
};

// Call the `getRentalApplicationById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRentalApplicationById(getRentalApplicationByIdVars);
// Variables can be defined inline as well.
const { data } = await getRentalApplicationById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRentalApplicationById(dataConnect, getRentalApplicationByIdVars);

console.log(data.rentalApplication);

// Or, you can use the `Promise` API.
getRentalApplicationById(getRentalApplicationByIdVars).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication);
});
```

### Using `GetRentalApplicationById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRentalApplicationByIdRef, GetRentalApplicationByIdVariables } from '@dataconnect/generated';

// The `GetRentalApplicationById` query requires an argument of type `GetRentalApplicationByIdVariables`:
const getRentalApplicationByIdVars: GetRentalApplicationByIdVariables = {
  id: ..., 
};

// Call the `getRentalApplicationByIdRef()` function to get a reference to the query.
const ref = getRentalApplicationByIdRef(getRentalApplicationByIdVars);
// Variables can be defined inline as well.
const ref = getRentalApplicationByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRentalApplicationByIdRef(dataConnect, getRentalApplicationByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rentalApplication);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication);
});
```

## ListRentalApplicationsByStatus
You can execute the `ListRentalApplicationsByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listRentalApplicationsByStatus(vars: ListRentalApplicationsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalApplicationsByStatusData, ListRentalApplicationsByStatusVariables>;

interface ListRentalApplicationsByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListRentalApplicationsByStatusVariables): QueryRef<ListRentalApplicationsByStatusData, ListRentalApplicationsByStatusVariables>;
}
export const listRentalApplicationsByStatusRef: ListRentalApplicationsByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listRentalApplicationsByStatus(dc: DataConnect, vars: ListRentalApplicationsByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListRentalApplicationsByStatusData, ListRentalApplicationsByStatusVariables>;

interface ListRentalApplicationsByStatusRef {
  ...
  (dc: DataConnect, vars: ListRentalApplicationsByStatusVariables): QueryRef<ListRentalApplicationsByStatusData, ListRentalApplicationsByStatusVariables>;
}
export const listRentalApplicationsByStatusRef: ListRentalApplicationsByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listRentalApplicationsByStatusRef:
```typescript
const name = listRentalApplicationsByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListRentalApplicationsByStatus` query requires an argument of type `ListRentalApplicationsByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListRentalApplicationsByStatusVariables {
  status: ApplicationStatus;
}
```
### Return Type
Recall that executing the `ListRentalApplicationsByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListRentalApplicationsByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListRentalApplicationsByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listRentalApplicationsByStatus, ListRentalApplicationsByStatusVariables } from '@dataconnect/generated';

// The `ListRentalApplicationsByStatus` query requires an argument of type `ListRentalApplicationsByStatusVariables`:
const listRentalApplicationsByStatusVars: ListRentalApplicationsByStatusVariables = {
  status: ..., 
};

// Call the `listRentalApplicationsByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listRentalApplicationsByStatus(listRentalApplicationsByStatusVars);
// Variables can be defined inline as well.
const { data } = await listRentalApplicationsByStatus({ status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listRentalApplicationsByStatus(dataConnect, listRentalApplicationsByStatusVars);

console.log(data.rentalApplications);

// Or, you can use the `Promise` API.
listRentalApplicationsByStatus(listRentalApplicationsByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.rentalApplications);
});
```

### Using `ListRentalApplicationsByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listRentalApplicationsByStatusRef, ListRentalApplicationsByStatusVariables } from '@dataconnect/generated';

// The `ListRentalApplicationsByStatus` query requires an argument of type `ListRentalApplicationsByStatusVariables`:
const listRentalApplicationsByStatusVars: ListRentalApplicationsByStatusVariables = {
  status: ..., 
};

// Call the `listRentalApplicationsByStatusRef()` function to get a reference to the query.
const ref = listRentalApplicationsByStatusRef(listRentalApplicationsByStatusVars);
// Variables can be defined inline as well.
const ref = listRentalApplicationsByStatusRef({ status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listRentalApplicationsByStatusRef(dataConnect, listRentalApplicationsByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rentalApplications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rentalApplications);
});
```

## ListAuditLogs
You can execute the `ListAuditLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAuditLogs(vars?: ListAuditLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsData, ListAuditLogsVariables>;

interface ListAuditLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListAuditLogsVariables): QueryRef<ListAuditLogsData, ListAuditLogsVariables>;
}
export const listAuditLogsRef: ListAuditLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAuditLogs(dc: DataConnect, vars?: ListAuditLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsData, ListAuditLogsVariables>;

interface ListAuditLogsRef {
  ...
  (dc: DataConnect, vars?: ListAuditLogsVariables): QueryRef<ListAuditLogsData, ListAuditLogsVariables>;
}
export const listAuditLogsRef: ListAuditLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAuditLogsRef:
```typescript
const name = listAuditLogsRef.operationName;
console.log(name);
```

### Variables
The `ListAuditLogs` query has an optional argument of type `ListAuditLogsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAuditLogsVariables {
  limit?: number | null;
}
```
### Return Type
Recall that executing the `ListAuditLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAuditLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAuditLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAuditLogs, ListAuditLogsVariables } from '@dataconnect/generated';

// The `ListAuditLogs` query has an optional argument of type `ListAuditLogsVariables`:
const listAuditLogsVars: ListAuditLogsVariables = {
  limit: ..., // optional
};

// Call the `listAuditLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAuditLogs(listAuditLogsVars);
// Variables can be defined inline as well.
const { data } = await listAuditLogs({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListAuditLogsVariables` argument.
const { data } = await listAuditLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAuditLogs(dataConnect, listAuditLogsVars);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
listAuditLogs(listAuditLogsVars).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

### Using `ListAuditLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAuditLogsRef, ListAuditLogsVariables } from '@dataconnect/generated';

// The `ListAuditLogs` query has an optional argument of type `ListAuditLogsVariables`:
const listAuditLogsVars: ListAuditLogsVariables = {
  limit: ..., // optional
};

// Call the `listAuditLogsRef()` function to get a reference to the query.
const ref = listAuditLogsRef(listAuditLogsVars);
// Variables can be defined inline as well.
const ref = listAuditLogsRef({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListAuditLogsVariables` argument.
const ref = listAuditLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAuditLogsRef(dataConnect, listAuditLogsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

## ListAuditLogsByAction
You can execute the `ListAuditLogsByAction` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAuditLogsByAction(vars: ListAuditLogsByActionVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsByActionData, ListAuditLogsByActionVariables>;

interface ListAuditLogsByActionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAuditLogsByActionVariables): QueryRef<ListAuditLogsByActionData, ListAuditLogsByActionVariables>;
}
export const listAuditLogsByActionRef: ListAuditLogsByActionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAuditLogsByAction(dc: DataConnect, vars: ListAuditLogsByActionVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsByActionData, ListAuditLogsByActionVariables>;

interface ListAuditLogsByActionRef {
  ...
  (dc: DataConnect, vars: ListAuditLogsByActionVariables): QueryRef<ListAuditLogsByActionData, ListAuditLogsByActionVariables>;
}
export const listAuditLogsByActionRef: ListAuditLogsByActionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAuditLogsByActionRef:
```typescript
const name = listAuditLogsByActionRef.operationName;
console.log(name);
```

### Variables
The `ListAuditLogsByAction` query requires an argument of type `ListAuditLogsByActionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAuditLogsByActionVariables {
  action: string;
}
```
### Return Type
Recall that executing the `ListAuditLogsByAction` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAuditLogsByActionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAuditLogsByAction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAuditLogsByAction, ListAuditLogsByActionVariables } from '@dataconnect/generated';

// The `ListAuditLogsByAction` query requires an argument of type `ListAuditLogsByActionVariables`:
const listAuditLogsByActionVars: ListAuditLogsByActionVariables = {
  action: ..., 
};

// Call the `listAuditLogsByAction()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAuditLogsByAction(listAuditLogsByActionVars);
// Variables can be defined inline as well.
const { data } = await listAuditLogsByAction({ action: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAuditLogsByAction(dataConnect, listAuditLogsByActionVars);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
listAuditLogsByAction(listAuditLogsByActionVars).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

### Using `ListAuditLogsByAction`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAuditLogsByActionRef, ListAuditLogsByActionVariables } from '@dataconnect/generated';

// The `ListAuditLogsByAction` query requires an argument of type `ListAuditLogsByActionVariables`:
const listAuditLogsByActionVars: ListAuditLogsByActionVariables = {
  action: ..., 
};

// Call the `listAuditLogsByActionRef()` function to get a reference to the query.
const ref = listAuditLogsByActionRef(listAuditLogsByActionVars);
// Variables can be defined inline as well.
const ref = listAuditLogsByActionRef({ action: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAuditLogsByActionRef(dataConnect, listAuditLogsByActionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

## ListAuditLogsByUser
You can execute the `ListAuditLogsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAuditLogsByUser(vars: ListAuditLogsByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsByUserData, ListAuditLogsByUserVariables>;

interface ListAuditLogsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAuditLogsByUserVariables): QueryRef<ListAuditLogsByUserData, ListAuditLogsByUserVariables>;
}
export const listAuditLogsByUserRef: ListAuditLogsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAuditLogsByUser(dc: DataConnect, vars: ListAuditLogsByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsByUserData, ListAuditLogsByUserVariables>;

interface ListAuditLogsByUserRef {
  ...
  (dc: DataConnect, vars: ListAuditLogsByUserVariables): QueryRef<ListAuditLogsByUserData, ListAuditLogsByUserVariables>;
}
export const listAuditLogsByUserRef: ListAuditLogsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAuditLogsByUserRef:
```typescript
const name = listAuditLogsByUserRef.operationName;
console.log(name);
```

### Variables
The `ListAuditLogsByUser` query requires an argument of type `ListAuditLogsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAuditLogsByUserVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListAuditLogsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAuditLogsByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAuditLogsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAuditLogsByUser, ListAuditLogsByUserVariables } from '@dataconnect/generated';

// The `ListAuditLogsByUser` query requires an argument of type `ListAuditLogsByUserVariables`:
const listAuditLogsByUserVars: ListAuditLogsByUserVariables = {
  userId: ..., 
};

// Call the `listAuditLogsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAuditLogsByUser(listAuditLogsByUserVars);
// Variables can be defined inline as well.
const { data } = await listAuditLogsByUser({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAuditLogsByUser(dataConnect, listAuditLogsByUserVars);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
listAuditLogsByUser(listAuditLogsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

### Using `ListAuditLogsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAuditLogsByUserRef, ListAuditLogsByUserVariables } from '@dataconnect/generated';

// The `ListAuditLogsByUser` query requires an argument of type `ListAuditLogsByUserVariables`:
const listAuditLogsByUserVars: ListAuditLogsByUserVariables = {
  userId: ..., 
};

// Call the `listAuditLogsByUserRef()` function to get a reference to the query.
const ref = listAuditLogsByUserRef(listAuditLogsByUserVars);
// Variables can be defined inline as well.
const ref = listAuditLogsByUserRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAuditLogsByUserRef(dataConnect, listAuditLogsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

## ListAllCatalogItems
You can execute the `ListAllCatalogItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllCatalogItems(options?: ExecuteQueryOptions): QueryPromise<ListAllCatalogItemsData, undefined>;

interface ListAllCatalogItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllCatalogItemsData, undefined>;
}
export const listAllCatalogItemsRef: ListAllCatalogItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllCatalogItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllCatalogItemsData, undefined>;

interface ListAllCatalogItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllCatalogItemsData, undefined>;
}
export const listAllCatalogItemsRef: ListAllCatalogItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllCatalogItemsRef:
```typescript
const name = listAllCatalogItemsRef.operationName;
console.log(name);
```

### Variables
The `ListAllCatalogItems` query has no variables.
### Return Type
Recall that executing the `ListAllCatalogItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllCatalogItemsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllCatalogItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllCatalogItems } from '@dataconnect/generated';


// Call the `listAllCatalogItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllCatalogItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllCatalogItems(dataConnect);

console.log(data.catalogItems);

// Or, you can use the `Promise` API.
listAllCatalogItems().then((response) => {
  const data = response.data;
  console.log(data.catalogItems);
});
```

### Using `ListAllCatalogItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllCatalogItemsRef } from '@dataconnect/generated';


// Call the `listAllCatalogItemsRef()` function to get a reference to the query.
const ref = listAllCatalogItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllCatalogItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.catalogItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogItems);
});
```

## ListCatalogItemsByCategory
You can execute the `ListCatalogItemsByCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCatalogItemsByCategory(vars: ListCatalogItemsByCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<ListCatalogItemsByCategoryData, ListCatalogItemsByCategoryVariables>;

interface ListCatalogItemsByCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCatalogItemsByCategoryVariables): QueryRef<ListCatalogItemsByCategoryData, ListCatalogItemsByCategoryVariables>;
}
export const listCatalogItemsByCategoryRef: ListCatalogItemsByCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCatalogItemsByCategory(dc: DataConnect, vars: ListCatalogItemsByCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<ListCatalogItemsByCategoryData, ListCatalogItemsByCategoryVariables>;

interface ListCatalogItemsByCategoryRef {
  ...
  (dc: DataConnect, vars: ListCatalogItemsByCategoryVariables): QueryRef<ListCatalogItemsByCategoryData, ListCatalogItemsByCategoryVariables>;
}
export const listCatalogItemsByCategoryRef: ListCatalogItemsByCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCatalogItemsByCategoryRef:
```typescript
const name = listCatalogItemsByCategoryRef.operationName;
console.log(name);
```

### Variables
The `ListCatalogItemsByCategory` query requires an argument of type `ListCatalogItemsByCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCatalogItemsByCategoryVariables {
  category: CatalogCategory;
}
```
### Return Type
Recall that executing the `ListCatalogItemsByCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCatalogItemsByCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListCatalogItemsByCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCatalogItemsByCategory, ListCatalogItemsByCategoryVariables } from '@dataconnect/generated';

// The `ListCatalogItemsByCategory` query requires an argument of type `ListCatalogItemsByCategoryVariables`:
const listCatalogItemsByCategoryVars: ListCatalogItemsByCategoryVariables = {
  category: ..., 
};

// Call the `listCatalogItemsByCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCatalogItemsByCategory(listCatalogItemsByCategoryVars);
// Variables can be defined inline as well.
const { data } = await listCatalogItemsByCategory({ category: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCatalogItemsByCategory(dataConnect, listCatalogItemsByCategoryVars);

console.log(data.catalogItems);

// Or, you can use the `Promise` API.
listCatalogItemsByCategory(listCatalogItemsByCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.catalogItems);
});
```

### Using `ListCatalogItemsByCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCatalogItemsByCategoryRef, ListCatalogItemsByCategoryVariables } from '@dataconnect/generated';

// The `ListCatalogItemsByCategory` query requires an argument of type `ListCatalogItemsByCategoryVariables`:
const listCatalogItemsByCategoryVars: ListCatalogItemsByCategoryVariables = {
  category: ..., 
};

// Call the `listCatalogItemsByCategoryRef()` function to get a reference to the query.
const ref = listCatalogItemsByCategoryRef(listCatalogItemsByCategoryVars);
// Variables can be defined inline as well.
const ref = listCatalogItemsByCategoryRef({ category: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCatalogItemsByCategoryRef(dataConnect, listCatalogItemsByCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.catalogItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogItems);
});
```

## GetCatalogItemById
You can execute the `GetCatalogItemById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCatalogItemById(vars: GetCatalogItemByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetCatalogItemByIdData, GetCatalogItemByIdVariables>;

interface GetCatalogItemByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCatalogItemByIdVariables): QueryRef<GetCatalogItemByIdData, GetCatalogItemByIdVariables>;
}
export const getCatalogItemByIdRef: GetCatalogItemByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCatalogItemById(dc: DataConnect, vars: GetCatalogItemByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetCatalogItemByIdData, GetCatalogItemByIdVariables>;

interface GetCatalogItemByIdRef {
  ...
  (dc: DataConnect, vars: GetCatalogItemByIdVariables): QueryRef<GetCatalogItemByIdData, GetCatalogItemByIdVariables>;
}
export const getCatalogItemByIdRef: GetCatalogItemByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCatalogItemByIdRef:
```typescript
const name = getCatalogItemByIdRef.operationName;
console.log(name);
```

### Variables
The `GetCatalogItemById` query requires an argument of type `GetCatalogItemByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCatalogItemByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetCatalogItemById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCatalogItemByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCatalogItemById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCatalogItemById, GetCatalogItemByIdVariables } from '@dataconnect/generated';

// The `GetCatalogItemById` query requires an argument of type `GetCatalogItemByIdVariables`:
const getCatalogItemByIdVars: GetCatalogItemByIdVariables = {
  id: ..., 
};

// Call the `getCatalogItemById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCatalogItemById(getCatalogItemByIdVars);
// Variables can be defined inline as well.
const { data } = await getCatalogItemById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCatalogItemById(dataConnect, getCatalogItemByIdVars);

console.log(data.catalogItem);

// Or, you can use the `Promise` API.
getCatalogItemById(getCatalogItemByIdVars).then((response) => {
  const data = response.data;
  console.log(data.catalogItem);
});
```

### Using `GetCatalogItemById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCatalogItemByIdRef, GetCatalogItemByIdVariables } from '@dataconnect/generated';

// The `GetCatalogItemById` query requires an argument of type `GetCatalogItemByIdVariables`:
const getCatalogItemByIdVars: GetCatalogItemByIdVariables = {
  id: ..., 
};

// Call the `getCatalogItemByIdRef()` function to get a reference to the query.
const ref = getCatalogItemByIdRef(getCatalogItemByIdVars);
// Variables can be defined inline as well.
const ref = getCatalogItemByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCatalogItemByIdRef(dataConnect, getCatalogItemByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.catalogItem);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogItem);
});
```

## ListAvailableCatalogItems
You can execute the `ListAvailableCatalogItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAvailableCatalogItems(options?: ExecuteQueryOptions): QueryPromise<ListAvailableCatalogItemsData, undefined>;

interface ListAvailableCatalogItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableCatalogItemsData, undefined>;
}
export const listAvailableCatalogItemsRef: ListAvailableCatalogItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAvailableCatalogItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAvailableCatalogItemsData, undefined>;

interface ListAvailableCatalogItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListAvailableCatalogItemsData, undefined>;
}
export const listAvailableCatalogItemsRef: ListAvailableCatalogItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAvailableCatalogItemsRef:
```typescript
const name = listAvailableCatalogItemsRef.operationName;
console.log(name);
```

### Variables
The `ListAvailableCatalogItems` query has no variables.
### Return Type
Recall that executing the `ListAvailableCatalogItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAvailableCatalogItemsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAvailableCatalogItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAvailableCatalogItems } from '@dataconnect/generated';


// Call the `listAvailableCatalogItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAvailableCatalogItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAvailableCatalogItems(dataConnect);

console.log(data.catalogItems);

// Or, you can use the `Promise` API.
listAvailableCatalogItems().then((response) => {
  const data = response.data;
  console.log(data.catalogItems);
});
```

### Using `ListAvailableCatalogItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAvailableCatalogItemsRef } from '@dataconnect/generated';


// Call the `listAvailableCatalogItemsRef()` function to get a reference to the query.
const ref = listAvailableCatalogItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAvailableCatalogItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.catalogItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogItems);
});
```

## ListVehicleImages
You can execute the `ListVehicleImages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVehicleImages(vars: ListVehicleImagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehicleImagesData, ListVehicleImagesVariables>;

interface ListVehicleImagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVehicleImagesVariables): QueryRef<ListVehicleImagesData, ListVehicleImagesVariables>;
}
export const listVehicleImagesRef: ListVehicleImagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVehicleImages(dc: DataConnect, vars: ListVehicleImagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListVehicleImagesData, ListVehicleImagesVariables>;

interface ListVehicleImagesRef {
  ...
  (dc: DataConnect, vars: ListVehicleImagesVariables): QueryRef<ListVehicleImagesData, ListVehicleImagesVariables>;
}
export const listVehicleImagesRef: ListVehicleImagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVehicleImagesRef:
```typescript
const name = listVehicleImagesRef.operationName;
console.log(name);
```

### Variables
The `ListVehicleImages` query requires an argument of type `ListVehicleImagesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListVehicleImagesVariables {
  vehicleId: UUIDString;
}
```
### Return Type
Recall that executing the `ListVehicleImages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVehicleImagesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListVehicleImagesData {
  vehicleImages: ({
    id: UUIDString;
    imageUrl: string;
    caption?: string | null;
    sortOrder: number;
    uploadedAt: TimestampString;
  } & VehicleImage_Key)[];
}
```
### Using `ListVehicleImages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVehicleImages, ListVehicleImagesVariables } from '@dataconnect/generated';

// The `ListVehicleImages` query requires an argument of type `ListVehicleImagesVariables`:
const listVehicleImagesVars: ListVehicleImagesVariables = {
  vehicleId: ..., 
};

// Call the `listVehicleImages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVehicleImages(listVehicleImagesVars);
// Variables can be defined inline as well.
const { data } = await listVehicleImages({ vehicleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVehicleImages(dataConnect, listVehicleImagesVars);

console.log(data.vehicleImages);

// Or, you can use the `Promise` API.
listVehicleImages(listVehicleImagesVars).then((response) => {
  const data = response.data;
  console.log(data.vehicleImages);
});
```

### Using `ListVehicleImages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVehicleImagesRef, ListVehicleImagesVariables } from '@dataconnect/generated';

// The `ListVehicleImages` query requires an argument of type `ListVehicleImagesVariables`:
const listVehicleImagesVars: ListVehicleImagesVariables = {
  vehicleId: ..., 
};

// Call the `listVehicleImagesRef()` function to get a reference to the query.
const ref = listVehicleImagesRef(listVehicleImagesVars);
// Variables can be defined inline as well.
const ref = listVehicleImagesRef({ vehicleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVehicleImagesRef(dataConnect, listVehicleImagesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vehicleImages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicleImages);
});
```

## ListCatalogImages
You can execute the `ListCatalogImages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCatalogImages(vars: ListCatalogImagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCatalogImagesData, ListCatalogImagesVariables>;

interface ListCatalogImagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCatalogImagesVariables): QueryRef<ListCatalogImagesData, ListCatalogImagesVariables>;
}
export const listCatalogImagesRef: ListCatalogImagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCatalogImages(dc: DataConnect, vars: ListCatalogImagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListCatalogImagesData, ListCatalogImagesVariables>;

interface ListCatalogImagesRef {
  ...
  (dc: DataConnect, vars: ListCatalogImagesVariables): QueryRef<ListCatalogImagesData, ListCatalogImagesVariables>;
}
export const listCatalogImagesRef: ListCatalogImagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCatalogImagesRef:
```typescript
const name = listCatalogImagesRef.operationName;
console.log(name);
```

### Variables
The `ListCatalogImages` query requires an argument of type `ListCatalogImagesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCatalogImagesVariables {
  catalogItemId: UUIDString;
}
```
### Return Type
Recall that executing the `ListCatalogImages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCatalogImagesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCatalogImagesData {
  catalogImages: ({
    id: UUIDString;
    imageUrl: string;
    caption?: string | null;
    sortOrder: number;
    uploadedAt: TimestampString;
  } & CatalogImage_Key)[];
}
```
### Using `ListCatalogImages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCatalogImages, ListCatalogImagesVariables } from '@dataconnect/generated';

// The `ListCatalogImages` query requires an argument of type `ListCatalogImagesVariables`:
const listCatalogImagesVars: ListCatalogImagesVariables = {
  catalogItemId: ..., 
};

// Call the `listCatalogImages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCatalogImages(listCatalogImagesVars);
// Variables can be defined inline as well.
const { data } = await listCatalogImages({ catalogItemId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCatalogImages(dataConnect, listCatalogImagesVars);

console.log(data.catalogImages);

// Or, you can use the `Promise` API.
listCatalogImages(listCatalogImagesVars).then((response) => {
  const data = response.data;
  console.log(data.catalogImages);
});
```

### Using `ListCatalogImages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCatalogImagesRef, ListCatalogImagesVariables } from '@dataconnect/generated';

// The `ListCatalogImages` query requires an argument of type `ListCatalogImagesVariables`:
const listCatalogImagesVars: ListCatalogImagesVariables = {
  catalogItemId: ..., 
};

// Call the `listCatalogImagesRef()` function to get a reference to the query.
const ref = listCatalogImagesRef(listCatalogImagesVars);
// Variables can be defined inline as well.
const ref = listCatalogImagesRef({ catalogItemId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCatalogImagesRef(dataConnect, listCatalogImagesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.catalogImages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogImages);
});
```

## ListAllWaitlistEntries
You can execute the `ListAllWaitlistEntries` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllWaitlistEntries(options?: ExecuteQueryOptions): QueryPromise<ListAllWaitlistEntriesData, undefined>;

interface ListAllWaitlistEntriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllWaitlistEntriesData, undefined>;
}
export const listAllWaitlistEntriesRef: ListAllWaitlistEntriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllWaitlistEntries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllWaitlistEntriesData, undefined>;

interface ListAllWaitlistEntriesRef {
  ...
  (dc: DataConnect): QueryRef<ListAllWaitlistEntriesData, undefined>;
}
export const listAllWaitlistEntriesRef: ListAllWaitlistEntriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllWaitlistEntriesRef:
```typescript
const name = listAllWaitlistEntriesRef.operationName;
console.log(name);
```

### Variables
The `ListAllWaitlistEntries` query has no variables.
### Return Type
Recall that executing the `ListAllWaitlistEntries` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllWaitlistEntriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllWaitlistEntries`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllWaitlistEntries } from '@dataconnect/generated';


// Call the `listAllWaitlistEntries()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllWaitlistEntries();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllWaitlistEntries(dataConnect);

console.log(data.waitlistEntries);

// Or, you can use the `Promise` API.
listAllWaitlistEntries().then((response) => {
  const data = response.data;
  console.log(data.waitlistEntries);
});
```

### Using `ListAllWaitlistEntries`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllWaitlistEntriesRef } from '@dataconnect/generated';


// Call the `listAllWaitlistEntriesRef()` function to get a reference to the query.
const ref = listAllWaitlistEntriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllWaitlistEntriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.waitlistEntries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntries);
});
```

## ListWaitlistByItem
You can execute the `ListWaitlistByItem` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listWaitlistByItem(vars: ListWaitlistByItemVariables, options?: ExecuteQueryOptions): QueryPromise<ListWaitlistByItemData, ListWaitlistByItemVariables>;

interface ListWaitlistByItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListWaitlistByItemVariables): QueryRef<ListWaitlistByItemData, ListWaitlistByItemVariables>;
}
export const listWaitlistByItemRef: ListWaitlistByItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listWaitlistByItem(dc: DataConnect, vars: ListWaitlistByItemVariables, options?: ExecuteQueryOptions): QueryPromise<ListWaitlistByItemData, ListWaitlistByItemVariables>;

interface ListWaitlistByItemRef {
  ...
  (dc: DataConnect, vars: ListWaitlistByItemVariables): QueryRef<ListWaitlistByItemData, ListWaitlistByItemVariables>;
}
export const listWaitlistByItemRef: ListWaitlistByItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listWaitlistByItemRef:
```typescript
const name = listWaitlistByItemRef.operationName;
console.log(name);
```

### Variables
The `ListWaitlistByItem` query requires an argument of type `ListWaitlistByItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListWaitlistByItemVariables {
  catalogItemId: UUIDString;
}
```
### Return Type
Recall that executing the `ListWaitlistByItem` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListWaitlistByItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListWaitlistByItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listWaitlistByItem, ListWaitlistByItemVariables } from '@dataconnect/generated';

// The `ListWaitlistByItem` query requires an argument of type `ListWaitlistByItemVariables`:
const listWaitlistByItemVars: ListWaitlistByItemVariables = {
  catalogItemId: ..., 
};

// Call the `listWaitlistByItem()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listWaitlistByItem(listWaitlistByItemVars);
// Variables can be defined inline as well.
const { data } = await listWaitlistByItem({ catalogItemId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listWaitlistByItem(dataConnect, listWaitlistByItemVars);

console.log(data.waitlistEntries);

// Or, you can use the `Promise` API.
listWaitlistByItem(listWaitlistByItemVars).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntries);
});
```

### Using `ListWaitlistByItem`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listWaitlistByItemRef, ListWaitlistByItemVariables } from '@dataconnect/generated';

// The `ListWaitlistByItem` query requires an argument of type `ListWaitlistByItemVariables`:
const listWaitlistByItemVars: ListWaitlistByItemVariables = {
  catalogItemId: ..., 
};

// Call the `listWaitlistByItemRef()` function to get a reference to the query.
const ref = listWaitlistByItemRef(listWaitlistByItemVars);
// Variables can be defined inline as well.
const ref = listWaitlistByItemRef({ catalogItemId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listWaitlistByItemRef(dataConnect, listWaitlistByItemVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.waitlistEntries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntries);
});
```

## ListWaitlistByStatus
You can execute the `ListWaitlistByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listWaitlistByStatus(vars: ListWaitlistByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListWaitlistByStatusData, ListWaitlistByStatusVariables>;

interface ListWaitlistByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListWaitlistByStatusVariables): QueryRef<ListWaitlistByStatusData, ListWaitlistByStatusVariables>;
}
export const listWaitlistByStatusRef: ListWaitlistByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listWaitlistByStatus(dc: DataConnect, vars: ListWaitlistByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListWaitlistByStatusData, ListWaitlistByStatusVariables>;

interface ListWaitlistByStatusRef {
  ...
  (dc: DataConnect, vars: ListWaitlistByStatusVariables): QueryRef<ListWaitlistByStatusData, ListWaitlistByStatusVariables>;
}
export const listWaitlistByStatusRef: ListWaitlistByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listWaitlistByStatusRef:
```typescript
const name = listWaitlistByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListWaitlistByStatus` query requires an argument of type `ListWaitlistByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListWaitlistByStatusVariables {
  status: WaitlistStatus;
}
```
### Return Type
Recall that executing the `ListWaitlistByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListWaitlistByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListWaitlistByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listWaitlistByStatus, ListWaitlistByStatusVariables } from '@dataconnect/generated';

// The `ListWaitlistByStatus` query requires an argument of type `ListWaitlistByStatusVariables`:
const listWaitlistByStatusVars: ListWaitlistByStatusVariables = {
  status: ..., 
};

// Call the `listWaitlistByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listWaitlistByStatus(listWaitlistByStatusVars);
// Variables can be defined inline as well.
const { data } = await listWaitlistByStatus({ status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listWaitlistByStatus(dataConnect, listWaitlistByStatusVars);

console.log(data.waitlistEntries);

// Or, you can use the `Promise` API.
listWaitlistByStatus(listWaitlistByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntries);
});
```

### Using `ListWaitlistByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listWaitlistByStatusRef, ListWaitlistByStatusVariables } from '@dataconnect/generated';

// The `ListWaitlistByStatus` query requires an argument of type `ListWaitlistByStatusVariables`:
const listWaitlistByStatusVars: ListWaitlistByStatusVariables = {
  status: ..., 
};

// Call the `listWaitlistByStatusRef()` function to get a reference to the query.
const ref = listWaitlistByStatusRef(listWaitlistByStatusVars);
// Variables can be defined inline as well.
const ref = listWaitlistByStatusRef({ status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listWaitlistByStatusRef(dataConnect, listWaitlistByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.waitlistEntries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntries);
});
```

## ListAllContactInquiries
You can execute the `ListAllContactInquiries` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllContactInquiries(options?: ExecuteQueryOptions): QueryPromise<ListAllContactInquiriesData, undefined>;

interface ListAllContactInquiriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllContactInquiriesData, undefined>;
}
export const listAllContactInquiriesRef: ListAllContactInquiriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllContactInquiries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllContactInquiriesData, undefined>;

interface ListAllContactInquiriesRef {
  ...
  (dc: DataConnect): QueryRef<ListAllContactInquiriesData, undefined>;
}
export const listAllContactInquiriesRef: ListAllContactInquiriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllContactInquiriesRef:
```typescript
const name = listAllContactInquiriesRef.operationName;
console.log(name);
```

### Variables
The `ListAllContactInquiries` query has no variables.
### Return Type
Recall that executing the `ListAllContactInquiries` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllContactInquiriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllContactInquiries`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllContactInquiries } from '@dataconnect/generated';


// Call the `listAllContactInquiries()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllContactInquiries();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllContactInquiries(dataConnect);

console.log(data.contactInquiries);

// Or, you can use the `Promise` API.
listAllContactInquiries().then((response) => {
  const data = response.data;
  console.log(data.contactInquiries);
});
```

### Using `ListAllContactInquiries`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllContactInquiriesRef } from '@dataconnect/generated';


// Call the `listAllContactInquiriesRef()` function to get a reference to the query.
const ref = listAllContactInquiriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllContactInquiriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.contactInquiries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.contactInquiries);
});
```

## GetContactInquiryById
You can execute the `GetContactInquiryById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getContactInquiryById(vars: GetContactInquiryByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetContactInquiryByIdData, GetContactInquiryByIdVariables>;

interface GetContactInquiryByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetContactInquiryByIdVariables): QueryRef<GetContactInquiryByIdData, GetContactInquiryByIdVariables>;
}
export const getContactInquiryByIdRef: GetContactInquiryByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getContactInquiryById(dc: DataConnect, vars: GetContactInquiryByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetContactInquiryByIdData, GetContactInquiryByIdVariables>;

interface GetContactInquiryByIdRef {
  ...
  (dc: DataConnect, vars: GetContactInquiryByIdVariables): QueryRef<GetContactInquiryByIdData, GetContactInquiryByIdVariables>;
}
export const getContactInquiryByIdRef: GetContactInquiryByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getContactInquiryByIdRef:
```typescript
const name = getContactInquiryByIdRef.operationName;
console.log(name);
```

### Variables
The `GetContactInquiryById` query requires an argument of type `GetContactInquiryByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetContactInquiryByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetContactInquiryById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetContactInquiryByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetContactInquiryById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getContactInquiryById, GetContactInquiryByIdVariables } from '@dataconnect/generated';

// The `GetContactInquiryById` query requires an argument of type `GetContactInquiryByIdVariables`:
const getContactInquiryByIdVars: GetContactInquiryByIdVariables = {
  id: ..., 
};

// Call the `getContactInquiryById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getContactInquiryById(getContactInquiryByIdVars);
// Variables can be defined inline as well.
const { data } = await getContactInquiryById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getContactInquiryById(dataConnect, getContactInquiryByIdVars);

console.log(data.contactInquiry);

// Or, you can use the `Promise` API.
getContactInquiryById(getContactInquiryByIdVars).then((response) => {
  const data = response.data;
  console.log(data.contactInquiry);
});
```

### Using `GetContactInquiryById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getContactInquiryByIdRef, GetContactInquiryByIdVariables } from '@dataconnect/generated';

// The `GetContactInquiryById` query requires an argument of type `GetContactInquiryByIdVariables`:
const getContactInquiryByIdVars: GetContactInquiryByIdVariables = {
  id: ..., 
};

// Call the `getContactInquiryByIdRef()` function to get a reference to the query.
const ref = getContactInquiryByIdRef(getContactInquiryByIdVars);
// Variables can be defined inline as well.
const ref = getContactInquiryByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getContactInquiryByIdRef(dataConnect, getContactInquiryByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.contactInquiry);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.contactInquiry);
});
```

## ListContactInquiriesByStatus
You can execute the `ListContactInquiriesByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listContactInquiriesByStatus(vars: ListContactInquiriesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListContactInquiriesByStatusData, ListContactInquiriesByStatusVariables>;

interface ListContactInquiriesByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListContactInquiriesByStatusVariables): QueryRef<ListContactInquiriesByStatusData, ListContactInquiriesByStatusVariables>;
}
export const listContactInquiriesByStatusRef: ListContactInquiriesByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listContactInquiriesByStatus(dc: DataConnect, vars: ListContactInquiriesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<ListContactInquiriesByStatusData, ListContactInquiriesByStatusVariables>;

interface ListContactInquiriesByStatusRef {
  ...
  (dc: DataConnect, vars: ListContactInquiriesByStatusVariables): QueryRef<ListContactInquiriesByStatusData, ListContactInquiriesByStatusVariables>;
}
export const listContactInquiriesByStatusRef: ListContactInquiriesByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listContactInquiriesByStatusRef:
```typescript
const name = listContactInquiriesByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListContactInquiriesByStatus` query requires an argument of type `ListContactInquiriesByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListContactInquiriesByStatusVariables {
  status: InquiryStatus;
}
```
### Return Type
Recall that executing the `ListContactInquiriesByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListContactInquiriesByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListContactInquiriesByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listContactInquiriesByStatus, ListContactInquiriesByStatusVariables } from '@dataconnect/generated';

// The `ListContactInquiriesByStatus` query requires an argument of type `ListContactInquiriesByStatusVariables`:
const listContactInquiriesByStatusVars: ListContactInquiriesByStatusVariables = {
  status: ..., 
};

// Call the `listContactInquiriesByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listContactInquiriesByStatus(listContactInquiriesByStatusVars);
// Variables can be defined inline as well.
const { data } = await listContactInquiriesByStatus({ status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listContactInquiriesByStatus(dataConnect, listContactInquiriesByStatusVars);

console.log(data.contactInquiries);

// Or, you can use the `Promise` API.
listContactInquiriesByStatus(listContactInquiriesByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.contactInquiries);
});
```

### Using `ListContactInquiriesByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listContactInquiriesByStatusRef, ListContactInquiriesByStatusVariables } from '@dataconnect/generated';

// The `ListContactInquiriesByStatus` query requires an argument of type `ListContactInquiriesByStatusVariables`:
const listContactInquiriesByStatusVars: ListContactInquiriesByStatusVariables = {
  status: ..., 
};

// Call the `listContactInquiriesByStatusRef()` function to get a reference to the query.
const ref = listContactInquiriesByStatusRef(listContactInquiriesByStatusVars);
// Variables can be defined inline as well.
const ref = listContactInquiriesByStatusRef({ status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listContactInquiriesByStatusRef(dataConnect, listContactInquiriesByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.contactInquiries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.contactInquiries);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `equipcore` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateOrganisation
You can execute the `CreateOrganisation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createOrganisation(vars: CreateOrganisationVariables): MutationPromise<CreateOrganisationData, CreateOrganisationVariables>;

interface CreateOrganisationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganisationVariables): MutationRef<CreateOrganisationData, CreateOrganisationVariables>;
}
export const createOrganisationRef: CreateOrganisationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrganisation(dc: DataConnect, vars: CreateOrganisationVariables): MutationPromise<CreateOrganisationData, CreateOrganisationVariables>;

interface CreateOrganisationRef {
  ...
  (dc: DataConnect, vars: CreateOrganisationVariables): MutationRef<CreateOrganisationData, CreateOrganisationVariables>;
}
export const createOrganisationRef: CreateOrganisationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrganisationRef:
```typescript
const name = createOrganisationRef.operationName;
console.log(name);
```

### Variables
The `CreateOrganisation` mutation requires an argument of type `CreateOrganisationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrganisationVariables {
  name: string;
  sector: string;
  regId: string;
  contactEmail: string;
  domain: string;
  logoUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateOrganisation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrganisationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrganisationData {
  organisation_insert: Organisation_Key;
}
```
### Using `CreateOrganisation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrganisation, CreateOrganisationVariables } from '@dataconnect/generated';

// The `CreateOrganisation` mutation requires an argument of type `CreateOrganisationVariables`:
const createOrganisationVars: CreateOrganisationVariables = {
  name: ..., 
  sector: ..., 
  regId: ..., 
  contactEmail: ..., 
  domain: ..., 
  logoUrl: ..., // optional
};

// Call the `createOrganisation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrganisation(createOrganisationVars);
// Variables can be defined inline as well.
const { data } = await createOrganisation({ name: ..., sector: ..., regId: ..., contactEmail: ..., domain: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrganisation(dataConnect, createOrganisationVars);

console.log(data.organisation_insert);

// Or, you can use the `Promise` API.
createOrganisation(createOrganisationVars).then((response) => {
  const data = response.data;
  console.log(data.organisation_insert);
});
```

### Using `CreateOrganisation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrganisationRef, CreateOrganisationVariables } from '@dataconnect/generated';

// The `CreateOrganisation` mutation requires an argument of type `CreateOrganisationVariables`:
const createOrganisationVars: CreateOrganisationVariables = {
  name: ..., 
  sector: ..., 
  regId: ..., 
  contactEmail: ..., 
  domain: ..., 
  logoUrl: ..., // optional
};

// Call the `createOrganisationRef()` function to get a reference to the mutation.
const ref = createOrganisationRef(createOrganisationVars);
// Variables can be defined inline as well.
const ref = createOrganisationRef({ name: ..., sector: ..., regId: ..., contactEmail: ..., domain: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrganisationRef(dataConnect, createOrganisationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organisation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organisation_insert);
});
```

## UpdateOrgStatus
You can execute the `UpdateOrgStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateOrgStatus(vars: UpdateOrgStatusVariables): MutationPromise<UpdateOrgStatusData, UpdateOrgStatusVariables>;

interface UpdateOrgStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrgStatusVariables): MutationRef<UpdateOrgStatusData, UpdateOrgStatusVariables>;
}
export const updateOrgStatusRef: UpdateOrgStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrgStatus(dc: DataConnect, vars: UpdateOrgStatusVariables): MutationPromise<UpdateOrgStatusData, UpdateOrgStatusVariables>;

interface UpdateOrgStatusRef {
  ...
  (dc: DataConnect, vars: UpdateOrgStatusVariables): MutationRef<UpdateOrgStatusData, UpdateOrgStatusVariables>;
}
export const updateOrgStatusRef: UpdateOrgStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrgStatusRef:
```typescript
const name = updateOrgStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrgStatus` mutation requires an argument of type `UpdateOrgStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrgStatusVariables {
  id: UUIDString;
  status: OrgStatus;
}
```
### Return Type
Recall that executing the `UpdateOrgStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrgStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrgStatusData {
  organisation_update?: Organisation_Key | null;
}
```
### Using `UpdateOrgStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrgStatus, UpdateOrgStatusVariables } from '@dataconnect/generated';

// The `UpdateOrgStatus` mutation requires an argument of type `UpdateOrgStatusVariables`:
const updateOrgStatusVars: UpdateOrgStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateOrgStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrgStatus(updateOrgStatusVars);
// Variables can be defined inline as well.
const { data } = await updateOrgStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrgStatus(dataConnect, updateOrgStatusVars);

console.log(data.organisation_update);

// Or, you can use the `Promise` API.
updateOrgStatus(updateOrgStatusVars).then((response) => {
  const data = response.data;
  console.log(data.organisation_update);
});
```

### Using `UpdateOrgStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrgStatusRef, UpdateOrgStatusVariables } from '@dataconnect/generated';

// The `UpdateOrgStatus` mutation requires an argument of type `UpdateOrgStatusVariables`:
const updateOrgStatusVars: UpdateOrgStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateOrgStatusRef()` function to get a reference to the mutation.
const ref = updateOrgStatusRef(updateOrgStatusVars);
// Variables can be defined inline as well.
const ref = updateOrgStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrgStatusRef(dataConnect, updateOrgStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organisation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organisation_update);
});
```

## UpdateOrganisation
You can execute the `UpdateOrganisation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateOrganisation(vars: UpdateOrganisationVariables): MutationPromise<UpdateOrganisationData, UpdateOrganisationVariables>;

interface UpdateOrganisationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganisationVariables): MutationRef<UpdateOrganisationData, UpdateOrganisationVariables>;
}
export const updateOrganisationRef: UpdateOrganisationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrganisation(dc: DataConnect, vars: UpdateOrganisationVariables): MutationPromise<UpdateOrganisationData, UpdateOrganisationVariables>;

interface UpdateOrganisationRef {
  ...
  (dc: DataConnect, vars: UpdateOrganisationVariables): MutationRef<UpdateOrganisationData, UpdateOrganisationVariables>;
}
export const updateOrganisationRef: UpdateOrganisationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrganisationRef:
```typescript
const name = updateOrganisationRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrganisation` mutation requires an argument of type `UpdateOrganisationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrganisationVariables {
  id: UUIDString;
  name?: string | null;
  sector?: string | null;
  contactEmail?: string | null;
  domain?: string | null;
  logoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateOrganisation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrganisationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrganisationData {
  organisation_update?: Organisation_Key | null;
}
```
### Using `UpdateOrganisation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrganisation, UpdateOrganisationVariables } from '@dataconnect/generated';

// The `UpdateOrganisation` mutation requires an argument of type `UpdateOrganisationVariables`:
const updateOrganisationVars: UpdateOrganisationVariables = {
  id: ..., 
  name: ..., // optional
  sector: ..., // optional
  contactEmail: ..., // optional
  domain: ..., // optional
  logoUrl: ..., // optional
};

// Call the `updateOrganisation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrganisation(updateOrganisationVars);
// Variables can be defined inline as well.
const { data } = await updateOrganisation({ id: ..., name: ..., sector: ..., contactEmail: ..., domain: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrganisation(dataConnect, updateOrganisationVars);

console.log(data.organisation_update);

// Or, you can use the `Promise` API.
updateOrganisation(updateOrganisationVars).then((response) => {
  const data = response.data;
  console.log(data.organisation_update);
});
```

### Using `UpdateOrganisation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrganisationRef, UpdateOrganisationVariables } from '@dataconnect/generated';

// The `UpdateOrganisation` mutation requires an argument of type `UpdateOrganisationVariables`:
const updateOrganisationVars: UpdateOrganisationVariables = {
  id: ..., 
  name: ..., // optional
  sector: ..., // optional
  contactEmail: ..., // optional
  domain: ..., // optional
  logoUrl: ..., // optional
};

// Call the `updateOrganisationRef()` function to get a reference to the mutation.
const ref = updateOrganisationRef(updateOrganisationVars);
// Variables can be defined inline as well.
const ref = updateOrganisationRef({ id: ..., name: ..., sector: ..., contactEmail: ..., domain: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrganisationRef(dataConnect, updateOrganisationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organisation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organisation_update);
});
```

## DeleteOrganisation
You can execute the `DeleteOrganisation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteOrganisation(vars: DeleteOrganisationVariables): MutationPromise<DeleteOrganisationData, DeleteOrganisationVariables>;

interface DeleteOrganisationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrganisationVariables): MutationRef<DeleteOrganisationData, DeleteOrganisationVariables>;
}
export const deleteOrganisationRef: DeleteOrganisationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteOrganisation(dc: DataConnect, vars: DeleteOrganisationVariables): MutationPromise<DeleteOrganisationData, DeleteOrganisationVariables>;

interface DeleteOrganisationRef {
  ...
  (dc: DataConnect, vars: DeleteOrganisationVariables): MutationRef<DeleteOrganisationData, DeleteOrganisationVariables>;
}
export const deleteOrganisationRef: DeleteOrganisationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteOrganisationRef:
```typescript
const name = deleteOrganisationRef.operationName;
console.log(name);
```

### Variables
The `DeleteOrganisation` mutation requires an argument of type `DeleteOrganisationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteOrganisationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteOrganisation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteOrganisationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteOrganisationData {
  organisation_delete?: Organisation_Key | null;
}
```
### Using `DeleteOrganisation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteOrganisation, DeleteOrganisationVariables } from '@dataconnect/generated';

// The `DeleteOrganisation` mutation requires an argument of type `DeleteOrganisationVariables`:
const deleteOrganisationVars: DeleteOrganisationVariables = {
  id: ..., 
};

// Call the `deleteOrganisation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteOrganisation(deleteOrganisationVars);
// Variables can be defined inline as well.
const { data } = await deleteOrganisation({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteOrganisation(dataConnect, deleteOrganisationVars);

console.log(data.organisation_delete);

// Or, you can use the `Promise` API.
deleteOrganisation(deleteOrganisationVars).then((response) => {
  const data = response.data;
  console.log(data.organisation_delete);
});
```

### Using `DeleteOrganisation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteOrganisationRef, DeleteOrganisationVariables } from '@dataconnect/generated';

// The `DeleteOrganisation` mutation requires an argument of type `DeleteOrganisationVariables`:
const deleteOrganisationVars: DeleteOrganisationVariables = {
  id: ..., 
};

// Call the `deleteOrganisationRef()` function to get a reference to the mutation.
const ref = deleteOrganisationRef(deleteOrganisationVars);
// Variables can be defined inline as well.
const ref = deleteOrganisationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteOrganisationRef(dataConnect, deleteOrganisationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organisation_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organisation_delete);
});
```

## CreateOrgRequest
You can execute the `CreateOrgRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createOrgRequest(vars: CreateOrgRequestVariables): MutationPromise<CreateOrgRequestData, CreateOrgRequestVariables>;

interface CreateOrgRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrgRequestVariables): MutationRef<CreateOrgRequestData, CreateOrgRequestVariables>;
}
export const createOrgRequestRef: CreateOrgRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrgRequest(dc: DataConnect, vars: CreateOrgRequestVariables): MutationPromise<CreateOrgRequestData, CreateOrgRequestVariables>;

interface CreateOrgRequestRef {
  ...
  (dc: DataConnect, vars: CreateOrgRequestVariables): MutationRef<CreateOrgRequestData, CreateOrgRequestVariables>;
}
export const createOrgRequestRef: CreateOrgRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrgRequestRef:
```typescript
const name = createOrgRequestRef.operationName;
console.log(name);
```

### Variables
The `CreateOrgRequest` mutation requires an argument of type `CreateOrgRequestVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrgRequestVariables {
  orgName: string;
  sector: string;
  regId: string;
  contactName: string;
  contactEmail: string;
  domain: string;
}
```
### Return Type
Recall that executing the `CreateOrgRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrgRequestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrgRequestData {
  orgRequest_insert: OrgRequest_Key;
}
```
### Using `CreateOrgRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrgRequest, CreateOrgRequestVariables } from '@dataconnect/generated';

// The `CreateOrgRequest` mutation requires an argument of type `CreateOrgRequestVariables`:
const createOrgRequestVars: CreateOrgRequestVariables = {
  orgName: ..., 
  sector: ..., 
  regId: ..., 
  contactName: ..., 
  contactEmail: ..., 
  domain: ..., 
};

// Call the `createOrgRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrgRequest(createOrgRequestVars);
// Variables can be defined inline as well.
const { data } = await createOrgRequest({ orgName: ..., sector: ..., regId: ..., contactName: ..., contactEmail: ..., domain: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrgRequest(dataConnect, createOrgRequestVars);

console.log(data.orgRequest_insert);

// Or, you can use the `Promise` API.
createOrgRequest(createOrgRequestVars).then((response) => {
  const data = response.data;
  console.log(data.orgRequest_insert);
});
```

### Using `CreateOrgRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrgRequestRef, CreateOrgRequestVariables } from '@dataconnect/generated';

// The `CreateOrgRequest` mutation requires an argument of type `CreateOrgRequestVariables`:
const createOrgRequestVars: CreateOrgRequestVariables = {
  orgName: ..., 
  sector: ..., 
  regId: ..., 
  contactName: ..., 
  contactEmail: ..., 
  domain: ..., 
};

// Call the `createOrgRequestRef()` function to get a reference to the mutation.
const ref = createOrgRequestRef(createOrgRequestVars);
// Variables can be defined inline as well.
const ref = createOrgRequestRef({ orgName: ..., sector: ..., regId: ..., contactName: ..., contactEmail: ..., domain: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrgRequestRef(dataConnect, createOrgRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orgRequest_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orgRequest_insert);
});
```

## ApproveOrgRequest
You can execute the `ApproveOrgRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
approveOrgRequest(vars: ApproveOrgRequestVariables): MutationPromise<ApproveOrgRequestData, ApproveOrgRequestVariables>;

interface ApproveOrgRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApproveOrgRequestVariables): MutationRef<ApproveOrgRequestData, ApproveOrgRequestVariables>;
}
export const approveOrgRequestRef: ApproveOrgRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
approveOrgRequest(dc: DataConnect, vars: ApproveOrgRequestVariables): MutationPromise<ApproveOrgRequestData, ApproveOrgRequestVariables>;

interface ApproveOrgRequestRef {
  ...
  (dc: DataConnect, vars: ApproveOrgRequestVariables): MutationRef<ApproveOrgRequestData, ApproveOrgRequestVariables>;
}
export const approveOrgRequestRef: ApproveOrgRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the approveOrgRequestRef:
```typescript
const name = approveOrgRequestRef.operationName;
console.log(name);
```

### Variables
The `ApproveOrgRequest` mutation requires an argument of type `ApproveOrgRequestVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ApproveOrgRequestVariables {
  id: UUIDString;
  resultingOrgId: UUIDString;
  adminNotes?: string | null;
}
```
### Return Type
Recall that executing the `ApproveOrgRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ApproveOrgRequestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ApproveOrgRequestData {
  orgRequest_update?: OrgRequest_Key | null;
}
```
### Using `ApproveOrgRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, approveOrgRequest, ApproveOrgRequestVariables } from '@dataconnect/generated';

// The `ApproveOrgRequest` mutation requires an argument of type `ApproveOrgRequestVariables`:
const approveOrgRequestVars: ApproveOrgRequestVariables = {
  id: ..., 
  resultingOrgId: ..., 
  adminNotes: ..., // optional
};

// Call the `approveOrgRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await approveOrgRequest(approveOrgRequestVars);
// Variables can be defined inline as well.
const { data } = await approveOrgRequest({ id: ..., resultingOrgId: ..., adminNotes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await approveOrgRequest(dataConnect, approveOrgRequestVars);

console.log(data.orgRequest_update);

// Or, you can use the `Promise` API.
approveOrgRequest(approveOrgRequestVars).then((response) => {
  const data = response.data;
  console.log(data.orgRequest_update);
});
```

### Using `ApproveOrgRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, approveOrgRequestRef, ApproveOrgRequestVariables } from '@dataconnect/generated';

// The `ApproveOrgRequest` mutation requires an argument of type `ApproveOrgRequestVariables`:
const approveOrgRequestVars: ApproveOrgRequestVariables = {
  id: ..., 
  resultingOrgId: ..., 
  adminNotes: ..., // optional
};

// Call the `approveOrgRequestRef()` function to get a reference to the mutation.
const ref = approveOrgRequestRef(approveOrgRequestVars);
// Variables can be defined inline as well.
const ref = approveOrgRequestRef({ id: ..., resultingOrgId: ..., adminNotes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = approveOrgRequestRef(dataConnect, approveOrgRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orgRequest_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orgRequest_update);
});
```

## RejectOrgRequest
You can execute the `RejectOrgRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
rejectOrgRequest(vars: RejectOrgRequestVariables): MutationPromise<RejectOrgRequestData, RejectOrgRequestVariables>;

interface RejectOrgRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RejectOrgRequestVariables): MutationRef<RejectOrgRequestData, RejectOrgRequestVariables>;
}
export const rejectOrgRequestRef: RejectOrgRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
rejectOrgRequest(dc: DataConnect, vars: RejectOrgRequestVariables): MutationPromise<RejectOrgRequestData, RejectOrgRequestVariables>;

interface RejectOrgRequestRef {
  ...
  (dc: DataConnect, vars: RejectOrgRequestVariables): MutationRef<RejectOrgRequestData, RejectOrgRequestVariables>;
}
export const rejectOrgRequestRef: RejectOrgRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the rejectOrgRequestRef:
```typescript
const name = rejectOrgRequestRef.operationName;
console.log(name);
```

### Variables
The `RejectOrgRequest` mutation requires an argument of type `RejectOrgRequestVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RejectOrgRequestVariables {
  id: UUIDString;
  adminNotes?: string | null;
}
```
### Return Type
Recall that executing the `RejectOrgRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RejectOrgRequestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RejectOrgRequestData {
  orgRequest_update?: OrgRequest_Key | null;
}
```
### Using `RejectOrgRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, rejectOrgRequest, RejectOrgRequestVariables } from '@dataconnect/generated';

// The `RejectOrgRequest` mutation requires an argument of type `RejectOrgRequestVariables`:
const rejectOrgRequestVars: RejectOrgRequestVariables = {
  id: ..., 
  adminNotes: ..., // optional
};

// Call the `rejectOrgRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await rejectOrgRequest(rejectOrgRequestVars);
// Variables can be defined inline as well.
const { data } = await rejectOrgRequest({ id: ..., adminNotes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await rejectOrgRequest(dataConnect, rejectOrgRequestVars);

console.log(data.orgRequest_update);

// Or, you can use the `Promise` API.
rejectOrgRequest(rejectOrgRequestVars).then((response) => {
  const data = response.data;
  console.log(data.orgRequest_update);
});
```

### Using `RejectOrgRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, rejectOrgRequestRef, RejectOrgRequestVariables } from '@dataconnect/generated';

// The `RejectOrgRequest` mutation requires an argument of type `RejectOrgRequestVariables`:
const rejectOrgRequestVars: RejectOrgRequestVariables = {
  id: ..., 
  adminNotes: ..., // optional
};

// Call the `rejectOrgRequestRef()` function to get a reference to the mutation.
const ref = rejectOrgRequestRef(rejectOrgRequestVars);
// Variables can be defined inline as well.
const ref = rejectOrgRequestRef({ id: ..., adminNotes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = rejectOrgRequestRef(dataConnect, rejectOrgRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orgRequest_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orgRequest_update);
});
```

## DeleteOrgRequest
You can execute the `DeleteOrgRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteOrgRequest(vars: DeleteOrgRequestVariables): MutationPromise<DeleteOrgRequestData, DeleteOrgRequestVariables>;

interface DeleteOrgRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrgRequestVariables): MutationRef<DeleteOrgRequestData, DeleteOrgRequestVariables>;
}
export const deleteOrgRequestRef: DeleteOrgRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteOrgRequest(dc: DataConnect, vars: DeleteOrgRequestVariables): MutationPromise<DeleteOrgRequestData, DeleteOrgRequestVariables>;

interface DeleteOrgRequestRef {
  ...
  (dc: DataConnect, vars: DeleteOrgRequestVariables): MutationRef<DeleteOrgRequestData, DeleteOrgRequestVariables>;
}
export const deleteOrgRequestRef: DeleteOrgRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteOrgRequestRef:
```typescript
const name = deleteOrgRequestRef.operationName;
console.log(name);
```

### Variables
The `DeleteOrgRequest` mutation requires an argument of type `DeleteOrgRequestVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteOrgRequestVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteOrgRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteOrgRequestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteOrgRequestData {
  orgRequest_delete?: OrgRequest_Key | null;
}
```
### Using `DeleteOrgRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteOrgRequest, DeleteOrgRequestVariables } from '@dataconnect/generated';

// The `DeleteOrgRequest` mutation requires an argument of type `DeleteOrgRequestVariables`:
const deleteOrgRequestVars: DeleteOrgRequestVariables = {
  id: ..., 
};

// Call the `deleteOrgRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteOrgRequest(deleteOrgRequestVars);
// Variables can be defined inline as well.
const { data } = await deleteOrgRequest({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteOrgRequest(dataConnect, deleteOrgRequestVars);

console.log(data.orgRequest_delete);

// Or, you can use the `Promise` API.
deleteOrgRequest(deleteOrgRequestVars).then((response) => {
  const data = response.data;
  console.log(data.orgRequest_delete);
});
```

### Using `DeleteOrgRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteOrgRequestRef, DeleteOrgRequestVariables } from '@dataconnect/generated';

// The `DeleteOrgRequest` mutation requires an argument of type `DeleteOrgRequestVariables`:
const deleteOrgRequestVars: DeleteOrgRequestVariables = {
  id: ..., 
};

// Call the `deleteOrgRequestRef()` function to get a reference to the mutation.
const ref = deleteOrgRequestRef(deleteOrgRequestVars);
// Variables can be defined inline as well.
const ref = deleteOrgRequestRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteOrgRequestRef(dataConnect, deleteOrgRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orgRequest_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orgRequest_delete);
});
```

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  name: string;
  email: string;
  role: UserRole;
  organisationId?: UUIDString | null;
  avatarUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  name: ..., 
  email: ..., 
  role: ..., 
  organisationId: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ name: ..., email: ..., role: ..., organisationId: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  name: ..., 
  email: ..., 
  role: ..., 
  organisationId: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ name: ..., email: ..., role: ..., organisationId: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUserStatus
You can execute the `UpdateUserStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserStatus(vars: UpdateUserStatusVariables): MutationPromise<UpdateUserStatusData, UpdateUserStatusVariables>;

interface UpdateUserStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserStatusVariables): MutationRef<UpdateUserStatusData, UpdateUserStatusVariables>;
}
export const updateUserStatusRef: UpdateUserStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserStatus(dc: DataConnect, vars: UpdateUserStatusVariables): MutationPromise<UpdateUserStatusData, UpdateUserStatusVariables>;

interface UpdateUserStatusRef {
  ...
  (dc: DataConnect, vars: UpdateUserStatusVariables): MutationRef<UpdateUserStatusData, UpdateUserStatusVariables>;
}
export const updateUserStatusRef: UpdateUserStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserStatusRef:
```typescript
const name = updateUserStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserStatus` mutation requires an argument of type `UpdateUserStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserStatusVariables {
  id: UUIDString;
  status: UserStatus;
}
```
### Return Type
Recall that executing the `UpdateUserStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserStatusData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserStatus, UpdateUserStatusVariables } from '@dataconnect/generated';

// The `UpdateUserStatus` mutation requires an argument of type `UpdateUserStatusVariables`:
const updateUserStatusVars: UpdateUserStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateUserStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserStatus(updateUserStatusVars);
// Variables can be defined inline as well.
const { data } = await updateUserStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserStatus(dataConnect, updateUserStatusVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserStatus(updateUserStatusVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserStatusRef, UpdateUserStatusVariables } from '@dataconnect/generated';

// The `UpdateUserStatus` mutation requires an argument of type `UpdateUserStatusVariables`:
const updateUserStatusVars: UpdateUserStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateUserStatusRef()` function to get a reference to the mutation.
const ref = updateUserStatusRef(updateUserStatusVars);
// Variables can be defined inline as well.
const ref = updateUserStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserStatusRef(dataConnect, updateUserStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## UpdateUserRole
You can execute the `UpdateUserRole` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface UpdateUserRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
}
export const updateUserRoleRef: UpdateUserRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface UpdateUserRoleRef {
  ...
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
}
export const updateUserRoleRef: UpdateUserRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRoleRef:
```typescript
const name = updateUserRoleRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserRole` mutation requires an argument of type `UpdateUserRoleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserRoleVariables {
  id: UUIDString;
  role: UserRole;
}
```
### Return Type
Recall that executing the `UpdateUserRole` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserRoleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserRoleData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserRole, UpdateUserRoleVariables } from '@dataconnect/generated';

// The `UpdateUserRole` mutation requires an argument of type `UpdateUserRoleVariables`:
const updateUserRoleVars: UpdateUserRoleVariables = {
  id: ..., 
  role: ..., 
};

// Call the `updateUserRole()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserRole(updateUserRoleVars);
// Variables can be defined inline as well.
const { data } = await updateUserRole({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserRole(dataConnect, updateUserRoleVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserRole(updateUserRoleVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserRole`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRoleRef, UpdateUserRoleVariables } from '@dataconnect/generated';

// The `UpdateUserRole` mutation requires an argument of type `UpdateUserRoleVariables`:
const updateUserRoleVars: UpdateUserRoleVariables = {
  id: ..., 
  role: ..., 
};

// Call the `updateUserRoleRef()` function to get a reference to the mutation.
const ref = updateUserRoleRef(updateUserRoleVars);
// Variables can be defined inline as well.
const ref = updateUserRoleRef({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRoleRef(dataConnect, updateUserRoleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## UpdateUserProfile
You can execute the `UpdateUserProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserProfile(vars: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

interface UpdateUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
}
export const updateUserProfileRef: UpdateUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserProfile(dc: DataConnect, vars: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

interface UpdateUserProfileRef {
  ...
  (dc: DataConnect, vars: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
}
export const updateUserProfileRef: UpdateUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserProfileRef:
```typescript
const name = updateUserProfileRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserProfile` mutation requires an argument of type `UpdateUserProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserProfileVariables {
  id: UUIDString;
  name?: string | null;
  bio?: string | null;
  position?: string | null;
  department?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUserProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserProfileData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserProfile, UpdateUserProfileVariables } from '@dataconnect/generated';

// The `UpdateUserProfile` mutation requires an argument of type `UpdateUserProfileVariables`:
const updateUserProfileVars: UpdateUserProfileVariables = {
  id: ..., 
  name: ..., // optional
  bio: ..., // optional
  position: ..., // optional
  department: ..., // optional
  phone: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `updateUserProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserProfile(updateUserProfileVars);
// Variables can be defined inline as well.
const { data } = await updateUserProfile({ id: ..., name: ..., bio: ..., position: ..., department: ..., phone: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserProfile(dataConnect, updateUserProfileVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserProfile(updateUserProfileVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserProfileRef, UpdateUserProfileVariables } from '@dataconnect/generated';

// The `UpdateUserProfile` mutation requires an argument of type `UpdateUserProfileVariables`:
const updateUserProfileVars: UpdateUserProfileVariables = {
  id: ..., 
  name: ..., // optional
  bio: ..., // optional
  position: ..., // optional
  department: ..., // optional
  phone: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `updateUserProfileRef()` function to get a reference to the mutation.
const ref = updateUserProfileRef(updateUserProfileVars);
// Variables can be defined inline as well.
const ref = updateUserProfileRef({ id: ..., name: ..., bio: ..., position: ..., department: ..., phone: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserProfileRef(dataConnect, updateUserProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## UpdateUserAvatar
You can execute the `UpdateUserAvatar` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserAvatar(vars: UpdateUserAvatarVariables): MutationPromise<UpdateUserAvatarData, UpdateUserAvatarVariables>;

interface UpdateUserAvatarRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserAvatarVariables): MutationRef<UpdateUserAvatarData, UpdateUserAvatarVariables>;
}
export const updateUserAvatarRef: UpdateUserAvatarRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserAvatar(dc: DataConnect, vars: UpdateUserAvatarVariables): MutationPromise<UpdateUserAvatarData, UpdateUserAvatarVariables>;

interface UpdateUserAvatarRef {
  ...
  (dc: DataConnect, vars: UpdateUserAvatarVariables): MutationRef<UpdateUserAvatarData, UpdateUserAvatarVariables>;
}
export const updateUserAvatarRef: UpdateUserAvatarRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserAvatarRef:
```typescript
const name = updateUserAvatarRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserAvatar` mutation requires an argument of type `UpdateUserAvatarVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserAvatarVariables {
  id: UUIDString;
  avatarUrl: string;
}
```
### Return Type
Recall that executing the `UpdateUserAvatar` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserAvatarData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserAvatarData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserAvatar`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserAvatar, UpdateUserAvatarVariables } from '@dataconnect/generated';

// The `UpdateUserAvatar` mutation requires an argument of type `UpdateUserAvatarVariables`:
const updateUserAvatarVars: UpdateUserAvatarVariables = {
  id: ..., 
  avatarUrl: ..., 
};

// Call the `updateUserAvatar()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserAvatar(updateUserAvatarVars);
// Variables can be defined inline as well.
const { data } = await updateUserAvatar({ id: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserAvatar(dataConnect, updateUserAvatarVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserAvatar(updateUserAvatarVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserAvatar`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserAvatarRef, UpdateUserAvatarVariables } from '@dataconnect/generated';

// The `UpdateUserAvatar` mutation requires an argument of type `UpdateUserAvatarVariables`:
const updateUserAvatarVars: UpdateUserAvatarVariables = {
  id: ..., 
  avatarUrl: ..., 
};

// Call the `updateUserAvatarRef()` function to get a reference to the mutation.
const ref = updateUserAvatarRef(updateUserAvatarVars);
// Variables can be defined inline as well.
const ref = updateUserAvatarRef({ id: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserAvatarRef(dataConnect, updateUserAvatarVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## RecordUserLogin
You can execute the `RecordUserLogin` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recordUserLogin(vars: RecordUserLoginVariables): MutationPromise<RecordUserLoginData, RecordUserLoginVariables>;

interface RecordUserLoginRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordUserLoginVariables): MutationRef<RecordUserLoginData, RecordUserLoginVariables>;
}
export const recordUserLoginRef: RecordUserLoginRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordUserLogin(dc: DataConnect, vars: RecordUserLoginVariables): MutationPromise<RecordUserLoginData, RecordUserLoginVariables>;

interface RecordUserLoginRef {
  ...
  (dc: DataConnect, vars: RecordUserLoginVariables): MutationRef<RecordUserLoginData, RecordUserLoginVariables>;
}
export const recordUserLoginRef: RecordUserLoginRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordUserLoginRef:
```typescript
const name = recordUserLoginRef.operationName;
console.log(name);
```

### Variables
The `RecordUserLogin` mutation requires an argument of type `RecordUserLoginVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordUserLoginVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `RecordUserLogin` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordUserLoginData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordUserLoginData {
  user_update?: User_Key | null;
}
```
### Using `RecordUserLogin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordUserLogin, RecordUserLoginVariables } from '@dataconnect/generated';

// The `RecordUserLogin` mutation requires an argument of type `RecordUserLoginVariables`:
const recordUserLoginVars: RecordUserLoginVariables = {
  id: ..., 
};

// Call the `recordUserLogin()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordUserLogin(recordUserLoginVars);
// Variables can be defined inline as well.
const { data } = await recordUserLogin({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordUserLogin(dataConnect, recordUserLoginVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
recordUserLogin(recordUserLoginVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `RecordUserLogin`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordUserLoginRef, RecordUserLoginVariables } from '@dataconnect/generated';

// The `RecordUserLogin` mutation requires an argument of type `RecordUserLoginVariables`:
const recordUserLoginVars: RecordUserLoginVariables = {
  id: ..., 
};

// Call the `recordUserLoginRef()` function to get a reference to the mutation.
const ref = recordUserLoginRef(recordUserLoginVars);
// Variables can be defined inline as well.
const ref = recordUserLoginRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordUserLoginRef(dataConnect, recordUserLoginVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## RecordFailedLogin
You can execute the `RecordFailedLogin` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recordFailedLogin(vars: RecordFailedLoginVariables): MutationPromise<RecordFailedLoginData, RecordFailedLoginVariables>;

interface RecordFailedLoginRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordFailedLoginVariables): MutationRef<RecordFailedLoginData, RecordFailedLoginVariables>;
}
export const recordFailedLoginRef: RecordFailedLoginRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordFailedLogin(dc: DataConnect, vars: RecordFailedLoginVariables): MutationPromise<RecordFailedLoginData, RecordFailedLoginVariables>;

interface RecordFailedLoginRef {
  ...
  (dc: DataConnect, vars: RecordFailedLoginVariables): MutationRef<RecordFailedLoginData, RecordFailedLoginVariables>;
}
export const recordFailedLoginRef: RecordFailedLoginRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordFailedLoginRef:
```typescript
const name = recordFailedLoginRef.operationName;
console.log(name);
```

### Variables
The `RecordFailedLogin` mutation requires an argument of type `RecordFailedLoginVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordFailedLoginVariables {
  id: UUIDString;
  failedAttempts: number;
  lockedUntil?: TimestampString | null;
}
```
### Return Type
Recall that executing the `RecordFailedLogin` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordFailedLoginData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordFailedLoginData {
  user_update?: User_Key | null;
}
```
### Using `RecordFailedLogin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordFailedLogin, RecordFailedLoginVariables } from '@dataconnect/generated';

// The `RecordFailedLogin` mutation requires an argument of type `RecordFailedLoginVariables`:
const recordFailedLoginVars: RecordFailedLoginVariables = {
  id: ..., 
  failedAttempts: ..., 
  lockedUntil: ..., // optional
};

// Call the `recordFailedLogin()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordFailedLogin(recordFailedLoginVars);
// Variables can be defined inline as well.
const { data } = await recordFailedLogin({ id: ..., failedAttempts: ..., lockedUntil: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordFailedLogin(dataConnect, recordFailedLoginVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
recordFailedLogin(recordFailedLoginVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `RecordFailedLogin`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordFailedLoginRef, RecordFailedLoginVariables } from '@dataconnect/generated';

// The `RecordFailedLogin` mutation requires an argument of type `RecordFailedLoginVariables`:
const recordFailedLoginVars: RecordFailedLoginVariables = {
  id: ..., 
  failedAttempts: ..., 
  lockedUntil: ..., // optional
};

// Call the `recordFailedLoginRef()` function to get a reference to the mutation.
const ref = recordFailedLoginRef(recordFailedLoginVars);
// Variables can be defined inline as well.
const ref = recordFailedLoginRef({ id: ..., failedAttempts: ..., lockedUntil: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordFailedLoginRef(dataConnect, recordFailedLoginVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect, vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface DeleteUserRef {
  ...
  (dc: DataConnect, vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation requires an argument of type `DeleteUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser, DeleteUserVariables } from '@dataconnect/generated';

// The `DeleteUser` mutation requires an argument of type `DeleteUserVariables`:
const deleteUserVars: DeleteUserVariables = {
  id: ..., 
};

// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser(deleteUserVars);
// Variables can be defined inline as well.
const { data } = await deleteUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect, deleteUserVars);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser(deleteUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef, DeleteUserVariables } from '@dataconnect/generated';

// The `DeleteUser` mutation requires an argument of type `DeleteUserVariables`:
const deleteUserVars: DeleteUserVariables = {
  id: ..., 
};

// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef(deleteUserVars);
// Variables can be defined inline as well.
const ref = deleteUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect, deleteUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateVehicle
You can execute the `CreateVehicle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createVehicle(vars: CreateVehicleVariables): MutationPromise<CreateVehicleData, CreateVehicleVariables>;

interface CreateVehicleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateVehicleVariables): MutationRef<CreateVehicleData, CreateVehicleVariables>;
}
export const createVehicleRef: CreateVehicleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createVehicle(dc: DataConnect, vars: CreateVehicleVariables): MutationPromise<CreateVehicleData, CreateVehicleVariables>;

interface CreateVehicleRef {
  ...
  (dc: DataConnect, vars: CreateVehicleVariables): MutationRef<CreateVehicleData, CreateVehicleVariables>;
}
export const createVehicleRef: CreateVehicleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createVehicleRef:
```typescript
const name = createVehicleRef.operationName;
console.log(name);
```

### Variables
The `CreateVehicle` mutation requires an argument of type `CreateVehicleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateVehicle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateVehicleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateVehicleData {
  vehicle_insert: Vehicle_Key;
}
```
### Using `CreateVehicle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createVehicle, CreateVehicleVariables } from '@dataconnect/generated';

// The `CreateVehicle` mutation requires an argument of type `CreateVehicleVariables`:
const createVehicleVars: CreateVehicleVariables = {
  make: ..., 
  model: ..., 
  year: ..., 
  type: ..., 
  regPlate: ..., 
  description: ..., // optional
  km: ..., 
  serviceIntervalKm: ..., 
  nextServiceKm: ..., 
  imageUrl: ..., // optional
  organisationId: ..., // optional
};

// Call the `createVehicle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createVehicle(createVehicleVars);
// Variables can be defined inline as well.
const { data } = await createVehicle({ make: ..., model: ..., year: ..., type: ..., regPlate: ..., description: ..., km: ..., serviceIntervalKm: ..., nextServiceKm: ..., imageUrl: ..., organisationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createVehicle(dataConnect, createVehicleVars);

console.log(data.vehicle_insert);

// Or, you can use the `Promise` API.
createVehicle(createVehicleVars).then((response) => {
  const data = response.data;
  console.log(data.vehicle_insert);
});
```

### Using `CreateVehicle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createVehicleRef, CreateVehicleVariables } from '@dataconnect/generated';

// The `CreateVehicle` mutation requires an argument of type `CreateVehicleVariables`:
const createVehicleVars: CreateVehicleVariables = {
  make: ..., 
  model: ..., 
  year: ..., 
  type: ..., 
  regPlate: ..., 
  description: ..., // optional
  km: ..., 
  serviceIntervalKm: ..., 
  nextServiceKm: ..., 
  imageUrl: ..., // optional
  organisationId: ..., // optional
};

// Call the `createVehicleRef()` function to get a reference to the mutation.
const ref = createVehicleRef(createVehicleVars);
// Variables can be defined inline as well.
const ref = createVehicleRef({ make: ..., model: ..., year: ..., type: ..., regPlate: ..., description: ..., km: ..., serviceIntervalKm: ..., nextServiceKm: ..., imageUrl: ..., organisationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createVehicleRef(dataConnect, createVehicleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicle_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicle_insert);
});
```

## UpdateVehicleStatus
You can execute the `UpdateVehicleStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVehicleStatus(vars: UpdateVehicleStatusVariables): MutationPromise<UpdateVehicleStatusData, UpdateVehicleStatusVariables>;

interface UpdateVehicleStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleStatusVariables): MutationRef<UpdateVehicleStatusData, UpdateVehicleStatusVariables>;
}
export const updateVehicleStatusRef: UpdateVehicleStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVehicleStatus(dc: DataConnect, vars: UpdateVehicleStatusVariables): MutationPromise<UpdateVehicleStatusData, UpdateVehicleStatusVariables>;

interface UpdateVehicleStatusRef {
  ...
  (dc: DataConnect, vars: UpdateVehicleStatusVariables): MutationRef<UpdateVehicleStatusData, UpdateVehicleStatusVariables>;
}
export const updateVehicleStatusRef: UpdateVehicleStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVehicleStatusRef:
```typescript
const name = updateVehicleStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateVehicleStatus` mutation requires an argument of type `UpdateVehicleStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateVehicleStatusVariables {
  id: UUIDString;
  status: VehicleStatus;
}
```
### Return Type
Recall that executing the `UpdateVehicleStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVehicleStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVehicleStatusData {
  vehicle_update?: Vehicle_Key | null;
}
```
### Using `UpdateVehicleStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVehicleStatus, UpdateVehicleStatusVariables } from '@dataconnect/generated';

// The `UpdateVehicleStatus` mutation requires an argument of type `UpdateVehicleStatusVariables`:
const updateVehicleStatusVars: UpdateVehicleStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateVehicleStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVehicleStatus(updateVehicleStatusVars);
// Variables can be defined inline as well.
const { data } = await updateVehicleStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVehicleStatus(dataConnect, updateVehicleStatusVars);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
updateVehicleStatus(updateVehicleStatusVars).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

### Using `UpdateVehicleStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVehicleStatusRef, UpdateVehicleStatusVariables } from '@dataconnect/generated';

// The `UpdateVehicleStatus` mutation requires an argument of type `UpdateVehicleStatusVariables`:
const updateVehicleStatusVars: UpdateVehicleStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateVehicleStatusRef()` function to get a reference to the mutation.
const ref = updateVehicleStatusRef(updateVehicleStatusVars);
// Variables can be defined inline as well.
const ref = updateVehicleStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVehicleStatusRef(dataConnect, updateVehicleStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

## UpdateVehicleKm
You can execute the `UpdateVehicleKm` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVehicleKm(vars: UpdateVehicleKmVariables): MutationPromise<UpdateVehicleKmData, UpdateVehicleKmVariables>;

interface UpdateVehicleKmRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleKmVariables): MutationRef<UpdateVehicleKmData, UpdateVehicleKmVariables>;
}
export const updateVehicleKmRef: UpdateVehicleKmRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVehicleKm(dc: DataConnect, vars: UpdateVehicleKmVariables): MutationPromise<UpdateVehicleKmData, UpdateVehicleKmVariables>;

interface UpdateVehicleKmRef {
  ...
  (dc: DataConnect, vars: UpdateVehicleKmVariables): MutationRef<UpdateVehicleKmData, UpdateVehicleKmVariables>;
}
export const updateVehicleKmRef: UpdateVehicleKmRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVehicleKmRef:
```typescript
const name = updateVehicleKmRef.operationName;
console.log(name);
```

### Variables
The `UpdateVehicleKm` mutation requires an argument of type `UpdateVehicleKmVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateVehicleKmVariables {
  id: UUIDString;
  km: number;
}
```
### Return Type
Recall that executing the `UpdateVehicleKm` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVehicleKmData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVehicleKmData {
  vehicle_update?: Vehicle_Key | null;
}
```
### Using `UpdateVehicleKm`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVehicleKm, UpdateVehicleKmVariables } from '@dataconnect/generated';

// The `UpdateVehicleKm` mutation requires an argument of type `UpdateVehicleKmVariables`:
const updateVehicleKmVars: UpdateVehicleKmVariables = {
  id: ..., 
  km: ..., 
};

// Call the `updateVehicleKm()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVehicleKm(updateVehicleKmVars);
// Variables can be defined inline as well.
const { data } = await updateVehicleKm({ id: ..., km: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVehicleKm(dataConnect, updateVehicleKmVars);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
updateVehicleKm(updateVehicleKmVars).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

### Using `UpdateVehicleKm`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVehicleKmRef, UpdateVehicleKmVariables } from '@dataconnect/generated';

// The `UpdateVehicleKm` mutation requires an argument of type `UpdateVehicleKmVariables`:
const updateVehicleKmVars: UpdateVehicleKmVariables = {
  id: ..., 
  km: ..., 
};

// Call the `updateVehicleKmRef()` function to get a reference to the mutation.
const ref = updateVehicleKmRef(updateVehicleKmVars);
// Variables can be defined inline as well.
const ref = updateVehicleKmRef({ id: ..., km: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVehicleKmRef(dataConnect, updateVehicleKmVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

## UpdateVehicleService
You can execute the `UpdateVehicleService` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVehicleService(vars: UpdateVehicleServiceVariables): MutationPromise<UpdateVehicleServiceData, UpdateVehicleServiceVariables>;

interface UpdateVehicleServiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleServiceVariables): MutationRef<UpdateVehicleServiceData, UpdateVehicleServiceVariables>;
}
export const updateVehicleServiceRef: UpdateVehicleServiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVehicleService(dc: DataConnect, vars: UpdateVehicleServiceVariables): MutationPromise<UpdateVehicleServiceData, UpdateVehicleServiceVariables>;

interface UpdateVehicleServiceRef {
  ...
  (dc: DataConnect, vars: UpdateVehicleServiceVariables): MutationRef<UpdateVehicleServiceData, UpdateVehicleServiceVariables>;
}
export const updateVehicleServiceRef: UpdateVehicleServiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVehicleServiceRef:
```typescript
const name = updateVehicleServiceRef.operationName;
console.log(name);
```

### Variables
The `UpdateVehicleService` mutation requires an argument of type `UpdateVehicleServiceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateVehicleServiceVariables {
  id: UUIDString;
  nextServiceKm: number;
  serviceIntervalKm: number;
}
```
### Return Type
Recall that executing the `UpdateVehicleService` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVehicleServiceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVehicleServiceData {
  vehicle_update?: Vehicle_Key | null;
}
```
### Using `UpdateVehicleService`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVehicleService, UpdateVehicleServiceVariables } from '@dataconnect/generated';

// The `UpdateVehicleService` mutation requires an argument of type `UpdateVehicleServiceVariables`:
const updateVehicleServiceVars: UpdateVehicleServiceVariables = {
  id: ..., 
  nextServiceKm: ..., 
  serviceIntervalKm: ..., 
};

// Call the `updateVehicleService()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVehicleService(updateVehicleServiceVars);
// Variables can be defined inline as well.
const { data } = await updateVehicleService({ id: ..., nextServiceKm: ..., serviceIntervalKm: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVehicleService(dataConnect, updateVehicleServiceVars);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
updateVehicleService(updateVehicleServiceVars).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

### Using `UpdateVehicleService`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVehicleServiceRef, UpdateVehicleServiceVariables } from '@dataconnect/generated';

// The `UpdateVehicleService` mutation requires an argument of type `UpdateVehicleServiceVariables`:
const updateVehicleServiceVars: UpdateVehicleServiceVariables = {
  id: ..., 
  nextServiceKm: ..., 
  serviceIntervalKm: ..., 
};

// Call the `updateVehicleServiceRef()` function to get a reference to the mutation.
const ref = updateVehicleServiceRef(updateVehicleServiceVars);
// Variables can be defined inline as well.
const ref = updateVehicleServiceRef({ id: ..., nextServiceKm: ..., serviceIntervalKm: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVehicleServiceRef(dataConnect, updateVehicleServiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

## UpdateVehicleOrg
You can execute the `UpdateVehicleOrg` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVehicleOrg(vars: UpdateVehicleOrgVariables): MutationPromise<UpdateVehicleOrgData, UpdateVehicleOrgVariables>;

interface UpdateVehicleOrgRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleOrgVariables): MutationRef<UpdateVehicleOrgData, UpdateVehicleOrgVariables>;
}
export const updateVehicleOrgRef: UpdateVehicleOrgRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVehicleOrg(dc: DataConnect, vars: UpdateVehicleOrgVariables): MutationPromise<UpdateVehicleOrgData, UpdateVehicleOrgVariables>;

interface UpdateVehicleOrgRef {
  ...
  (dc: DataConnect, vars: UpdateVehicleOrgVariables): MutationRef<UpdateVehicleOrgData, UpdateVehicleOrgVariables>;
}
export const updateVehicleOrgRef: UpdateVehicleOrgRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVehicleOrgRef:
```typescript
const name = updateVehicleOrgRef.operationName;
console.log(name);
```

### Variables
The `UpdateVehicleOrg` mutation requires an argument of type `UpdateVehicleOrgVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateVehicleOrgVariables {
  id: UUIDString;
  organisationId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdateVehicleOrg` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVehicleOrgData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVehicleOrgData {
  vehicle_update?: Vehicle_Key | null;
}
```
### Using `UpdateVehicleOrg`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVehicleOrg, UpdateVehicleOrgVariables } from '@dataconnect/generated';

// The `UpdateVehicleOrg` mutation requires an argument of type `UpdateVehicleOrgVariables`:
const updateVehicleOrgVars: UpdateVehicleOrgVariables = {
  id: ..., 
  organisationId: ..., // optional
};

// Call the `updateVehicleOrg()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVehicleOrg(updateVehicleOrgVars);
// Variables can be defined inline as well.
const { data } = await updateVehicleOrg({ id: ..., organisationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVehicleOrg(dataConnect, updateVehicleOrgVars);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
updateVehicleOrg(updateVehicleOrgVars).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

### Using `UpdateVehicleOrg`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVehicleOrgRef, UpdateVehicleOrgVariables } from '@dataconnect/generated';

// The `UpdateVehicleOrg` mutation requires an argument of type `UpdateVehicleOrgVariables`:
const updateVehicleOrgVars: UpdateVehicleOrgVariables = {
  id: ..., 
  organisationId: ..., // optional
};

// Call the `updateVehicleOrgRef()` function to get a reference to the mutation.
const ref = updateVehicleOrgRef(updateVehicleOrgVars);
// Variables can be defined inline as well.
const ref = updateVehicleOrgRef({ id: ..., organisationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVehicleOrgRef(dataConnect, updateVehicleOrgVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

## UpdateVehicleDetails
You can execute the `UpdateVehicleDetails` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVehicleDetails(vars: UpdateVehicleDetailsVariables): MutationPromise<UpdateVehicleDetailsData, UpdateVehicleDetailsVariables>;

interface UpdateVehicleDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleDetailsVariables): MutationRef<UpdateVehicleDetailsData, UpdateVehicleDetailsVariables>;
}
export const updateVehicleDetailsRef: UpdateVehicleDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVehicleDetails(dc: DataConnect, vars: UpdateVehicleDetailsVariables): MutationPromise<UpdateVehicleDetailsData, UpdateVehicleDetailsVariables>;

interface UpdateVehicleDetailsRef {
  ...
  (dc: DataConnect, vars: UpdateVehicleDetailsVariables): MutationRef<UpdateVehicleDetailsData, UpdateVehicleDetailsVariables>;
}
export const updateVehicleDetailsRef: UpdateVehicleDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVehicleDetailsRef:
```typescript
const name = updateVehicleDetailsRef.operationName;
console.log(name);
```

### Variables
The `UpdateVehicleDetails` mutation requires an argument of type `UpdateVehicleDetailsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateVehicleDetails` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVehicleDetailsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVehicleDetailsData {
  vehicle_update?: Vehicle_Key | null;
}
```
### Using `UpdateVehicleDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVehicleDetails, UpdateVehicleDetailsVariables } from '@dataconnect/generated';

// The `UpdateVehicleDetails` mutation requires an argument of type `UpdateVehicleDetailsVariables`:
const updateVehicleDetailsVars: UpdateVehicleDetailsVariables = {
  id: ..., 
  make: ..., 
  model: ..., 
  year: ..., 
  type: ..., 
  regPlate: ..., 
  description: ..., // optional
  km: ..., 
  serviceIntervalKm: ..., 
  nextServiceKm: ..., 
  vin: ..., // optional
  trackingCompany: ..., // optional
  lastServiceDate: ..., // optional
};

// Call the `updateVehicleDetails()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVehicleDetails(updateVehicleDetailsVars);
// Variables can be defined inline as well.
const { data } = await updateVehicleDetails({ id: ..., make: ..., model: ..., year: ..., type: ..., regPlate: ..., description: ..., km: ..., serviceIntervalKm: ..., nextServiceKm: ..., vin: ..., trackingCompany: ..., lastServiceDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVehicleDetails(dataConnect, updateVehicleDetailsVars);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
updateVehicleDetails(updateVehicleDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

### Using `UpdateVehicleDetails`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVehicleDetailsRef, UpdateVehicleDetailsVariables } from '@dataconnect/generated';

// The `UpdateVehicleDetails` mutation requires an argument of type `UpdateVehicleDetailsVariables`:
const updateVehicleDetailsVars: UpdateVehicleDetailsVariables = {
  id: ..., 
  make: ..., 
  model: ..., 
  year: ..., 
  type: ..., 
  regPlate: ..., 
  description: ..., // optional
  km: ..., 
  serviceIntervalKm: ..., 
  nextServiceKm: ..., 
  vin: ..., // optional
  trackingCompany: ..., // optional
  lastServiceDate: ..., // optional
};

// Call the `updateVehicleDetailsRef()` function to get a reference to the mutation.
const ref = updateVehicleDetailsRef(updateVehicleDetailsVars);
// Variables can be defined inline as well.
const ref = updateVehicleDetailsRef({ id: ..., make: ..., model: ..., year: ..., type: ..., regPlate: ..., description: ..., km: ..., serviceIntervalKm: ..., nextServiceKm: ..., vin: ..., trackingCompany: ..., lastServiceDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVehicleDetailsRef(dataConnect, updateVehicleDetailsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

## UpdateVehicleImage
You can execute the `UpdateVehicleImage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVehicleImage(vars: UpdateVehicleImageVariables): MutationPromise<UpdateVehicleImageData, UpdateVehicleImageVariables>;

interface UpdateVehicleImageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVehicleImageVariables): MutationRef<UpdateVehicleImageData, UpdateVehicleImageVariables>;
}
export const updateVehicleImageRef: UpdateVehicleImageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVehicleImage(dc: DataConnect, vars: UpdateVehicleImageVariables): MutationPromise<UpdateVehicleImageData, UpdateVehicleImageVariables>;

interface UpdateVehicleImageRef {
  ...
  (dc: DataConnect, vars: UpdateVehicleImageVariables): MutationRef<UpdateVehicleImageData, UpdateVehicleImageVariables>;
}
export const updateVehicleImageRef: UpdateVehicleImageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVehicleImageRef:
```typescript
const name = updateVehicleImageRef.operationName;
console.log(name);
```

### Variables
The `UpdateVehicleImage` mutation requires an argument of type `UpdateVehicleImageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateVehicleImageVariables {
  id: UUIDString;
  imageUrl: string;
}
```
### Return Type
Recall that executing the `UpdateVehicleImage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVehicleImageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVehicleImageData {
  vehicle_update?: Vehicle_Key | null;
}
```
### Using `UpdateVehicleImage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVehicleImage, UpdateVehicleImageVariables } from '@dataconnect/generated';

// The `UpdateVehicleImage` mutation requires an argument of type `UpdateVehicleImageVariables`:
const updateVehicleImageVars: UpdateVehicleImageVariables = {
  id: ..., 
  imageUrl: ..., 
};

// Call the `updateVehicleImage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVehicleImage(updateVehicleImageVars);
// Variables can be defined inline as well.
const { data } = await updateVehicleImage({ id: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVehicleImage(dataConnect, updateVehicleImageVars);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
updateVehicleImage(updateVehicleImageVars).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

### Using `UpdateVehicleImage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVehicleImageRef, UpdateVehicleImageVariables } from '@dataconnect/generated';

// The `UpdateVehicleImage` mutation requires an argument of type `UpdateVehicleImageVariables`:
const updateVehicleImageVars: UpdateVehicleImageVariables = {
  id: ..., 
  imageUrl: ..., 
};

// Call the `updateVehicleImageRef()` function to get a reference to the mutation.
const ref = updateVehicleImageRef(updateVehicleImageVars);
// Variables can be defined inline as well.
const ref = updateVehicleImageRef({ id: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVehicleImageRef(dataConnect, updateVehicleImageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicle_update);
});
```

## DeleteVehicle
You can execute the `DeleteVehicle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteVehicle(vars: DeleteVehicleVariables): MutationPromise<DeleteVehicleData, DeleteVehicleVariables>;

interface DeleteVehicleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteVehicleVariables): MutationRef<DeleteVehicleData, DeleteVehicleVariables>;
}
export const deleteVehicleRef: DeleteVehicleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteVehicle(dc: DataConnect, vars: DeleteVehicleVariables): MutationPromise<DeleteVehicleData, DeleteVehicleVariables>;

interface DeleteVehicleRef {
  ...
  (dc: DataConnect, vars: DeleteVehicleVariables): MutationRef<DeleteVehicleData, DeleteVehicleVariables>;
}
export const deleteVehicleRef: DeleteVehicleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteVehicleRef:
```typescript
const name = deleteVehicleRef.operationName;
console.log(name);
```

### Variables
The `DeleteVehicle` mutation requires an argument of type `DeleteVehicleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteVehicleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteVehicle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteVehicleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteVehicleData {
  vehicle_delete?: Vehicle_Key | null;
}
```
### Using `DeleteVehicle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteVehicle, DeleteVehicleVariables } from '@dataconnect/generated';

// The `DeleteVehicle` mutation requires an argument of type `DeleteVehicleVariables`:
const deleteVehicleVars: DeleteVehicleVariables = {
  id: ..., 
};

// Call the `deleteVehicle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteVehicle(deleteVehicleVars);
// Variables can be defined inline as well.
const { data } = await deleteVehicle({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteVehicle(dataConnect, deleteVehicleVars);

console.log(data.vehicle_delete);

// Or, you can use the `Promise` API.
deleteVehicle(deleteVehicleVars).then((response) => {
  const data = response.data;
  console.log(data.vehicle_delete);
});
```

### Using `DeleteVehicle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteVehicleRef, DeleteVehicleVariables } from '@dataconnect/generated';

// The `DeleteVehicle` mutation requires an argument of type `DeleteVehicleVariables`:
const deleteVehicleVars: DeleteVehicleVariables = {
  id: ..., 
};

// Call the `deleteVehicleRef()` function to get a reference to the mutation.
const ref = deleteVehicleRef(deleteVehicleVars);
// Variables can be defined inline as well.
const ref = deleteVehicleRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteVehicleRef(dataConnect, deleteVehicleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicle_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicle_delete);
});
```

## AddVehicleImage
You can execute the `AddVehicleImage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addVehicleImage(vars: AddVehicleImageVariables): MutationPromise<AddVehicleImageData, AddVehicleImageVariables>;

interface AddVehicleImageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddVehicleImageVariables): MutationRef<AddVehicleImageData, AddVehicleImageVariables>;
}
export const addVehicleImageRef: AddVehicleImageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addVehicleImage(dc: DataConnect, vars: AddVehicleImageVariables): MutationPromise<AddVehicleImageData, AddVehicleImageVariables>;

interface AddVehicleImageRef {
  ...
  (dc: DataConnect, vars: AddVehicleImageVariables): MutationRef<AddVehicleImageData, AddVehicleImageVariables>;
}
export const addVehicleImageRef: AddVehicleImageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addVehicleImageRef:
```typescript
const name = addVehicleImageRef.operationName;
console.log(name);
```

### Variables
The `AddVehicleImage` mutation requires an argument of type `AddVehicleImageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddVehicleImageVariables {
  vehicleId: UUIDString;
  imageUrl: string;
  caption?: string | null;
  sortOrder?: number | null;
}
```
### Return Type
Recall that executing the `AddVehicleImage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddVehicleImageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddVehicleImageData {
  vehicleImage_insert: VehicleImage_Key;
}
```
### Using `AddVehicleImage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addVehicleImage, AddVehicleImageVariables } from '@dataconnect/generated';

// The `AddVehicleImage` mutation requires an argument of type `AddVehicleImageVariables`:
const addVehicleImageVars: AddVehicleImageVariables = {
  vehicleId: ..., 
  imageUrl: ..., 
  caption: ..., // optional
  sortOrder: ..., // optional
};

// Call the `addVehicleImage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addVehicleImage(addVehicleImageVars);
// Variables can be defined inline as well.
const { data } = await addVehicleImage({ vehicleId: ..., imageUrl: ..., caption: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addVehicleImage(dataConnect, addVehicleImageVars);

console.log(data.vehicleImage_insert);

// Or, you can use the `Promise` API.
addVehicleImage(addVehicleImageVars).then((response) => {
  const data = response.data;
  console.log(data.vehicleImage_insert);
});
```

### Using `AddVehicleImage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addVehicleImageRef, AddVehicleImageVariables } from '@dataconnect/generated';

// The `AddVehicleImage` mutation requires an argument of type `AddVehicleImageVariables`:
const addVehicleImageVars: AddVehicleImageVariables = {
  vehicleId: ..., 
  imageUrl: ..., 
  caption: ..., // optional
  sortOrder: ..., // optional
};

// Call the `addVehicleImageRef()` function to get a reference to the mutation.
const ref = addVehicleImageRef(addVehicleImageVars);
// Variables can be defined inline as well.
const ref = addVehicleImageRef({ vehicleId: ..., imageUrl: ..., caption: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addVehicleImageRef(dataConnect, addVehicleImageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicleImage_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicleImage_insert);
});
```

## DeleteVehicleImage
You can execute the `DeleteVehicleImage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteVehicleImage(vars: DeleteVehicleImageVariables): MutationPromise<DeleteVehicleImageData, DeleteVehicleImageVariables>;

interface DeleteVehicleImageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteVehicleImageVariables): MutationRef<DeleteVehicleImageData, DeleteVehicleImageVariables>;
}
export const deleteVehicleImageRef: DeleteVehicleImageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteVehicleImage(dc: DataConnect, vars: DeleteVehicleImageVariables): MutationPromise<DeleteVehicleImageData, DeleteVehicleImageVariables>;

interface DeleteVehicleImageRef {
  ...
  (dc: DataConnect, vars: DeleteVehicleImageVariables): MutationRef<DeleteVehicleImageData, DeleteVehicleImageVariables>;
}
export const deleteVehicleImageRef: DeleteVehicleImageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteVehicleImageRef:
```typescript
const name = deleteVehicleImageRef.operationName;
console.log(name);
```

### Variables
The `DeleteVehicleImage` mutation requires an argument of type `DeleteVehicleImageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteVehicleImageVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteVehicleImage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteVehicleImageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteVehicleImageData {
  vehicleImage_delete?: VehicleImage_Key | null;
}
```
### Using `DeleteVehicleImage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteVehicleImage, DeleteVehicleImageVariables } from '@dataconnect/generated';

// The `DeleteVehicleImage` mutation requires an argument of type `DeleteVehicleImageVariables`:
const deleteVehicleImageVars: DeleteVehicleImageVariables = {
  id: ..., 
};

// Call the `deleteVehicleImage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteVehicleImage(deleteVehicleImageVars);
// Variables can be defined inline as well.
const { data } = await deleteVehicleImage({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteVehicleImage(dataConnect, deleteVehicleImageVars);

console.log(data.vehicleImage_delete);

// Or, you can use the `Promise` API.
deleteVehicleImage(deleteVehicleImageVars).then((response) => {
  const data = response.data;
  console.log(data.vehicleImage_delete);
});
```

### Using `DeleteVehicleImage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteVehicleImageRef, DeleteVehicleImageVariables } from '@dataconnect/generated';

// The `DeleteVehicleImage` mutation requires an argument of type `DeleteVehicleImageVariables`:
const deleteVehicleImageVars: DeleteVehicleImageVariables = {
  id: ..., 
};

// Call the `deleteVehicleImageRef()` function to get a reference to the mutation.
const ref = deleteVehicleImageRef(deleteVehicleImageVars);
// Variables can be defined inline as well.
const ref = deleteVehicleImageRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteVehicleImageRef(dataConnect, deleteVehicleImageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vehicleImage_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vehicleImage_delete);
});
```

## CreateMaintenanceQuery
You can execute the `CreateMaintenanceQuery` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMaintenanceQuery(vars: CreateMaintenanceQueryVariables): MutationPromise<CreateMaintenanceQueryData, CreateMaintenanceQueryVariables>;

interface CreateMaintenanceQueryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMaintenanceQueryVariables): MutationRef<CreateMaintenanceQueryData, CreateMaintenanceQueryVariables>;
}
export const createMaintenanceQueryRef: CreateMaintenanceQueryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMaintenanceQuery(dc: DataConnect, vars: CreateMaintenanceQueryVariables): MutationPromise<CreateMaintenanceQueryData, CreateMaintenanceQueryVariables>;

interface CreateMaintenanceQueryRef {
  ...
  (dc: DataConnect, vars: CreateMaintenanceQueryVariables): MutationRef<CreateMaintenanceQueryData, CreateMaintenanceQueryVariables>;
}
export const createMaintenanceQueryRef: CreateMaintenanceQueryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMaintenanceQueryRef:
```typescript
const name = createMaintenanceQueryRef.operationName;
console.log(name);
```

### Variables
The `CreateMaintenanceQuery` mutation requires an argument of type `CreateMaintenanceQueryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateMaintenanceQuery` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMaintenanceQueryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMaintenanceQueryData {
  maintenanceQuery_insert: MaintenanceQuery_Key;
}
```
### Using `CreateMaintenanceQuery`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceQuery, CreateMaintenanceQueryVariables } from '@dataconnect/generated';

// The `CreateMaintenanceQuery` mutation requires an argument of type `CreateMaintenanceQueryVariables`:
const createMaintenanceQueryVars: CreateMaintenanceQueryVariables = {
  vehicleId: ..., 
  vehicleLabel: ..., 
  type: ..., 
  description: ..., 
  priority: ..., 
  loggedByName: ..., 
  loggedByUserId: ..., // optional
  issueImageUrl: ..., // optional
};

// Call the `createMaintenanceQuery()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMaintenanceQuery(createMaintenanceQueryVars);
// Variables can be defined inline as well.
const { data } = await createMaintenanceQuery({ vehicleId: ..., vehicleLabel: ..., type: ..., description: ..., priority: ..., loggedByName: ..., loggedByUserId: ..., issueImageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMaintenanceQuery(dataConnect, createMaintenanceQueryVars);

console.log(data.maintenanceQuery_insert);

// Or, you can use the `Promise` API.
createMaintenanceQuery(createMaintenanceQueryVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_insert);
});
```

### Using `CreateMaintenanceQuery`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceQueryRef, CreateMaintenanceQueryVariables } from '@dataconnect/generated';

// The `CreateMaintenanceQuery` mutation requires an argument of type `CreateMaintenanceQueryVariables`:
const createMaintenanceQueryVars: CreateMaintenanceQueryVariables = {
  vehicleId: ..., 
  vehicleLabel: ..., 
  type: ..., 
  description: ..., 
  priority: ..., 
  loggedByName: ..., 
  loggedByUserId: ..., // optional
  issueImageUrl: ..., // optional
};

// Call the `createMaintenanceQueryRef()` function to get a reference to the mutation.
const ref = createMaintenanceQueryRef(createMaintenanceQueryVars);
// Variables can be defined inline as well.
const ref = createMaintenanceQueryRef({ vehicleId: ..., vehicleLabel: ..., type: ..., description: ..., priority: ..., loggedByName: ..., loggedByUserId: ..., issueImageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMaintenanceQueryRef(dataConnect, createMaintenanceQueryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.maintenanceQuery_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_insert);
});
```

## UpdateMaintenanceStatus
You can execute the `UpdateMaintenanceStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMaintenanceStatus(vars: UpdateMaintenanceStatusVariables): MutationPromise<UpdateMaintenanceStatusData, UpdateMaintenanceStatusVariables>;

interface UpdateMaintenanceStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMaintenanceStatusVariables): MutationRef<UpdateMaintenanceStatusData, UpdateMaintenanceStatusVariables>;
}
export const updateMaintenanceStatusRef: UpdateMaintenanceStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMaintenanceStatus(dc: DataConnect, vars: UpdateMaintenanceStatusVariables): MutationPromise<UpdateMaintenanceStatusData, UpdateMaintenanceStatusVariables>;

interface UpdateMaintenanceStatusRef {
  ...
  (dc: DataConnect, vars: UpdateMaintenanceStatusVariables): MutationRef<UpdateMaintenanceStatusData, UpdateMaintenanceStatusVariables>;
}
export const updateMaintenanceStatusRef: UpdateMaintenanceStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMaintenanceStatusRef:
```typescript
const name = updateMaintenanceStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateMaintenanceStatus` mutation requires an argument of type `UpdateMaintenanceStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMaintenanceStatusVariables {
  id: UUIDString;
  status: MaintenanceStatus;
}
```
### Return Type
Recall that executing the `UpdateMaintenanceStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMaintenanceStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMaintenanceStatusData {
  maintenanceQuery_update?: MaintenanceQuery_Key | null;
}
```
### Using `UpdateMaintenanceStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMaintenanceStatus, UpdateMaintenanceStatusVariables } from '@dataconnect/generated';

// The `UpdateMaintenanceStatus` mutation requires an argument of type `UpdateMaintenanceStatusVariables`:
const updateMaintenanceStatusVars: UpdateMaintenanceStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateMaintenanceStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMaintenanceStatus(updateMaintenanceStatusVars);
// Variables can be defined inline as well.
const { data } = await updateMaintenanceStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMaintenanceStatus(dataConnect, updateMaintenanceStatusVars);

console.log(data.maintenanceQuery_update);

// Or, you can use the `Promise` API.
updateMaintenanceStatus(updateMaintenanceStatusVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_update);
});
```

### Using `UpdateMaintenanceStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMaintenanceStatusRef, UpdateMaintenanceStatusVariables } from '@dataconnect/generated';

// The `UpdateMaintenanceStatus` mutation requires an argument of type `UpdateMaintenanceStatusVariables`:
const updateMaintenanceStatusVars: UpdateMaintenanceStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateMaintenanceStatusRef()` function to get a reference to the mutation.
const ref = updateMaintenanceStatusRef(updateMaintenanceStatusVars);
// Variables can be defined inline as well.
const ref = updateMaintenanceStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMaintenanceStatusRef(dataConnect, updateMaintenanceStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.maintenanceQuery_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_update);
});
```

## ResolveMaintenanceQuery
You can execute the `ResolveMaintenanceQuery` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
resolveMaintenanceQuery(vars: ResolveMaintenanceQueryVariables): MutationPromise<ResolveMaintenanceQueryData, ResolveMaintenanceQueryVariables>;

interface ResolveMaintenanceQueryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveMaintenanceQueryVariables): MutationRef<ResolveMaintenanceQueryData, ResolveMaintenanceQueryVariables>;
}
export const resolveMaintenanceQueryRef: ResolveMaintenanceQueryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
resolveMaintenanceQuery(dc: DataConnect, vars: ResolveMaintenanceQueryVariables): MutationPromise<ResolveMaintenanceQueryData, ResolveMaintenanceQueryVariables>;

interface ResolveMaintenanceQueryRef {
  ...
  (dc: DataConnect, vars: ResolveMaintenanceQueryVariables): MutationRef<ResolveMaintenanceQueryData, ResolveMaintenanceQueryVariables>;
}
export const resolveMaintenanceQueryRef: ResolveMaintenanceQueryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the resolveMaintenanceQueryRef:
```typescript
const name = resolveMaintenanceQueryRef.operationName;
console.log(name);
```

### Variables
The `ResolveMaintenanceQuery` mutation requires an argument of type `ResolveMaintenanceQueryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ResolveMaintenanceQueryVariables {
  id: UUIDString;
  resolvedById: UUIDString;
  resolutionNotes?: string | null;
}
```
### Return Type
Recall that executing the `ResolveMaintenanceQuery` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ResolveMaintenanceQueryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ResolveMaintenanceQueryData {
  maintenanceQuery_update?: MaintenanceQuery_Key | null;
}
```
### Using `ResolveMaintenanceQuery`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, resolveMaintenanceQuery, ResolveMaintenanceQueryVariables } from '@dataconnect/generated';

// The `ResolveMaintenanceQuery` mutation requires an argument of type `ResolveMaintenanceQueryVariables`:
const resolveMaintenanceQueryVars: ResolveMaintenanceQueryVariables = {
  id: ..., 
  resolvedById: ..., 
  resolutionNotes: ..., // optional
};

// Call the `resolveMaintenanceQuery()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await resolveMaintenanceQuery(resolveMaintenanceQueryVars);
// Variables can be defined inline as well.
const { data } = await resolveMaintenanceQuery({ id: ..., resolvedById: ..., resolutionNotes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await resolveMaintenanceQuery(dataConnect, resolveMaintenanceQueryVars);

console.log(data.maintenanceQuery_update);

// Or, you can use the `Promise` API.
resolveMaintenanceQuery(resolveMaintenanceQueryVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_update);
});
```

### Using `ResolveMaintenanceQuery`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, resolveMaintenanceQueryRef, ResolveMaintenanceQueryVariables } from '@dataconnect/generated';

// The `ResolveMaintenanceQuery` mutation requires an argument of type `ResolveMaintenanceQueryVariables`:
const resolveMaintenanceQueryVars: ResolveMaintenanceQueryVariables = {
  id: ..., 
  resolvedById: ..., 
  resolutionNotes: ..., // optional
};

// Call the `resolveMaintenanceQueryRef()` function to get a reference to the mutation.
const ref = resolveMaintenanceQueryRef(resolveMaintenanceQueryVars);
// Variables can be defined inline as well.
const ref = resolveMaintenanceQueryRef({ id: ..., resolvedById: ..., resolutionNotes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = resolveMaintenanceQueryRef(dataConnect, resolveMaintenanceQueryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.maintenanceQuery_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_update);
});
```

## UpdateMaintenancePriority
You can execute the `UpdateMaintenancePriority` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMaintenancePriority(vars: UpdateMaintenancePriorityVariables): MutationPromise<UpdateMaintenancePriorityData, UpdateMaintenancePriorityVariables>;

interface UpdateMaintenancePriorityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMaintenancePriorityVariables): MutationRef<UpdateMaintenancePriorityData, UpdateMaintenancePriorityVariables>;
}
export const updateMaintenancePriorityRef: UpdateMaintenancePriorityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMaintenancePriority(dc: DataConnect, vars: UpdateMaintenancePriorityVariables): MutationPromise<UpdateMaintenancePriorityData, UpdateMaintenancePriorityVariables>;

interface UpdateMaintenancePriorityRef {
  ...
  (dc: DataConnect, vars: UpdateMaintenancePriorityVariables): MutationRef<UpdateMaintenancePriorityData, UpdateMaintenancePriorityVariables>;
}
export const updateMaintenancePriorityRef: UpdateMaintenancePriorityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMaintenancePriorityRef:
```typescript
const name = updateMaintenancePriorityRef.operationName;
console.log(name);
```

### Variables
The `UpdateMaintenancePriority` mutation requires an argument of type `UpdateMaintenancePriorityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMaintenancePriorityVariables {
  id: UUIDString;
  priority: MaintenancePriority;
}
```
### Return Type
Recall that executing the `UpdateMaintenancePriority` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMaintenancePriorityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMaintenancePriorityData {
  maintenanceQuery_update?: MaintenanceQuery_Key | null;
}
```
### Using `UpdateMaintenancePriority`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMaintenancePriority, UpdateMaintenancePriorityVariables } from '@dataconnect/generated';

// The `UpdateMaintenancePriority` mutation requires an argument of type `UpdateMaintenancePriorityVariables`:
const updateMaintenancePriorityVars: UpdateMaintenancePriorityVariables = {
  id: ..., 
  priority: ..., 
};

// Call the `updateMaintenancePriority()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMaintenancePriority(updateMaintenancePriorityVars);
// Variables can be defined inline as well.
const { data } = await updateMaintenancePriority({ id: ..., priority: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMaintenancePriority(dataConnect, updateMaintenancePriorityVars);

console.log(data.maintenanceQuery_update);

// Or, you can use the `Promise` API.
updateMaintenancePriority(updateMaintenancePriorityVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_update);
});
```

### Using `UpdateMaintenancePriority`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMaintenancePriorityRef, UpdateMaintenancePriorityVariables } from '@dataconnect/generated';

// The `UpdateMaintenancePriority` mutation requires an argument of type `UpdateMaintenancePriorityVariables`:
const updateMaintenancePriorityVars: UpdateMaintenancePriorityVariables = {
  id: ..., 
  priority: ..., 
};

// Call the `updateMaintenancePriorityRef()` function to get a reference to the mutation.
const ref = updateMaintenancePriorityRef(updateMaintenancePriorityVars);
// Variables can be defined inline as well.
const ref = updateMaintenancePriorityRef({ id: ..., priority: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMaintenancePriorityRef(dataConnect, updateMaintenancePriorityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.maintenanceQuery_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_update);
});
```

## DeleteMaintenanceQuery
You can execute the `DeleteMaintenanceQuery` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMaintenanceQuery(vars: DeleteMaintenanceQueryVariables): MutationPromise<DeleteMaintenanceQueryData, DeleteMaintenanceQueryVariables>;

interface DeleteMaintenanceQueryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMaintenanceQueryVariables): MutationRef<DeleteMaintenanceQueryData, DeleteMaintenanceQueryVariables>;
}
export const deleteMaintenanceQueryRef: DeleteMaintenanceQueryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMaintenanceQuery(dc: DataConnect, vars: DeleteMaintenanceQueryVariables): MutationPromise<DeleteMaintenanceQueryData, DeleteMaintenanceQueryVariables>;

interface DeleteMaintenanceQueryRef {
  ...
  (dc: DataConnect, vars: DeleteMaintenanceQueryVariables): MutationRef<DeleteMaintenanceQueryData, DeleteMaintenanceQueryVariables>;
}
export const deleteMaintenanceQueryRef: DeleteMaintenanceQueryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMaintenanceQueryRef:
```typescript
const name = deleteMaintenanceQueryRef.operationName;
console.log(name);
```

### Variables
The `DeleteMaintenanceQuery` mutation requires an argument of type `DeleteMaintenanceQueryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMaintenanceQueryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMaintenanceQuery` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMaintenanceQueryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMaintenanceQueryData {
  maintenanceQuery_delete?: MaintenanceQuery_Key | null;
}
```
### Using `DeleteMaintenanceQuery`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMaintenanceQuery, DeleteMaintenanceQueryVariables } from '@dataconnect/generated';

// The `DeleteMaintenanceQuery` mutation requires an argument of type `DeleteMaintenanceQueryVariables`:
const deleteMaintenanceQueryVars: DeleteMaintenanceQueryVariables = {
  id: ..., 
};

// Call the `deleteMaintenanceQuery()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMaintenanceQuery(deleteMaintenanceQueryVars);
// Variables can be defined inline as well.
const { data } = await deleteMaintenanceQuery({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMaintenanceQuery(dataConnect, deleteMaintenanceQueryVars);

console.log(data.maintenanceQuery_delete);

// Or, you can use the `Promise` API.
deleteMaintenanceQuery(deleteMaintenanceQueryVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_delete);
});
```

### Using `DeleteMaintenanceQuery`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMaintenanceQueryRef, DeleteMaintenanceQueryVariables } from '@dataconnect/generated';

// The `DeleteMaintenanceQuery` mutation requires an argument of type `DeleteMaintenanceQueryVariables`:
const deleteMaintenanceQueryVars: DeleteMaintenanceQueryVariables = {
  id: ..., 
};

// Call the `deleteMaintenanceQueryRef()` function to get a reference to the mutation.
const ref = deleteMaintenanceQueryRef(deleteMaintenanceQueryVars);
// Variables can be defined inline as well.
const ref = deleteMaintenanceQueryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMaintenanceQueryRef(dataConnect, deleteMaintenanceQueryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.maintenanceQuery_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceQuery_delete);
});
```

## CreateRental
You can execute the `CreateRental` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createRental(vars: CreateRentalVariables): MutationPromise<CreateRentalData, CreateRentalVariables>;

interface CreateRentalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRentalVariables): MutationRef<CreateRentalData, CreateRentalVariables>;
}
export const createRentalRef: CreateRentalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRental(dc: DataConnect, vars: CreateRentalVariables): MutationPromise<CreateRentalData, CreateRentalVariables>;

interface CreateRentalRef {
  ...
  (dc: DataConnect, vars: CreateRentalVariables): MutationRef<CreateRentalData, CreateRentalVariables>;
}
export const createRentalRef: CreateRentalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRentalRef:
```typescript
const name = createRentalRef.operationName;
console.log(name);
```

### Variables
The `CreateRental` mutation requires an argument of type `CreateRentalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateRental` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRentalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRentalData {
  rental_insert: Rental_Key;
}
```
### Using `CreateRental`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRental, CreateRentalVariables } from '@dataconnect/generated';

// The `CreateRental` mutation requires an argument of type `CreateRentalVariables`:
const createRentalVars: CreateRentalVariables = {
  vehicleId: ..., // optional
  equipmentName: ..., 
  clientName: ..., 
  organisationId: ..., // optional
  startDate: ..., 
  returnDate: ..., 
  valueZar: ..., 
  status: ..., // optional
  notes: ..., // optional
};

// Call the `createRental()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRental(createRentalVars);
// Variables can be defined inline as well.
const { data } = await createRental({ vehicleId: ..., equipmentName: ..., clientName: ..., organisationId: ..., startDate: ..., returnDate: ..., valueZar: ..., status: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRental(dataConnect, createRentalVars);

console.log(data.rental_insert);

// Or, you can use the `Promise` API.
createRental(createRentalVars).then((response) => {
  const data = response.data;
  console.log(data.rental_insert);
});
```

### Using `CreateRental`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRentalRef, CreateRentalVariables } from '@dataconnect/generated';

// The `CreateRental` mutation requires an argument of type `CreateRentalVariables`:
const createRentalVars: CreateRentalVariables = {
  vehicleId: ..., // optional
  equipmentName: ..., 
  clientName: ..., 
  organisationId: ..., // optional
  startDate: ..., 
  returnDate: ..., 
  valueZar: ..., 
  status: ..., // optional
  notes: ..., // optional
};

// Call the `createRentalRef()` function to get a reference to the mutation.
const ref = createRentalRef(createRentalVars);
// Variables can be defined inline as well.
const ref = createRentalRef({ vehicleId: ..., equipmentName: ..., clientName: ..., organisationId: ..., startDate: ..., returnDate: ..., valueZar: ..., status: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRentalRef(dataConnect, createRentalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rental_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rental_insert);
});
```

## UpdateRentalStatus
You can execute the `UpdateRentalStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateRentalStatus(vars: UpdateRentalStatusVariables): MutationPromise<UpdateRentalStatusData, UpdateRentalStatusVariables>;

interface UpdateRentalStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRentalStatusVariables): MutationRef<UpdateRentalStatusData, UpdateRentalStatusVariables>;
}
export const updateRentalStatusRef: UpdateRentalStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateRentalStatus(dc: DataConnect, vars: UpdateRentalStatusVariables): MutationPromise<UpdateRentalStatusData, UpdateRentalStatusVariables>;

interface UpdateRentalStatusRef {
  ...
  (dc: DataConnect, vars: UpdateRentalStatusVariables): MutationRef<UpdateRentalStatusData, UpdateRentalStatusVariables>;
}
export const updateRentalStatusRef: UpdateRentalStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateRentalStatusRef:
```typescript
const name = updateRentalStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateRentalStatus` mutation requires an argument of type `UpdateRentalStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateRentalStatusVariables {
  id: UUIDString;
  status: RentalStatus;
}
```
### Return Type
Recall that executing the `UpdateRentalStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateRentalStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateRentalStatusData {
  rental_update?: Rental_Key | null;
}
```
### Using `UpdateRentalStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateRentalStatus, UpdateRentalStatusVariables } from '@dataconnect/generated';

// The `UpdateRentalStatus` mutation requires an argument of type `UpdateRentalStatusVariables`:
const updateRentalStatusVars: UpdateRentalStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateRentalStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateRentalStatus(updateRentalStatusVars);
// Variables can be defined inline as well.
const { data } = await updateRentalStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateRentalStatus(dataConnect, updateRentalStatusVars);

console.log(data.rental_update);

// Or, you can use the `Promise` API.
updateRentalStatus(updateRentalStatusVars).then((response) => {
  const data = response.data;
  console.log(data.rental_update);
});
```

### Using `UpdateRentalStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateRentalStatusRef, UpdateRentalStatusVariables } from '@dataconnect/generated';

// The `UpdateRentalStatus` mutation requires an argument of type `UpdateRentalStatusVariables`:
const updateRentalStatusVars: UpdateRentalStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateRentalStatusRef()` function to get a reference to the mutation.
const ref = updateRentalStatusRef(updateRentalStatusVars);
// Variables can be defined inline as well.
const ref = updateRentalStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateRentalStatusRef(dataConnect, updateRentalStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rental_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rental_update);
});
```

## UpdateRental
You can execute the `UpdateRental` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateRental(vars: UpdateRentalVariables): MutationPromise<UpdateRentalData, UpdateRentalVariables>;

interface UpdateRentalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRentalVariables): MutationRef<UpdateRentalData, UpdateRentalVariables>;
}
export const updateRentalRef: UpdateRentalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateRental(dc: DataConnect, vars: UpdateRentalVariables): MutationPromise<UpdateRentalData, UpdateRentalVariables>;

interface UpdateRentalRef {
  ...
  (dc: DataConnect, vars: UpdateRentalVariables): MutationRef<UpdateRentalData, UpdateRentalVariables>;
}
export const updateRentalRef: UpdateRentalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateRentalRef:
```typescript
const name = updateRentalRef.operationName;
console.log(name);
```

### Variables
The `UpdateRental` mutation requires an argument of type `UpdateRentalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateRentalVariables {
  id: UUIDString;
  startDate?: DateString | null;
  returnDate?: DateString | null;
  valueZar?: number | null;
  status?: RentalStatus | null;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `UpdateRental` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateRentalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateRentalData {
  rental_update?: Rental_Key | null;
}
```
### Using `UpdateRental`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateRental, UpdateRentalVariables } from '@dataconnect/generated';

// The `UpdateRental` mutation requires an argument of type `UpdateRentalVariables`:
const updateRentalVars: UpdateRentalVariables = {
  id: ..., 
  startDate: ..., // optional
  returnDate: ..., // optional
  valueZar: ..., // optional
  status: ..., // optional
  notes: ..., // optional
};

// Call the `updateRental()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateRental(updateRentalVars);
// Variables can be defined inline as well.
const { data } = await updateRental({ id: ..., startDate: ..., returnDate: ..., valueZar: ..., status: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateRental(dataConnect, updateRentalVars);

console.log(data.rental_update);

// Or, you can use the `Promise` API.
updateRental(updateRentalVars).then((response) => {
  const data = response.data;
  console.log(data.rental_update);
});
```

### Using `UpdateRental`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateRentalRef, UpdateRentalVariables } from '@dataconnect/generated';

// The `UpdateRental` mutation requires an argument of type `UpdateRentalVariables`:
const updateRentalVars: UpdateRentalVariables = {
  id: ..., 
  startDate: ..., // optional
  returnDate: ..., // optional
  valueZar: ..., // optional
  status: ..., // optional
  notes: ..., // optional
};

// Call the `updateRentalRef()` function to get a reference to the mutation.
const ref = updateRentalRef(updateRentalVars);
// Variables can be defined inline as well.
const ref = updateRentalRef({ id: ..., startDate: ..., returnDate: ..., valueZar: ..., status: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateRentalRef(dataConnect, updateRentalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rental_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rental_update);
});
```

## DeleteRental
You can execute the `DeleteRental` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteRental(vars: DeleteRentalVariables): MutationPromise<DeleteRentalData, DeleteRentalVariables>;

interface DeleteRentalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteRentalVariables): MutationRef<DeleteRentalData, DeleteRentalVariables>;
}
export const deleteRentalRef: DeleteRentalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteRental(dc: DataConnect, vars: DeleteRentalVariables): MutationPromise<DeleteRentalData, DeleteRentalVariables>;

interface DeleteRentalRef {
  ...
  (dc: DataConnect, vars: DeleteRentalVariables): MutationRef<DeleteRentalData, DeleteRentalVariables>;
}
export const deleteRentalRef: DeleteRentalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteRentalRef:
```typescript
const name = deleteRentalRef.operationName;
console.log(name);
```

### Variables
The `DeleteRental` mutation requires an argument of type `DeleteRentalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteRentalVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteRental` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteRentalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteRentalData {
  rental_delete?: Rental_Key | null;
}
```
### Using `DeleteRental`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteRental, DeleteRentalVariables } from '@dataconnect/generated';

// The `DeleteRental` mutation requires an argument of type `DeleteRentalVariables`:
const deleteRentalVars: DeleteRentalVariables = {
  id: ..., 
};

// Call the `deleteRental()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteRental(deleteRentalVars);
// Variables can be defined inline as well.
const { data } = await deleteRental({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteRental(dataConnect, deleteRentalVars);

console.log(data.rental_delete);

// Or, you can use the `Promise` API.
deleteRental(deleteRentalVars).then((response) => {
  const data = response.data;
  console.log(data.rental_delete);
});
```

### Using `DeleteRental`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteRentalRef, DeleteRentalVariables } from '@dataconnect/generated';

// The `DeleteRental` mutation requires an argument of type `DeleteRentalVariables`:
const deleteRentalVars: DeleteRentalVariables = {
  id: ..., 
};

// Call the `deleteRentalRef()` function to get a reference to the mutation.
const ref = deleteRentalRef(deleteRentalVars);
// Variables can be defined inline as well.
const ref = deleteRentalRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteRentalRef(dataConnect, deleteRentalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rental_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rental_delete);
});
```

## CreateRentalApplication
You can execute the `CreateRentalApplication` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createRentalApplication(vars: CreateRentalApplicationVariables): MutationPromise<CreateRentalApplicationData, CreateRentalApplicationVariables>;

interface CreateRentalApplicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRentalApplicationVariables): MutationRef<CreateRentalApplicationData, CreateRentalApplicationVariables>;
}
export const createRentalApplicationRef: CreateRentalApplicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRentalApplication(dc: DataConnect, vars: CreateRentalApplicationVariables): MutationPromise<CreateRentalApplicationData, CreateRentalApplicationVariables>;

interface CreateRentalApplicationRef {
  ...
  (dc: DataConnect, vars: CreateRentalApplicationVariables): MutationRef<CreateRentalApplicationData, CreateRentalApplicationVariables>;
}
export const createRentalApplicationRef: CreateRentalApplicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRentalApplicationRef:
```typescript
const name = createRentalApplicationRef.operationName;
console.log(name);
```

### Variables
The `CreateRentalApplication` mutation requires an argument of type `CreateRentalApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateRentalApplication` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRentalApplicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRentalApplicationData {
  rentalApplication_insert: RentalApplication_Key;
}
```
### Using `CreateRentalApplication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRentalApplication, CreateRentalApplicationVariables } from '@dataconnect/generated';

// The `CreateRentalApplication` mutation requires an argument of type `CreateRentalApplicationVariables`:
const createRentalApplicationVars: CreateRentalApplicationVariables = {
  ref: ..., 
  applicantUserId: ..., // optional
  organisationId: ..., // optional
  firstName: ..., 
  lastName: ..., 
  idNumber: ..., 
  dateOfBirth: ..., 
  email: ..., 
  phone: ..., 
  address: ..., 
  city: ..., // optional
  province: ..., // optional
  postalCode: ..., // optional
  employmentStatus: ..., 
  employerName: ..., 
  monthlyIncome: ..., 
  yearsEmployed: ..., // optional
  bank: ..., 
  accountType: ..., // optional
  outstandingCredit: ..., // optional
  creditCheckConsent: ..., // optional
  vehicleId: ..., // optional
  equipmentName: ..., 
  dailyRate: ..., // optional
  startDate: ..., 
  endDate: ..., 
  estimatedCost: ..., // optional
  deliveryAddress: ..., 
  purpose: ..., // optional
  rentalNotes: ..., // optional
  consentCreditCheck: ..., 
  consentTerms: ..., 
  consentUnderstanding: ..., 
};

// Call the `createRentalApplication()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRentalApplication(createRentalApplicationVars);
// Variables can be defined inline as well.
const { data } = await createRentalApplication({ ref: ..., applicantUserId: ..., organisationId: ..., firstName: ..., lastName: ..., idNumber: ..., dateOfBirth: ..., email: ..., phone: ..., address: ..., city: ..., province: ..., postalCode: ..., employmentStatus: ..., employerName: ..., monthlyIncome: ..., yearsEmployed: ..., bank: ..., accountType: ..., outstandingCredit: ..., creditCheckConsent: ..., vehicleId: ..., equipmentName: ..., dailyRate: ..., startDate: ..., endDate: ..., estimatedCost: ..., deliveryAddress: ..., purpose: ..., rentalNotes: ..., consentCreditCheck: ..., consentTerms: ..., consentUnderstanding: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRentalApplication(dataConnect, createRentalApplicationVars);

console.log(data.rentalApplication_insert);

// Or, you can use the `Promise` API.
createRentalApplication(createRentalApplicationVars).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication_insert);
});
```

### Using `CreateRentalApplication`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRentalApplicationRef, CreateRentalApplicationVariables } from '@dataconnect/generated';

// The `CreateRentalApplication` mutation requires an argument of type `CreateRentalApplicationVariables`:
const createRentalApplicationVars: CreateRentalApplicationVariables = {
  ref: ..., 
  applicantUserId: ..., // optional
  organisationId: ..., // optional
  firstName: ..., 
  lastName: ..., 
  idNumber: ..., 
  dateOfBirth: ..., 
  email: ..., 
  phone: ..., 
  address: ..., 
  city: ..., // optional
  province: ..., // optional
  postalCode: ..., // optional
  employmentStatus: ..., 
  employerName: ..., 
  monthlyIncome: ..., 
  yearsEmployed: ..., // optional
  bank: ..., 
  accountType: ..., // optional
  outstandingCredit: ..., // optional
  creditCheckConsent: ..., // optional
  vehicleId: ..., // optional
  equipmentName: ..., 
  dailyRate: ..., // optional
  startDate: ..., 
  endDate: ..., 
  estimatedCost: ..., // optional
  deliveryAddress: ..., 
  purpose: ..., // optional
  rentalNotes: ..., // optional
  consentCreditCheck: ..., 
  consentTerms: ..., 
  consentUnderstanding: ..., 
};

// Call the `createRentalApplicationRef()` function to get a reference to the mutation.
const ref = createRentalApplicationRef(createRentalApplicationVars);
// Variables can be defined inline as well.
const ref = createRentalApplicationRef({ ref: ..., applicantUserId: ..., organisationId: ..., firstName: ..., lastName: ..., idNumber: ..., dateOfBirth: ..., email: ..., phone: ..., address: ..., city: ..., province: ..., postalCode: ..., employmentStatus: ..., employerName: ..., monthlyIncome: ..., yearsEmployed: ..., bank: ..., accountType: ..., outstandingCredit: ..., creditCheckConsent: ..., vehicleId: ..., equipmentName: ..., dailyRate: ..., startDate: ..., endDate: ..., estimatedCost: ..., deliveryAddress: ..., purpose: ..., rentalNotes: ..., consentCreditCheck: ..., consentTerms: ..., consentUnderstanding: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRentalApplicationRef(dataConnect, createRentalApplicationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rentalApplication_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication_insert);
});
```

## ReviewRentalApplication
You can execute the `ReviewRentalApplication` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
reviewRentalApplication(vars: ReviewRentalApplicationVariables): MutationPromise<ReviewRentalApplicationData, ReviewRentalApplicationVariables>;

interface ReviewRentalApplicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReviewRentalApplicationVariables): MutationRef<ReviewRentalApplicationData, ReviewRentalApplicationVariables>;
}
export const reviewRentalApplicationRef: ReviewRentalApplicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reviewRentalApplication(dc: DataConnect, vars: ReviewRentalApplicationVariables): MutationPromise<ReviewRentalApplicationData, ReviewRentalApplicationVariables>;

interface ReviewRentalApplicationRef {
  ...
  (dc: DataConnect, vars: ReviewRentalApplicationVariables): MutationRef<ReviewRentalApplicationData, ReviewRentalApplicationVariables>;
}
export const reviewRentalApplicationRef: ReviewRentalApplicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reviewRentalApplicationRef:
```typescript
const name = reviewRentalApplicationRef.operationName;
console.log(name);
```

### Variables
The `ReviewRentalApplication` mutation requires an argument of type `ReviewRentalApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReviewRentalApplicationVariables {
  id: UUIDString;
  status: ApplicationStatus;
  reviewedById: UUIDString;
  rejectionReason?: string | null;
}
```
### Return Type
Recall that executing the `ReviewRentalApplication` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReviewRentalApplicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReviewRentalApplicationData {
  rentalApplication_update?: RentalApplication_Key | null;
}
```
### Using `ReviewRentalApplication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reviewRentalApplication, ReviewRentalApplicationVariables } from '@dataconnect/generated';

// The `ReviewRentalApplication` mutation requires an argument of type `ReviewRentalApplicationVariables`:
const reviewRentalApplicationVars: ReviewRentalApplicationVariables = {
  id: ..., 
  status: ..., 
  reviewedById: ..., 
  rejectionReason: ..., // optional
};

// Call the `reviewRentalApplication()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reviewRentalApplication(reviewRentalApplicationVars);
// Variables can be defined inline as well.
const { data } = await reviewRentalApplication({ id: ..., status: ..., reviewedById: ..., rejectionReason: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reviewRentalApplication(dataConnect, reviewRentalApplicationVars);

console.log(data.rentalApplication_update);

// Or, you can use the `Promise` API.
reviewRentalApplication(reviewRentalApplicationVars).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication_update);
});
```

### Using `ReviewRentalApplication`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reviewRentalApplicationRef, ReviewRentalApplicationVariables } from '@dataconnect/generated';

// The `ReviewRentalApplication` mutation requires an argument of type `ReviewRentalApplicationVariables`:
const reviewRentalApplicationVars: ReviewRentalApplicationVariables = {
  id: ..., 
  status: ..., 
  reviewedById: ..., 
  rejectionReason: ..., // optional
};

// Call the `reviewRentalApplicationRef()` function to get a reference to the mutation.
const ref = reviewRentalApplicationRef(reviewRentalApplicationVars);
// Variables can be defined inline as well.
const ref = reviewRentalApplicationRef({ id: ..., status: ..., reviewedById: ..., rejectionReason: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reviewRentalApplicationRef(dataConnect, reviewRentalApplicationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rentalApplication_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication_update);
});
```

## AttachApplicationDocuments
You can execute the `AttachApplicationDocuments` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
attachApplicationDocuments(vars: AttachApplicationDocumentsVariables): MutationPromise<AttachApplicationDocumentsData, AttachApplicationDocumentsVariables>;

interface AttachApplicationDocumentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AttachApplicationDocumentsVariables): MutationRef<AttachApplicationDocumentsData, AttachApplicationDocumentsVariables>;
}
export const attachApplicationDocumentsRef: AttachApplicationDocumentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
attachApplicationDocuments(dc: DataConnect, vars: AttachApplicationDocumentsVariables): MutationPromise<AttachApplicationDocumentsData, AttachApplicationDocumentsVariables>;

interface AttachApplicationDocumentsRef {
  ...
  (dc: DataConnect, vars: AttachApplicationDocumentsVariables): MutationRef<AttachApplicationDocumentsData, AttachApplicationDocumentsVariables>;
}
export const attachApplicationDocumentsRef: AttachApplicationDocumentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the attachApplicationDocumentsRef:
```typescript
const name = attachApplicationDocumentsRef.operationName;
console.log(name);
```

### Variables
The `AttachApplicationDocuments` mutation requires an argument of type `AttachApplicationDocumentsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AttachApplicationDocumentsVariables {
  id: UUIDString;
  idDocumentUrl?: string | null;
  proofOfIncomeUrl?: string | null;
  supportingDocUrl?: string | null;
}
```
### Return Type
Recall that executing the `AttachApplicationDocuments` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AttachApplicationDocumentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AttachApplicationDocumentsData {
  rentalApplication_update?: RentalApplication_Key | null;
}
```
### Using `AttachApplicationDocuments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, attachApplicationDocuments, AttachApplicationDocumentsVariables } from '@dataconnect/generated';

// The `AttachApplicationDocuments` mutation requires an argument of type `AttachApplicationDocumentsVariables`:
const attachApplicationDocumentsVars: AttachApplicationDocumentsVariables = {
  id: ..., 
  idDocumentUrl: ..., // optional
  proofOfIncomeUrl: ..., // optional
  supportingDocUrl: ..., // optional
};

// Call the `attachApplicationDocuments()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await attachApplicationDocuments(attachApplicationDocumentsVars);
// Variables can be defined inline as well.
const { data } = await attachApplicationDocuments({ id: ..., idDocumentUrl: ..., proofOfIncomeUrl: ..., supportingDocUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await attachApplicationDocuments(dataConnect, attachApplicationDocumentsVars);

console.log(data.rentalApplication_update);

// Or, you can use the `Promise` API.
attachApplicationDocuments(attachApplicationDocumentsVars).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication_update);
});
```

### Using `AttachApplicationDocuments`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, attachApplicationDocumentsRef, AttachApplicationDocumentsVariables } from '@dataconnect/generated';

// The `AttachApplicationDocuments` mutation requires an argument of type `AttachApplicationDocumentsVariables`:
const attachApplicationDocumentsVars: AttachApplicationDocumentsVariables = {
  id: ..., 
  idDocumentUrl: ..., // optional
  proofOfIncomeUrl: ..., // optional
  supportingDocUrl: ..., // optional
};

// Call the `attachApplicationDocumentsRef()` function to get a reference to the mutation.
const ref = attachApplicationDocumentsRef(attachApplicationDocumentsVars);
// Variables can be defined inline as well.
const ref = attachApplicationDocumentsRef({ id: ..., idDocumentUrl: ..., proofOfIncomeUrl: ..., supportingDocUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = attachApplicationDocumentsRef(dataConnect, attachApplicationDocumentsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rentalApplication_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication_update);
});
```

## DeleteRentalApplication
You can execute the `DeleteRentalApplication` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteRentalApplication(vars: DeleteRentalApplicationVariables): MutationPromise<DeleteRentalApplicationData, DeleteRentalApplicationVariables>;

interface DeleteRentalApplicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteRentalApplicationVariables): MutationRef<DeleteRentalApplicationData, DeleteRentalApplicationVariables>;
}
export const deleteRentalApplicationRef: DeleteRentalApplicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteRentalApplication(dc: DataConnect, vars: DeleteRentalApplicationVariables): MutationPromise<DeleteRentalApplicationData, DeleteRentalApplicationVariables>;

interface DeleteRentalApplicationRef {
  ...
  (dc: DataConnect, vars: DeleteRentalApplicationVariables): MutationRef<DeleteRentalApplicationData, DeleteRentalApplicationVariables>;
}
export const deleteRentalApplicationRef: DeleteRentalApplicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteRentalApplicationRef:
```typescript
const name = deleteRentalApplicationRef.operationName;
console.log(name);
```

### Variables
The `DeleteRentalApplication` mutation requires an argument of type `DeleteRentalApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteRentalApplicationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteRentalApplication` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteRentalApplicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteRentalApplicationData {
  rentalApplication_delete?: RentalApplication_Key | null;
}
```
### Using `DeleteRentalApplication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteRentalApplication, DeleteRentalApplicationVariables } from '@dataconnect/generated';

// The `DeleteRentalApplication` mutation requires an argument of type `DeleteRentalApplicationVariables`:
const deleteRentalApplicationVars: DeleteRentalApplicationVariables = {
  id: ..., 
};

// Call the `deleteRentalApplication()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteRentalApplication(deleteRentalApplicationVars);
// Variables can be defined inline as well.
const { data } = await deleteRentalApplication({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteRentalApplication(dataConnect, deleteRentalApplicationVars);

console.log(data.rentalApplication_delete);

// Or, you can use the `Promise` API.
deleteRentalApplication(deleteRentalApplicationVars).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication_delete);
});
```

### Using `DeleteRentalApplication`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteRentalApplicationRef, DeleteRentalApplicationVariables } from '@dataconnect/generated';

// The `DeleteRentalApplication` mutation requires an argument of type `DeleteRentalApplicationVariables`:
const deleteRentalApplicationVars: DeleteRentalApplicationVariables = {
  id: ..., 
};

// Call the `deleteRentalApplicationRef()` function to get a reference to the mutation.
const ref = deleteRentalApplicationRef(deleteRentalApplicationVars);
// Variables can be defined inline as well.
const ref = deleteRentalApplicationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteRentalApplicationRef(dataConnect, deleteRentalApplicationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rentalApplication_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rentalApplication_delete);
});
```

## CreateCatalogItem
You can execute the `CreateCatalogItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCatalogItem(vars: CreateCatalogItemVariables): MutationPromise<CreateCatalogItemData, CreateCatalogItemVariables>;

interface CreateCatalogItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCatalogItemVariables): MutationRef<CreateCatalogItemData, CreateCatalogItemVariables>;
}
export const createCatalogItemRef: CreateCatalogItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCatalogItem(dc: DataConnect, vars: CreateCatalogItemVariables): MutationPromise<CreateCatalogItemData, CreateCatalogItemVariables>;

interface CreateCatalogItemRef {
  ...
  (dc: DataConnect, vars: CreateCatalogItemVariables): MutationRef<CreateCatalogItemData, CreateCatalogItemVariables>;
}
export const createCatalogItemRef: CreateCatalogItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCatalogItemRef:
```typescript
const name = createCatalogItemRef.operationName;
console.log(name);
```

### Variables
The `CreateCatalogItem` mutation requires an argument of type `CreateCatalogItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateCatalogItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCatalogItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCatalogItemData {
  catalogItem_insert: CatalogItem_Key;
}
```
### Using `CreateCatalogItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCatalogItem, CreateCatalogItemVariables } from '@dataconnect/generated';

// The `CreateCatalogItem` mutation requires an argument of type `CreateCatalogItemVariables`:
const createCatalogItemVars: CreateCatalogItemVariables = {
  name: ..., 
  subtitle: ..., // optional
  category: ..., 
  description: ..., // optional
  specs: ..., // optional
  dailyRate: ..., 
  status: ..., // optional
  availableFrom: ..., // optional
  imageUrl: ..., 
};

// Call the `createCatalogItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCatalogItem(createCatalogItemVars);
// Variables can be defined inline as well.
const { data } = await createCatalogItem({ name: ..., subtitle: ..., category: ..., description: ..., specs: ..., dailyRate: ..., status: ..., availableFrom: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCatalogItem(dataConnect, createCatalogItemVars);

console.log(data.catalogItem_insert);

// Or, you can use the `Promise` API.
createCatalogItem(createCatalogItemVars).then((response) => {
  const data = response.data;
  console.log(data.catalogItem_insert);
});
```

### Using `CreateCatalogItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCatalogItemRef, CreateCatalogItemVariables } from '@dataconnect/generated';

// The `CreateCatalogItem` mutation requires an argument of type `CreateCatalogItemVariables`:
const createCatalogItemVars: CreateCatalogItemVariables = {
  name: ..., 
  subtitle: ..., // optional
  category: ..., 
  description: ..., // optional
  specs: ..., // optional
  dailyRate: ..., 
  status: ..., // optional
  availableFrom: ..., // optional
  imageUrl: ..., 
};

// Call the `createCatalogItemRef()` function to get a reference to the mutation.
const ref = createCatalogItemRef(createCatalogItemVars);
// Variables can be defined inline as well.
const ref = createCatalogItemRef({ name: ..., subtitle: ..., category: ..., description: ..., specs: ..., dailyRate: ..., status: ..., availableFrom: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCatalogItemRef(dataConnect, createCatalogItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.catalogItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogItem_insert);
});
```

## UpdateCatalogItem
You can execute the `UpdateCatalogItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCatalogItem(vars: UpdateCatalogItemVariables): MutationPromise<UpdateCatalogItemData, UpdateCatalogItemVariables>;

interface UpdateCatalogItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCatalogItemVariables): MutationRef<UpdateCatalogItemData, UpdateCatalogItemVariables>;
}
export const updateCatalogItemRef: UpdateCatalogItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCatalogItem(dc: DataConnect, vars: UpdateCatalogItemVariables): MutationPromise<UpdateCatalogItemData, UpdateCatalogItemVariables>;

interface UpdateCatalogItemRef {
  ...
  (dc: DataConnect, vars: UpdateCatalogItemVariables): MutationRef<UpdateCatalogItemData, UpdateCatalogItemVariables>;
}
export const updateCatalogItemRef: UpdateCatalogItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCatalogItemRef:
```typescript
const name = updateCatalogItemRef.operationName;
console.log(name);
```

### Variables
The `UpdateCatalogItem` mutation requires an argument of type `UpdateCatalogItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCatalogItemVariables {
  id: UUIDString;
  name?: string | null;
  subtitle?: string | null;
  description?: string | null;
  specs?: string | null;
  dailyRate?: number | null;
  imageUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateCatalogItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCatalogItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCatalogItemData {
  catalogItem_update?: CatalogItem_Key | null;
}
```
### Using `UpdateCatalogItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCatalogItem, UpdateCatalogItemVariables } from '@dataconnect/generated';

// The `UpdateCatalogItem` mutation requires an argument of type `UpdateCatalogItemVariables`:
const updateCatalogItemVars: UpdateCatalogItemVariables = {
  id: ..., 
  name: ..., // optional
  subtitle: ..., // optional
  description: ..., // optional
  specs: ..., // optional
  dailyRate: ..., // optional
  imageUrl: ..., // optional
};

// Call the `updateCatalogItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCatalogItem(updateCatalogItemVars);
// Variables can be defined inline as well.
const { data } = await updateCatalogItem({ id: ..., name: ..., subtitle: ..., description: ..., specs: ..., dailyRate: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCatalogItem(dataConnect, updateCatalogItemVars);

console.log(data.catalogItem_update);

// Or, you can use the `Promise` API.
updateCatalogItem(updateCatalogItemVars).then((response) => {
  const data = response.data;
  console.log(data.catalogItem_update);
});
```

### Using `UpdateCatalogItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCatalogItemRef, UpdateCatalogItemVariables } from '@dataconnect/generated';

// The `UpdateCatalogItem` mutation requires an argument of type `UpdateCatalogItemVariables`:
const updateCatalogItemVars: UpdateCatalogItemVariables = {
  id: ..., 
  name: ..., // optional
  subtitle: ..., // optional
  description: ..., // optional
  specs: ..., // optional
  dailyRate: ..., // optional
  imageUrl: ..., // optional
};

// Call the `updateCatalogItemRef()` function to get a reference to the mutation.
const ref = updateCatalogItemRef(updateCatalogItemVars);
// Variables can be defined inline as well.
const ref = updateCatalogItemRef({ id: ..., name: ..., subtitle: ..., description: ..., specs: ..., dailyRate: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCatalogItemRef(dataConnect, updateCatalogItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.catalogItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogItem_update);
});
```

## UpdateCatalogItemStatus
You can execute the `UpdateCatalogItemStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCatalogItemStatus(vars: UpdateCatalogItemStatusVariables): MutationPromise<UpdateCatalogItemStatusData, UpdateCatalogItemStatusVariables>;

interface UpdateCatalogItemStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCatalogItemStatusVariables): MutationRef<UpdateCatalogItemStatusData, UpdateCatalogItemStatusVariables>;
}
export const updateCatalogItemStatusRef: UpdateCatalogItemStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCatalogItemStatus(dc: DataConnect, vars: UpdateCatalogItemStatusVariables): MutationPromise<UpdateCatalogItemStatusData, UpdateCatalogItemStatusVariables>;

interface UpdateCatalogItemStatusRef {
  ...
  (dc: DataConnect, vars: UpdateCatalogItemStatusVariables): MutationRef<UpdateCatalogItemStatusData, UpdateCatalogItemStatusVariables>;
}
export const updateCatalogItemStatusRef: UpdateCatalogItemStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCatalogItemStatusRef:
```typescript
const name = updateCatalogItemStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateCatalogItemStatus` mutation requires an argument of type `UpdateCatalogItemStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCatalogItemStatusVariables {
  id: UUIDString;
  status: VehicleStatus;
  availableFrom?: DateString | null;
}
```
### Return Type
Recall that executing the `UpdateCatalogItemStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCatalogItemStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCatalogItemStatusData {
  catalogItem_update?: CatalogItem_Key | null;
}
```
### Using `UpdateCatalogItemStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCatalogItemStatus, UpdateCatalogItemStatusVariables } from '@dataconnect/generated';

// The `UpdateCatalogItemStatus` mutation requires an argument of type `UpdateCatalogItemStatusVariables`:
const updateCatalogItemStatusVars: UpdateCatalogItemStatusVariables = {
  id: ..., 
  status: ..., 
  availableFrom: ..., // optional
};

// Call the `updateCatalogItemStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCatalogItemStatus(updateCatalogItemStatusVars);
// Variables can be defined inline as well.
const { data } = await updateCatalogItemStatus({ id: ..., status: ..., availableFrom: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCatalogItemStatus(dataConnect, updateCatalogItemStatusVars);

console.log(data.catalogItem_update);

// Or, you can use the `Promise` API.
updateCatalogItemStatus(updateCatalogItemStatusVars).then((response) => {
  const data = response.data;
  console.log(data.catalogItem_update);
});
```

### Using `UpdateCatalogItemStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCatalogItemStatusRef, UpdateCatalogItemStatusVariables } from '@dataconnect/generated';

// The `UpdateCatalogItemStatus` mutation requires an argument of type `UpdateCatalogItemStatusVariables`:
const updateCatalogItemStatusVars: UpdateCatalogItemStatusVariables = {
  id: ..., 
  status: ..., 
  availableFrom: ..., // optional
};

// Call the `updateCatalogItemStatusRef()` function to get a reference to the mutation.
const ref = updateCatalogItemStatusRef(updateCatalogItemStatusVars);
// Variables can be defined inline as well.
const ref = updateCatalogItemStatusRef({ id: ..., status: ..., availableFrom: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCatalogItemStatusRef(dataConnect, updateCatalogItemStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.catalogItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogItem_update);
});
```

## DeleteCatalogItem
You can execute the `DeleteCatalogItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCatalogItem(vars: DeleteCatalogItemVariables): MutationPromise<DeleteCatalogItemData, DeleteCatalogItemVariables>;

interface DeleteCatalogItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCatalogItemVariables): MutationRef<DeleteCatalogItemData, DeleteCatalogItemVariables>;
}
export const deleteCatalogItemRef: DeleteCatalogItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCatalogItem(dc: DataConnect, vars: DeleteCatalogItemVariables): MutationPromise<DeleteCatalogItemData, DeleteCatalogItemVariables>;

interface DeleteCatalogItemRef {
  ...
  (dc: DataConnect, vars: DeleteCatalogItemVariables): MutationRef<DeleteCatalogItemData, DeleteCatalogItemVariables>;
}
export const deleteCatalogItemRef: DeleteCatalogItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCatalogItemRef:
```typescript
const name = deleteCatalogItemRef.operationName;
console.log(name);
```

### Variables
The `DeleteCatalogItem` mutation requires an argument of type `DeleteCatalogItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCatalogItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCatalogItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCatalogItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCatalogItemData {
  catalogItem_delete?: CatalogItem_Key | null;
}
```
### Using `DeleteCatalogItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCatalogItem, DeleteCatalogItemVariables } from '@dataconnect/generated';

// The `DeleteCatalogItem` mutation requires an argument of type `DeleteCatalogItemVariables`:
const deleteCatalogItemVars: DeleteCatalogItemVariables = {
  id: ..., 
};

// Call the `deleteCatalogItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCatalogItem(deleteCatalogItemVars);
// Variables can be defined inline as well.
const { data } = await deleteCatalogItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCatalogItem(dataConnect, deleteCatalogItemVars);

console.log(data.catalogItem_delete);

// Or, you can use the `Promise` API.
deleteCatalogItem(deleteCatalogItemVars).then((response) => {
  const data = response.data;
  console.log(data.catalogItem_delete);
});
```

### Using `DeleteCatalogItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCatalogItemRef, DeleteCatalogItemVariables } from '@dataconnect/generated';

// The `DeleteCatalogItem` mutation requires an argument of type `DeleteCatalogItemVariables`:
const deleteCatalogItemVars: DeleteCatalogItemVariables = {
  id: ..., 
};

// Call the `deleteCatalogItemRef()` function to get a reference to the mutation.
const ref = deleteCatalogItemRef(deleteCatalogItemVars);
// Variables can be defined inline as well.
const ref = deleteCatalogItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCatalogItemRef(dataConnect, deleteCatalogItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.catalogItem_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogItem_delete);
});
```

## AddCatalogImage
You can execute the `AddCatalogImage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addCatalogImage(vars: AddCatalogImageVariables): MutationPromise<AddCatalogImageData, AddCatalogImageVariables>;

interface AddCatalogImageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddCatalogImageVariables): MutationRef<AddCatalogImageData, AddCatalogImageVariables>;
}
export const addCatalogImageRef: AddCatalogImageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addCatalogImage(dc: DataConnect, vars: AddCatalogImageVariables): MutationPromise<AddCatalogImageData, AddCatalogImageVariables>;

interface AddCatalogImageRef {
  ...
  (dc: DataConnect, vars: AddCatalogImageVariables): MutationRef<AddCatalogImageData, AddCatalogImageVariables>;
}
export const addCatalogImageRef: AddCatalogImageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addCatalogImageRef:
```typescript
const name = addCatalogImageRef.operationName;
console.log(name);
```

### Variables
The `AddCatalogImage` mutation requires an argument of type `AddCatalogImageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddCatalogImageVariables {
  catalogItemId: UUIDString;
  imageUrl: string;
  caption?: string | null;
  sortOrder?: number | null;
}
```
### Return Type
Recall that executing the `AddCatalogImage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddCatalogImageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddCatalogImageData {
  catalogImage_insert: CatalogImage_Key;
}
```
### Using `AddCatalogImage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addCatalogImage, AddCatalogImageVariables } from '@dataconnect/generated';

// The `AddCatalogImage` mutation requires an argument of type `AddCatalogImageVariables`:
const addCatalogImageVars: AddCatalogImageVariables = {
  catalogItemId: ..., 
  imageUrl: ..., 
  caption: ..., // optional
  sortOrder: ..., // optional
};

// Call the `addCatalogImage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addCatalogImage(addCatalogImageVars);
// Variables can be defined inline as well.
const { data } = await addCatalogImage({ catalogItemId: ..., imageUrl: ..., caption: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addCatalogImage(dataConnect, addCatalogImageVars);

console.log(data.catalogImage_insert);

// Or, you can use the `Promise` API.
addCatalogImage(addCatalogImageVars).then((response) => {
  const data = response.data;
  console.log(data.catalogImage_insert);
});
```

### Using `AddCatalogImage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addCatalogImageRef, AddCatalogImageVariables } from '@dataconnect/generated';

// The `AddCatalogImage` mutation requires an argument of type `AddCatalogImageVariables`:
const addCatalogImageVars: AddCatalogImageVariables = {
  catalogItemId: ..., 
  imageUrl: ..., 
  caption: ..., // optional
  sortOrder: ..., // optional
};

// Call the `addCatalogImageRef()` function to get a reference to the mutation.
const ref = addCatalogImageRef(addCatalogImageVars);
// Variables can be defined inline as well.
const ref = addCatalogImageRef({ catalogItemId: ..., imageUrl: ..., caption: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addCatalogImageRef(dataConnect, addCatalogImageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.catalogImage_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogImage_insert);
});
```

## DeleteCatalogImage
You can execute the `DeleteCatalogImage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCatalogImage(vars: DeleteCatalogImageVariables): MutationPromise<DeleteCatalogImageData, DeleteCatalogImageVariables>;

interface DeleteCatalogImageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCatalogImageVariables): MutationRef<DeleteCatalogImageData, DeleteCatalogImageVariables>;
}
export const deleteCatalogImageRef: DeleteCatalogImageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCatalogImage(dc: DataConnect, vars: DeleteCatalogImageVariables): MutationPromise<DeleteCatalogImageData, DeleteCatalogImageVariables>;

interface DeleteCatalogImageRef {
  ...
  (dc: DataConnect, vars: DeleteCatalogImageVariables): MutationRef<DeleteCatalogImageData, DeleteCatalogImageVariables>;
}
export const deleteCatalogImageRef: DeleteCatalogImageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCatalogImageRef:
```typescript
const name = deleteCatalogImageRef.operationName;
console.log(name);
```

### Variables
The `DeleteCatalogImage` mutation requires an argument of type `DeleteCatalogImageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCatalogImageVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCatalogImage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCatalogImageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCatalogImageData {
  catalogImage_delete?: CatalogImage_Key | null;
}
```
### Using `DeleteCatalogImage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCatalogImage, DeleteCatalogImageVariables } from '@dataconnect/generated';

// The `DeleteCatalogImage` mutation requires an argument of type `DeleteCatalogImageVariables`:
const deleteCatalogImageVars: DeleteCatalogImageVariables = {
  id: ..., 
};

// Call the `deleteCatalogImage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCatalogImage(deleteCatalogImageVars);
// Variables can be defined inline as well.
const { data } = await deleteCatalogImage({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCatalogImage(dataConnect, deleteCatalogImageVars);

console.log(data.catalogImage_delete);

// Or, you can use the `Promise` API.
deleteCatalogImage(deleteCatalogImageVars).then((response) => {
  const data = response.data;
  console.log(data.catalogImage_delete);
});
```

### Using `DeleteCatalogImage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCatalogImageRef, DeleteCatalogImageVariables } from '@dataconnect/generated';

// The `DeleteCatalogImage` mutation requires an argument of type `DeleteCatalogImageVariables`:
const deleteCatalogImageVars: DeleteCatalogImageVariables = {
  id: ..., 
};

// Call the `deleteCatalogImageRef()` function to get a reference to the mutation.
const ref = deleteCatalogImageRef(deleteCatalogImageVars);
// Variables can be defined inline as well.
const ref = deleteCatalogImageRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCatalogImageRef(dataConnect, deleteCatalogImageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.catalogImage_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.catalogImage_delete);
});
```

## JoinWaitlist
You can execute the `JoinWaitlist` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
joinWaitlist(vars: JoinWaitlistVariables): MutationPromise<JoinWaitlistData, JoinWaitlistVariables>;

interface JoinWaitlistRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: JoinWaitlistVariables): MutationRef<JoinWaitlistData, JoinWaitlistVariables>;
}
export const joinWaitlistRef: JoinWaitlistRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
joinWaitlist(dc: DataConnect, vars: JoinWaitlistVariables): MutationPromise<JoinWaitlistData, JoinWaitlistVariables>;

interface JoinWaitlistRef {
  ...
  (dc: DataConnect, vars: JoinWaitlistVariables): MutationRef<JoinWaitlistData, JoinWaitlistVariables>;
}
export const joinWaitlistRef: JoinWaitlistRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the joinWaitlistRef:
```typescript
const name = joinWaitlistRef.operationName;
console.log(name);
```

### Variables
The `JoinWaitlist` mutation requires an argument of type `JoinWaitlistVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface JoinWaitlistVariables {
  catalogItemId: UUIDString;
  userId?: UUIDString | null;
  name: string;
  email: string;
  phone?: string | null;
}
```
### Return Type
Recall that executing the `JoinWaitlist` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `JoinWaitlistData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface JoinWaitlistData {
  waitlistEntry_insert: WaitlistEntry_Key;
}
```
### Using `JoinWaitlist`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, joinWaitlist, JoinWaitlistVariables } from '@dataconnect/generated';

// The `JoinWaitlist` mutation requires an argument of type `JoinWaitlistVariables`:
const joinWaitlistVars: JoinWaitlistVariables = {
  catalogItemId: ..., 
  userId: ..., // optional
  name: ..., 
  email: ..., 
  phone: ..., // optional
};

// Call the `joinWaitlist()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await joinWaitlist(joinWaitlistVars);
// Variables can be defined inline as well.
const { data } = await joinWaitlist({ catalogItemId: ..., userId: ..., name: ..., email: ..., phone: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await joinWaitlist(dataConnect, joinWaitlistVars);

console.log(data.waitlistEntry_insert);

// Or, you can use the `Promise` API.
joinWaitlist(joinWaitlistVars).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntry_insert);
});
```

### Using `JoinWaitlist`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, joinWaitlistRef, JoinWaitlistVariables } from '@dataconnect/generated';

// The `JoinWaitlist` mutation requires an argument of type `JoinWaitlistVariables`:
const joinWaitlistVars: JoinWaitlistVariables = {
  catalogItemId: ..., 
  userId: ..., // optional
  name: ..., 
  email: ..., 
  phone: ..., // optional
};

// Call the `joinWaitlistRef()` function to get a reference to the mutation.
const ref = joinWaitlistRef(joinWaitlistVars);
// Variables can be defined inline as well.
const ref = joinWaitlistRef({ catalogItemId: ..., userId: ..., name: ..., email: ..., phone: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = joinWaitlistRef(dataConnect, joinWaitlistVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.waitlistEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntry_insert);
});
```

## NotifyWaitlistEntry
You can execute the `NotifyWaitlistEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
notifyWaitlistEntry(vars: NotifyWaitlistEntryVariables): MutationPromise<NotifyWaitlistEntryData, NotifyWaitlistEntryVariables>;

interface NotifyWaitlistEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: NotifyWaitlistEntryVariables): MutationRef<NotifyWaitlistEntryData, NotifyWaitlistEntryVariables>;
}
export const notifyWaitlistEntryRef: NotifyWaitlistEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
notifyWaitlistEntry(dc: DataConnect, vars: NotifyWaitlistEntryVariables): MutationPromise<NotifyWaitlistEntryData, NotifyWaitlistEntryVariables>;

interface NotifyWaitlistEntryRef {
  ...
  (dc: DataConnect, vars: NotifyWaitlistEntryVariables): MutationRef<NotifyWaitlistEntryData, NotifyWaitlistEntryVariables>;
}
export const notifyWaitlistEntryRef: NotifyWaitlistEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the notifyWaitlistEntryRef:
```typescript
const name = notifyWaitlistEntryRef.operationName;
console.log(name);
```

### Variables
The `NotifyWaitlistEntry` mutation requires an argument of type `NotifyWaitlistEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface NotifyWaitlistEntryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `NotifyWaitlistEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `NotifyWaitlistEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface NotifyWaitlistEntryData {
  waitlistEntry_update?: WaitlistEntry_Key | null;
}
```
### Using `NotifyWaitlistEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, notifyWaitlistEntry, NotifyWaitlistEntryVariables } from '@dataconnect/generated';

// The `NotifyWaitlistEntry` mutation requires an argument of type `NotifyWaitlistEntryVariables`:
const notifyWaitlistEntryVars: NotifyWaitlistEntryVariables = {
  id: ..., 
};

// Call the `notifyWaitlistEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await notifyWaitlistEntry(notifyWaitlistEntryVars);
// Variables can be defined inline as well.
const { data } = await notifyWaitlistEntry({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await notifyWaitlistEntry(dataConnect, notifyWaitlistEntryVars);

console.log(data.waitlistEntry_update);

// Or, you can use the `Promise` API.
notifyWaitlistEntry(notifyWaitlistEntryVars).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntry_update);
});
```

### Using `NotifyWaitlistEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, notifyWaitlistEntryRef, NotifyWaitlistEntryVariables } from '@dataconnect/generated';

// The `NotifyWaitlistEntry` mutation requires an argument of type `NotifyWaitlistEntryVariables`:
const notifyWaitlistEntryVars: NotifyWaitlistEntryVariables = {
  id: ..., 
};

// Call the `notifyWaitlistEntryRef()` function to get a reference to the mutation.
const ref = notifyWaitlistEntryRef(notifyWaitlistEntryVars);
// Variables can be defined inline as well.
const ref = notifyWaitlistEntryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = notifyWaitlistEntryRef(dataConnect, notifyWaitlistEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.waitlistEntry_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntry_update);
});
```

## ExpireWaitlistEntry
You can execute the `ExpireWaitlistEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
expireWaitlistEntry(vars: ExpireWaitlistEntryVariables): MutationPromise<ExpireWaitlistEntryData, ExpireWaitlistEntryVariables>;

interface ExpireWaitlistEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ExpireWaitlistEntryVariables): MutationRef<ExpireWaitlistEntryData, ExpireWaitlistEntryVariables>;
}
export const expireWaitlistEntryRef: ExpireWaitlistEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
expireWaitlistEntry(dc: DataConnect, vars: ExpireWaitlistEntryVariables): MutationPromise<ExpireWaitlistEntryData, ExpireWaitlistEntryVariables>;

interface ExpireWaitlistEntryRef {
  ...
  (dc: DataConnect, vars: ExpireWaitlistEntryVariables): MutationRef<ExpireWaitlistEntryData, ExpireWaitlistEntryVariables>;
}
export const expireWaitlistEntryRef: ExpireWaitlistEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the expireWaitlistEntryRef:
```typescript
const name = expireWaitlistEntryRef.operationName;
console.log(name);
```

### Variables
The `ExpireWaitlistEntry` mutation requires an argument of type `ExpireWaitlistEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ExpireWaitlistEntryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `ExpireWaitlistEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ExpireWaitlistEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ExpireWaitlistEntryData {
  waitlistEntry_update?: WaitlistEntry_Key | null;
}
```
### Using `ExpireWaitlistEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, expireWaitlistEntry, ExpireWaitlistEntryVariables } from '@dataconnect/generated';

// The `ExpireWaitlistEntry` mutation requires an argument of type `ExpireWaitlistEntryVariables`:
const expireWaitlistEntryVars: ExpireWaitlistEntryVariables = {
  id: ..., 
};

// Call the `expireWaitlistEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await expireWaitlistEntry(expireWaitlistEntryVars);
// Variables can be defined inline as well.
const { data } = await expireWaitlistEntry({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await expireWaitlistEntry(dataConnect, expireWaitlistEntryVars);

console.log(data.waitlistEntry_update);

// Or, you can use the `Promise` API.
expireWaitlistEntry(expireWaitlistEntryVars).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntry_update);
});
```

### Using `ExpireWaitlistEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, expireWaitlistEntryRef, ExpireWaitlistEntryVariables } from '@dataconnect/generated';

// The `ExpireWaitlistEntry` mutation requires an argument of type `ExpireWaitlistEntryVariables`:
const expireWaitlistEntryVars: ExpireWaitlistEntryVariables = {
  id: ..., 
};

// Call the `expireWaitlistEntryRef()` function to get a reference to the mutation.
const ref = expireWaitlistEntryRef(expireWaitlistEntryVars);
// Variables can be defined inline as well.
const ref = expireWaitlistEntryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = expireWaitlistEntryRef(dataConnect, expireWaitlistEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.waitlistEntry_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntry_update);
});
```

## DeleteWaitlistEntry
You can execute the `DeleteWaitlistEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteWaitlistEntry(vars: DeleteWaitlistEntryVariables): MutationPromise<DeleteWaitlistEntryData, DeleteWaitlistEntryVariables>;

interface DeleteWaitlistEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWaitlistEntryVariables): MutationRef<DeleteWaitlistEntryData, DeleteWaitlistEntryVariables>;
}
export const deleteWaitlistEntryRef: DeleteWaitlistEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteWaitlistEntry(dc: DataConnect, vars: DeleteWaitlistEntryVariables): MutationPromise<DeleteWaitlistEntryData, DeleteWaitlistEntryVariables>;

interface DeleteWaitlistEntryRef {
  ...
  (dc: DataConnect, vars: DeleteWaitlistEntryVariables): MutationRef<DeleteWaitlistEntryData, DeleteWaitlistEntryVariables>;
}
export const deleteWaitlistEntryRef: DeleteWaitlistEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteWaitlistEntryRef:
```typescript
const name = deleteWaitlistEntryRef.operationName;
console.log(name);
```

### Variables
The `DeleteWaitlistEntry` mutation requires an argument of type `DeleteWaitlistEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteWaitlistEntryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteWaitlistEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteWaitlistEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteWaitlistEntryData {
  waitlistEntry_delete?: WaitlistEntry_Key | null;
}
```
### Using `DeleteWaitlistEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteWaitlistEntry, DeleteWaitlistEntryVariables } from '@dataconnect/generated';

// The `DeleteWaitlistEntry` mutation requires an argument of type `DeleteWaitlistEntryVariables`:
const deleteWaitlistEntryVars: DeleteWaitlistEntryVariables = {
  id: ..., 
};

// Call the `deleteWaitlistEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteWaitlistEntry(deleteWaitlistEntryVars);
// Variables can be defined inline as well.
const { data } = await deleteWaitlistEntry({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteWaitlistEntry(dataConnect, deleteWaitlistEntryVars);

console.log(data.waitlistEntry_delete);

// Or, you can use the `Promise` API.
deleteWaitlistEntry(deleteWaitlistEntryVars).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntry_delete);
});
```

### Using `DeleteWaitlistEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteWaitlistEntryRef, DeleteWaitlistEntryVariables } from '@dataconnect/generated';

// The `DeleteWaitlistEntry` mutation requires an argument of type `DeleteWaitlistEntryVariables`:
const deleteWaitlistEntryVars: DeleteWaitlistEntryVariables = {
  id: ..., 
};

// Call the `deleteWaitlistEntryRef()` function to get a reference to the mutation.
const ref = deleteWaitlistEntryRef(deleteWaitlistEntryVars);
// Variables can be defined inline as well.
const ref = deleteWaitlistEntryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteWaitlistEntryRef(dataConnect, deleteWaitlistEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.waitlistEntry_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.waitlistEntry_delete);
});
```

## CreateContactInquiry
You can execute the `CreateContactInquiry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createContactInquiry(vars: CreateContactInquiryVariables): MutationPromise<CreateContactInquiryData, CreateContactInquiryVariables>;

interface CreateContactInquiryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateContactInquiryVariables): MutationRef<CreateContactInquiryData, CreateContactInquiryVariables>;
}
export const createContactInquiryRef: CreateContactInquiryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createContactInquiry(dc: DataConnect, vars: CreateContactInquiryVariables): MutationPromise<CreateContactInquiryData, CreateContactInquiryVariables>;

interface CreateContactInquiryRef {
  ...
  (dc: DataConnect, vars: CreateContactInquiryVariables): MutationRef<CreateContactInquiryData, CreateContactInquiryVariables>;
}
export const createContactInquiryRef: CreateContactInquiryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createContactInquiryRef:
```typescript
const name = createContactInquiryRef.operationName;
console.log(name);
```

### Variables
The `CreateContactInquiry` mutation requires an argument of type `CreateContactInquiryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateContactInquiryVariables {
  referenceId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}
```
### Return Type
Recall that executing the `CreateContactInquiry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateContactInquiryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateContactInquiryData {
  contactInquiry_insert: ContactInquiry_Key;
}
```
### Using `CreateContactInquiry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createContactInquiry, CreateContactInquiryVariables } from '@dataconnect/generated';

// The `CreateContactInquiry` mutation requires an argument of type `CreateContactInquiryVariables`:
const createContactInquiryVars: CreateContactInquiryVariables = {
  referenceId: ..., 
  name: ..., 
  email: ..., 
  subject: ..., 
  message: ..., 
};

// Call the `createContactInquiry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createContactInquiry(createContactInquiryVars);
// Variables can be defined inline as well.
const { data } = await createContactInquiry({ referenceId: ..., name: ..., email: ..., subject: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createContactInquiry(dataConnect, createContactInquiryVars);

console.log(data.contactInquiry_insert);

// Or, you can use the `Promise` API.
createContactInquiry(createContactInquiryVars).then((response) => {
  const data = response.data;
  console.log(data.contactInquiry_insert);
});
```

### Using `CreateContactInquiry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createContactInquiryRef, CreateContactInquiryVariables } from '@dataconnect/generated';

// The `CreateContactInquiry` mutation requires an argument of type `CreateContactInquiryVariables`:
const createContactInquiryVars: CreateContactInquiryVariables = {
  referenceId: ..., 
  name: ..., 
  email: ..., 
  subject: ..., 
  message: ..., 
};

// Call the `createContactInquiryRef()` function to get a reference to the mutation.
const ref = createContactInquiryRef(createContactInquiryVars);
// Variables can be defined inline as well.
const ref = createContactInquiryRef({ referenceId: ..., name: ..., email: ..., subject: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createContactInquiryRef(dataConnect, createContactInquiryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.contactInquiry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.contactInquiry_insert);
});
```

## UpdateInquiryStatus
You can execute the `UpdateInquiryStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateInquiryStatus(vars: UpdateInquiryStatusVariables): MutationPromise<UpdateInquiryStatusData, UpdateInquiryStatusVariables>;

interface UpdateInquiryStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInquiryStatusVariables): MutationRef<UpdateInquiryStatusData, UpdateInquiryStatusVariables>;
}
export const updateInquiryStatusRef: UpdateInquiryStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInquiryStatus(dc: DataConnect, vars: UpdateInquiryStatusVariables): MutationPromise<UpdateInquiryStatusData, UpdateInquiryStatusVariables>;

interface UpdateInquiryStatusRef {
  ...
  (dc: DataConnect, vars: UpdateInquiryStatusVariables): MutationRef<UpdateInquiryStatusData, UpdateInquiryStatusVariables>;
}
export const updateInquiryStatusRef: UpdateInquiryStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInquiryStatusRef:
```typescript
const name = updateInquiryStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateInquiryStatus` mutation requires an argument of type `UpdateInquiryStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateInquiryStatusVariables {
  id: UUIDString;
  status: InquiryStatus;
  repliedById?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdateInquiryStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInquiryStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInquiryStatusData {
  contactInquiry_update?: ContactInquiry_Key | null;
}
```
### Using `UpdateInquiryStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInquiryStatus, UpdateInquiryStatusVariables } from '@dataconnect/generated';

// The `UpdateInquiryStatus` mutation requires an argument of type `UpdateInquiryStatusVariables`:
const updateInquiryStatusVars: UpdateInquiryStatusVariables = {
  id: ..., 
  status: ..., 
  repliedById: ..., // optional
};

// Call the `updateInquiryStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInquiryStatus(updateInquiryStatusVars);
// Variables can be defined inline as well.
const { data } = await updateInquiryStatus({ id: ..., status: ..., repliedById: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInquiryStatus(dataConnect, updateInquiryStatusVars);

console.log(data.contactInquiry_update);

// Or, you can use the `Promise` API.
updateInquiryStatus(updateInquiryStatusVars).then((response) => {
  const data = response.data;
  console.log(data.contactInquiry_update);
});
```

### Using `UpdateInquiryStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInquiryStatusRef, UpdateInquiryStatusVariables } from '@dataconnect/generated';

// The `UpdateInquiryStatus` mutation requires an argument of type `UpdateInquiryStatusVariables`:
const updateInquiryStatusVars: UpdateInquiryStatusVariables = {
  id: ..., 
  status: ..., 
  repliedById: ..., // optional
};

// Call the `updateInquiryStatusRef()` function to get a reference to the mutation.
const ref = updateInquiryStatusRef(updateInquiryStatusVars);
// Variables can be defined inline as well.
const ref = updateInquiryStatusRef({ id: ..., status: ..., repliedById: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInquiryStatusRef(dataConnect, updateInquiryStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.contactInquiry_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.contactInquiry_update);
});
```

## DeleteContactInquiry
You can execute the `DeleteContactInquiry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteContactInquiry(vars: DeleteContactInquiryVariables): MutationPromise<DeleteContactInquiryData, DeleteContactInquiryVariables>;

interface DeleteContactInquiryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteContactInquiryVariables): MutationRef<DeleteContactInquiryData, DeleteContactInquiryVariables>;
}
export const deleteContactInquiryRef: DeleteContactInquiryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteContactInquiry(dc: DataConnect, vars: DeleteContactInquiryVariables): MutationPromise<DeleteContactInquiryData, DeleteContactInquiryVariables>;

interface DeleteContactInquiryRef {
  ...
  (dc: DataConnect, vars: DeleteContactInquiryVariables): MutationRef<DeleteContactInquiryData, DeleteContactInquiryVariables>;
}
export const deleteContactInquiryRef: DeleteContactInquiryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteContactInquiryRef:
```typescript
const name = deleteContactInquiryRef.operationName;
console.log(name);
```

### Variables
The `DeleteContactInquiry` mutation requires an argument of type `DeleteContactInquiryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteContactInquiryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteContactInquiry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteContactInquiryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteContactInquiryData {
  contactInquiry_delete?: ContactInquiry_Key | null;
}
```
### Using `DeleteContactInquiry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteContactInquiry, DeleteContactInquiryVariables } from '@dataconnect/generated';

// The `DeleteContactInquiry` mutation requires an argument of type `DeleteContactInquiryVariables`:
const deleteContactInquiryVars: DeleteContactInquiryVariables = {
  id: ..., 
};

// Call the `deleteContactInquiry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteContactInquiry(deleteContactInquiryVars);
// Variables can be defined inline as well.
const { data } = await deleteContactInquiry({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteContactInquiry(dataConnect, deleteContactInquiryVars);

console.log(data.contactInquiry_delete);

// Or, you can use the `Promise` API.
deleteContactInquiry(deleteContactInquiryVars).then((response) => {
  const data = response.data;
  console.log(data.contactInquiry_delete);
});
```

### Using `DeleteContactInquiry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteContactInquiryRef, DeleteContactInquiryVariables } from '@dataconnect/generated';

// The `DeleteContactInquiry` mutation requires an argument of type `DeleteContactInquiryVariables`:
const deleteContactInquiryVars: DeleteContactInquiryVariables = {
  id: ..., 
};

// Call the `deleteContactInquiryRef()` function to get a reference to the mutation.
const ref = deleteContactInquiryRef(deleteContactInquiryVars);
// Variables can be defined inline as well.
const ref = deleteContactInquiryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteContactInquiryRef(dataConnect, deleteContactInquiryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.contactInquiry_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.contactInquiry_delete);
});
```

## CreateAuditLog
You can execute the `CreateAuditLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAuditLog(vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface CreateAuditLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
}
export const createAuditLogRef: CreateAuditLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAuditLog(dc: DataConnect, vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface CreateAuditLogRef {
  ...
  (dc: DataConnect, vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
}
export const createAuditLogRef: CreateAuditLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAuditLogRef:
```typescript
const name = createAuditLogRef.operationName;
console.log(name);
```

### Variables
The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateAuditLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAuditLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAuditLogData {
  auditLog_insert: AuditLog_Key;
}
```
### Using `CreateAuditLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAuditLog, CreateAuditLogVariables } from '@dataconnect/generated';

// The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`:
const createAuditLogVars: CreateAuditLogVariables = {
  userId: ..., // optional
  userName: ..., // optional
  userRole: ..., // optional
  action: ..., 
  details: ..., // optional
  page: ..., // optional
  ipAddress: ..., // optional
  userAgent: ..., // optional
};

// Call the `createAuditLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAuditLog(createAuditLogVars);
// Variables can be defined inline as well.
const { data } = await createAuditLog({ userId: ..., userName: ..., userRole: ..., action: ..., details: ..., page: ..., ipAddress: ..., userAgent: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAuditLog(dataConnect, createAuditLogVars);

console.log(data.auditLog_insert);

// Or, you can use the `Promise` API.
createAuditLog(createAuditLogVars).then((response) => {
  const data = response.data;
  console.log(data.auditLog_insert);
});
```

### Using `CreateAuditLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAuditLogRef, CreateAuditLogVariables } from '@dataconnect/generated';

// The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`:
const createAuditLogVars: CreateAuditLogVariables = {
  userId: ..., // optional
  userName: ..., // optional
  userRole: ..., // optional
  action: ..., 
  details: ..., // optional
  page: ..., // optional
  ipAddress: ..., // optional
  userAgent: ..., // optional
};

// Call the `createAuditLogRef()` function to get a reference to the mutation.
const ref = createAuditLogRef(createAuditLogVars);
// Variables can be defined inline as well.
const ref = createAuditLogRef({ userId: ..., userName: ..., userRole: ..., action: ..., details: ..., page: ..., ipAddress: ..., userAgent: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAuditLogRef(dataConnect, createAuditLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.auditLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLog_insert);
});
```

## SetUserTotpPending
You can execute the `SetUserTotpPending` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setUserTotpPending(vars: SetUserTotpPendingVariables): MutationPromise<SetUserTotpPendingData, SetUserTotpPendingVariables>;

interface SetUserTotpPendingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetUserTotpPendingVariables): MutationRef<SetUserTotpPendingData, SetUserTotpPendingVariables>;
}
export const setUserTotpPendingRef: SetUserTotpPendingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setUserTotpPending(dc: DataConnect, vars: SetUserTotpPendingVariables): MutationPromise<SetUserTotpPendingData, SetUserTotpPendingVariables>;

interface SetUserTotpPendingRef {
  ...
  (dc: DataConnect, vars: SetUserTotpPendingVariables): MutationRef<SetUserTotpPendingData, SetUserTotpPendingVariables>;
}
export const setUserTotpPendingRef: SetUserTotpPendingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setUserTotpPendingRef:
```typescript
const name = setUserTotpPendingRef.operationName;
console.log(name);
```

### Variables
The `SetUserTotpPending` mutation requires an argument of type `SetUserTotpPendingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetUserTotpPendingVariables {
  id: UUIDString;
  totpSecretEnc: string;
}
```
### Return Type
Recall that executing the `SetUserTotpPending` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetUserTotpPendingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetUserTotpPendingData {
  user_update?: User_Key | null;
}
```
### Using `SetUserTotpPending`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setUserTotpPending, SetUserTotpPendingVariables } from '@dataconnect/generated';

// The `SetUserTotpPending` mutation requires an argument of type `SetUserTotpPendingVariables`:
const setUserTotpPendingVars: SetUserTotpPendingVariables = {
  id: ..., 
  totpSecretEnc: ..., 
};

// Call the `setUserTotpPending()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setUserTotpPending(setUserTotpPendingVars);
// Variables can be defined inline as well.
const { data } = await setUserTotpPending({ id: ..., totpSecretEnc: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setUserTotpPending(dataConnect, setUserTotpPendingVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
setUserTotpPending(setUserTotpPendingVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `SetUserTotpPending`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setUserTotpPendingRef, SetUserTotpPendingVariables } from '@dataconnect/generated';

// The `SetUserTotpPending` mutation requires an argument of type `SetUserTotpPendingVariables`:
const setUserTotpPendingVars: SetUserTotpPendingVariables = {
  id: ..., 
  totpSecretEnc: ..., 
};

// Call the `setUserTotpPendingRef()` function to get a reference to the mutation.
const ref = setUserTotpPendingRef(setUserTotpPendingVars);
// Variables can be defined inline as well.
const ref = setUserTotpPendingRef({ id: ..., totpSecretEnc: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setUserTotpPendingRef(dataConnect, setUserTotpPendingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## ConfirmUserTotpEnrollment
You can execute the `ConfirmUserTotpEnrollment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
confirmUserTotpEnrollment(vars: ConfirmUserTotpEnrollmentVariables): MutationPromise<ConfirmUserTotpEnrollmentData, ConfirmUserTotpEnrollmentVariables>;

interface ConfirmUserTotpEnrollmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConfirmUserTotpEnrollmentVariables): MutationRef<ConfirmUserTotpEnrollmentData, ConfirmUserTotpEnrollmentVariables>;
}
export const confirmUserTotpEnrollmentRef: ConfirmUserTotpEnrollmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
confirmUserTotpEnrollment(dc: DataConnect, vars: ConfirmUserTotpEnrollmentVariables): MutationPromise<ConfirmUserTotpEnrollmentData, ConfirmUserTotpEnrollmentVariables>;

interface ConfirmUserTotpEnrollmentRef {
  ...
  (dc: DataConnect, vars: ConfirmUserTotpEnrollmentVariables): MutationRef<ConfirmUserTotpEnrollmentData, ConfirmUserTotpEnrollmentVariables>;
}
export const confirmUserTotpEnrollmentRef: ConfirmUserTotpEnrollmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the confirmUserTotpEnrollmentRef:
```typescript
const name = confirmUserTotpEnrollmentRef.operationName;
console.log(name);
```

### Variables
The `ConfirmUserTotpEnrollment` mutation requires an argument of type `ConfirmUserTotpEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ConfirmUserTotpEnrollmentVariables {
  id: UUIDString;
  totpBackupCodesEnc: string;
}
```
### Return Type
Recall that executing the `ConfirmUserTotpEnrollment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ConfirmUserTotpEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ConfirmUserTotpEnrollmentData {
  user_update?: User_Key | null;
}
```
### Using `ConfirmUserTotpEnrollment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, confirmUserTotpEnrollment, ConfirmUserTotpEnrollmentVariables } from '@dataconnect/generated';

// The `ConfirmUserTotpEnrollment` mutation requires an argument of type `ConfirmUserTotpEnrollmentVariables`:
const confirmUserTotpEnrollmentVars: ConfirmUserTotpEnrollmentVariables = {
  id: ..., 
  totpBackupCodesEnc: ..., 
};

// Call the `confirmUserTotpEnrollment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await confirmUserTotpEnrollment(confirmUserTotpEnrollmentVars);
// Variables can be defined inline as well.
const { data } = await confirmUserTotpEnrollment({ id: ..., totpBackupCodesEnc: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await confirmUserTotpEnrollment(dataConnect, confirmUserTotpEnrollmentVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
confirmUserTotpEnrollment(confirmUserTotpEnrollmentVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `ConfirmUserTotpEnrollment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, confirmUserTotpEnrollmentRef, ConfirmUserTotpEnrollmentVariables } from '@dataconnect/generated';

// The `ConfirmUserTotpEnrollment` mutation requires an argument of type `ConfirmUserTotpEnrollmentVariables`:
const confirmUserTotpEnrollmentVars: ConfirmUserTotpEnrollmentVariables = {
  id: ..., 
  totpBackupCodesEnc: ..., 
};

// Call the `confirmUserTotpEnrollmentRef()` function to get a reference to the mutation.
const ref = confirmUserTotpEnrollmentRef(confirmUserTotpEnrollmentVars);
// Variables can be defined inline as well.
const ref = confirmUserTotpEnrollmentRef({ id: ..., totpBackupCodesEnc: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = confirmUserTotpEnrollmentRef(dataConnect, confirmUserTotpEnrollmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## RecordTotpVerification
You can execute the `RecordTotpVerification` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recordTotpVerification(vars: RecordTotpVerificationVariables): MutationPromise<RecordTotpVerificationData, RecordTotpVerificationVariables>;

interface RecordTotpVerificationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordTotpVerificationVariables): MutationRef<RecordTotpVerificationData, RecordTotpVerificationVariables>;
}
export const recordTotpVerificationRef: RecordTotpVerificationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordTotpVerification(dc: DataConnect, vars: RecordTotpVerificationVariables): MutationPromise<RecordTotpVerificationData, RecordTotpVerificationVariables>;

interface RecordTotpVerificationRef {
  ...
  (dc: DataConnect, vars: RecordTotpVerificationVariables): MutationRef<RecordTotpVerificationData, RecordTotpVerificationVariables>;
}
export const recordTotpVerificationRef: RecordTotpVerificationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordTotpVerificationRef:
```typescript
const name = recordTotpVerificationRef.operationName;
console.log(name);
```

### Variables
The `RecordTotpVerification` mutation requires an argument of type `RecordTotpVerificationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordTotpVerificationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `RecordTotpVerification` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordTotpVerificationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordTotpVerificationData {
  user_update?: User_Key | null;
}
```
### Using `RecordTotpVerification`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordTotpVerification, RecordTotpVerificationVariables } from '@dataconnect/generated';

// The `RecordTotpVerification` mutation requires an argument of type `RecordTotpVerificationVariables`:
const recordTotpVerificationVars: RecordTotpVerificationVariables = {
  id: ..., 
};

// Call the `recordTotpVerification()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordTotpVerification(recordTotpVerificationVars);
// Variables can be defined inline as well.
const { data } = await recordTotpVerification({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordTotpVerification(dataConnect, recordTotpVerificationVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
recordTotpVerification(recordTotpVerificationVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `RecordTotpVerification`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordTotpVerificationRef, RecordTotpVerificationVariables } from '@dataconnect/generated';

// The `RecordTotpVerification` mutation requires an argument of type `RecordTotpVerificationVariables`:
const recordTotpVerificationVars: RecordTotpVerificationVariables = {
  id: ..., 
};

// Call the `recordTotpVerificationRef()` function to get a reference to the mutation.
const ref = recordTotpVerificationRef(recordTotpVerificationVars);
// Variables can be defined inline as well.
const ref = recordTotpVerificationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordTotpVerificationRef(dataConnect, recordTotpVerificationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## UpdateUserTotpBackupCodes
You can execute the `UpdateUserTotpBackupCodes` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserTotpBackupCodes(vars: UpdateUserTotpBackupCodesVariables): MutationPromise<UpdateUserTotpBackupCodesData, UpdateUserTotpBackupCodesVariables>;

interface UpdateUserTotpBackupCodesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserTotpBackupCodesVariables): MutationRef<UpdateUserTotpBackupCodesData, UpdateUserTotpBackupCodesVariables>;
}
export const updateUserTotpBackupCodesRef: UpdateUserTotpBackupCodesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserTotpBackupCodes(dc: DataConnect, vars: UpdateUserTotpBackupCodesVariables): MutationPromise<UpdateUserTotpBackupCodesData, UpdateUserTotpBackupCodesVariables>;

interface UpdateUserTotpBackupCodesRef {
  ...
  (dc: DataConnect, vars: UpdateUserTotpBackupCodesVariables): MutationRef<UpdateUserTotpBackupCodesData, UpdateUserTotpBackupCodesVariables>;
}
export const updateUserTotpBackupCodesRef: UpdateUserTotpBackupCodesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserTotpBackupCodesRef:
```typescript
const name = updateUserTotpBackupCodesRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserTotpBackupCodes` mutation requires an argument of type `UpdateUserTotpBackupCodesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserTotpBackupCodesVariables {
  id: UUIDString;
  totpBackupCodesEnc: string;
}
```
### Return Type
Recall that executing the `UpdateUserTotpBackupCodes` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserTotpBackupCodesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserTotpBackupCodesData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserTotpBackupCodes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserTotpBackupCodes, UpdateUserTotpBackupCodesVariables } from '@dataconnect/generated';

// The `UpdateUserTotpBackupCodes` mutation requires an argument of type `UpdateUserTotpBackupCodesVariables`:
const updateUserTotpBackupCodesVars: UpdateUserTotpBackupCodesVariables = {
  id: ..., 
  totpBackupCodesEnc: ..., 
};

// Call the `updateUserTotpBackupCodes()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserTotpBackupCodes(updateUserTotpBackupCodesVars);
// Variables can be defined inline as well.
const { data } = await updateUserTotpBackupCodes({ id: ..., totpBackupCodesEnc: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserTotpBackupCodes(dataConnect, updateUserTotpBackupCodesVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserTotpBackupCodes(updateUserTotpBackupCodesVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserTotpBackupCodes`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserTotpBackupCodesRef, UpdateUserTotpBackupCodesVariables } from '@dataconnect/generated';

// The `UpdateUserTotpBackupCodes` mutation requires an argument of type `UpdateUserTotpBackupCodesVariables`:
const updateUserTotpBackupCodesVars: UpdateUserTotpBackupCodesVariables = {
  id: ..., 
  totpBackupCodesEnc: ..., 
};

// Call the `updateUserTotpBackupCodesRef()` function to get a reference to the mutation.
const ref = updateUserTotpBackupCodesRef(updateUserTotpBackupCodesVars);
// Variables can be defined inline as well.
const ref = updateUserTotpBackupCodesRef({ id: ..., totpBackupCodesEnc: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserTotpBackupCodesRef(dataConnect, updateUserTotpBackupCodesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DisableUserTotp
You can execute the `DisableUserTotp` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
disableUserTotp(vars: DisableUserTotpVariables): MutationPromise<DisableUserTotpData, DisableUserTotpVariables>;

interface DisableUserTotpRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DisableUserTotpVariables): MutationRef<DisableUserTotpData, DisableUserTotpVariables>;
}
export const disableUserTotpRef: DisableUserTotpRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
disableUserTotp(dc: DataConnect, vars: DisableUserTotpVariables): MutationPromise<DisableUserTotpData, DisableUserTotpVariables>;

interface DisableUserTotpRef {
  ...
  (dc: DataConnect, vars: DisableUserTotpVariables): MutationRef<DisableUserTotpData, DisableUserTotpVariables>;
}
export const disableUserTotpRef: DisableUserTotpRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the disableUserTotpRef:
```typescript
const name = disableUserTotpRef.operationName;
console.log(name);
```

### Variables
The `DisableUserTotp` mutation requires an argument of type `DisableUserTotpVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DisableUserTotpVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DisableUserTotp` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DisableUserTotpData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DisableUserTotpData {
  user_update?: User_Key | null;
}
```
### Using `DisableUserTotp`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, disableUserTotp, DisableUserTotpVariables } from '@dataconnect/generated';

// The `DisableUserTotp` mutation requires an argument of type `DisableUserTotpVariables`:
const disableUserTotpVars: DisableUserTotpVariables = {
  id: ..., 
};

// Call the `disableUserTotp()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await disableUserTotp(disableUserTotpVars);
// Variables can be defined inline as well.
const { data } = await disableUserTotp({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await disableUserTotp(dataConnect, disableUserTotpVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
disableUserTotp(disableUserTotpVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `DisableUserTotp`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, disableUserTotpRef, DisableUserTotpVariables } from '@dataconnect/generated';

// The `DisableUserTotp` mutation requires an argument of type `DisableUserTotpVariables`:
const disableUserTotpVars: DisableUserTotpVariables = {
  id: ..., 
};

// Call the `disableUserTotpRef()` function to get a reference to the mutation.
const ref = disableUserTotpRef(disableUserTotpVars);
// Variables can be defined inline as well.
const ref = disableUserTotpRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = disableUserTotpRef(dataConnect, disableUserTotpVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

