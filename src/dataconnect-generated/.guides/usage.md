# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createOrganisation, updateOrgStatus, updateOrganisation, deleteOrganisation, createOrgRequest, approveOrgRequest, rejectOrgRequest, deleteOrgRequest, createUser, updateUserStatus } from '@dataconnect/generated';


// Operation CreateOrganisation:  For variables, look at type CreateOrganisationVars in ../index.d.ts
const { data } = await CreateOrganisation(dataConnect, createOrganisationVars);

// Operation UpdateOrgStatus:  For variables, look at type UpdateOrgStatusVars in ../index.d.ts
const { data } = await UpdateOrgStatus(dataConnect, updateOrgStatusVars);

// Operation UpdateOrganisation:  For variables, look at type UpdateOrganisationVars in ../index.d.ts
const { data } = await UpdateOrganisation(dataConnect, updateOrganisationVars);

// Operation DeleteOrganisation:  For variables, look at type DeleteOrganisationVars in ../index.d.ts
const { data } = await DeleteOrganisation(dataConnect, deleteOrganisationVars);

// Operation CreateOrgRequest:  For variables, look at type CreateOrgRequestVars in ../index.d.ts
const { data } = await CreateOrgRequest(dataConnect, createOrgRequestVars);

// Operation ApproveOrgRequest:  For variables, look at type ApproveOrgRequestVars in ../index.d.ts
const { data } = await ApproveOrgRequest(dataConnect, approveOrgRequestVars);

// Operation RejectOrgRequest:  For variables, look at type RejectOrgRequestVars in ../index.d.ts
const { data } = await RejectOrgRequest(dataConnect, rejectOrgRequestVars);

// Operation DeleteOrgRequest:  For variables, look at type DeleteOrgRequestVars in ../index.d.ts
const { data } = await DeleteOrgRequest(dataConnect, deleteOrgRequestVars);

// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateUserStatus:  For variables, look at type UpdateUserStatusVars in ../index.d.ts
const { data } = await UpdateUserStatus(dataConnect, updateUserStatusVars);


```