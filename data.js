'use strict';
const EC_DATA = (() => {
  const KEY = 'ec_data';

  const DEFAULTS = {
    orgRequests: [
      { id:'REQ-001', orgName:'Ironclad Logistics', sector:'Logistics', regId:'REG-4421-IL', contactName:'Bongani Dube', contactEmail:'bongani@ironclad.co.za', domain:'ironclad.co.za', submittedAt:'2026-06-08', status:'pending', notes:'' },
      { id:'REQ-002', orgName:'Stonewall Construction', sector:'Construction', regId:'REG-0081-SC', contactName:'Priya Naidoo', contactEmail:'priya@stonewall.co.za', domain:'stonewall.co.za', submittedAt:'2026-06-09', status:'pending', notes:'' },
      { id:'REQ-003', orgName:'Southern Bore Co.', sector:'Mining & Extraction', regId:'REG-3310-SB', contactName:'Andile Khumalo', contactEmail:'andile@southernbore.co.za', domain:'southernbore.co.za', submittedAt:'2026-06-10', status:'pending', notes:'' },
    ],
    orgs: [
      { id:'00000001-0000-0000-0000-000000000001', name:'Vanguard Heavies Ltd.', sector:'Construction', regId:'VH-9921-X', contactEmail:'ops@vanguard.io', domain:'vanguard.io', createdAt:'2026-01-15', status:'active' },
      { id:'00000001-0000-0000-0000-000000000002', name:'Oceanic Rigging Corp', sector:'Maritime Logistics', regId:'ORC-5542-A', contactEmail:'fleet@oceanic.com', domain:'oceanic.com', createdAt:'2026-02-20', status:'active' },
      { id:'00000001-0000-0000-0000-000000000003', name:'Aether Power Grid', sector:'Energy & Utilities', regId:'APG-8810-Z', contactEmail:'grid@aether.org', domain:'aether.org', createdAt:'2026-03-05', status:'active' },
      { id:'00000001-0000-0000-0000-000000000004', name:'TerraForming Inc', sector:'Agricultural', regId:'TFI-0021-M', contactEmail:'admin@terraform.co', domain:'terraform.co', createdAt:'2026-04-11', status:'active' },
      { id:'624ad6b5-3870-43d4-ab35-3d33a1c26d05', name:'Ironclad Logistics', sector:'Logistics & Transport', regId:'ICL-7703-L', contactEmail:'ops@ironclad.co.za', domain:'ironclad.co.za', createdAt:'2026-05-01', status:'active' },
    ],
    users: [
      { id:'USR-001', name:'Alex Carter',     email:'admin@equipcore.com',   role:'admin',  orgId:null,                                      createdAt:'2026-01-01', status:'active' },
      { id:'USR-010', name:'Sipho Ndlovu',    email:'admin@vanguard.io',    role:'admin',  orgId:'00000001-0000-0000-0000-000000000001', createdAt:'2026-01-15', status:'active' },
      { id:'USR-011', name:'Lerato Molefe',   email:'user@vanguard.io',     role:'user',   orgId:'00000001-0000-0000-0000-000000000001', createdAt:'2026-01-15', status:'active' },
      { id:'USR-012', name:'Thabo Kgosi',     email:'driver@vanguard.io',   role:'driver', orgId:'00000001-0000-0000-0000-000000000001', createdAt:'2026-01-15', status:'active' },
      { id:'USR-020', name:'Morgan Blake',    email:'admin@oceanic.com',    role:'admin',  orgId:'00000001-0000-0000-0000-000000000002', createdAt:'2026-02-20', status:'active' },
      { id:'USR-021', name:'Taylor Osei',     email:'user@oceanic.com',     role:'user',   orgId:'00000001-0000-0000-0000-000000000002', createdAt:'2026-02-20', status:'active' },
      { id:'USR-022', name:'Casey Drummond',  email:'driver@oceanic.com',   role:'driver', orgId:'00000001-0000-0000-0000-000000000002', createdAt:'2026-02-20', status:'active' },
      { id:'USR-030', name:'Zanele Mthembu',  email:'admin@aether.org',     role:'admin',  orgId:'00000001-0000-0000-0000-000000000003', createdAt:'2026-03-05', status:'active' },
      { id:'USR-031', name:'Pieter van Wyk',  email:'user@aether.org',      role:'user',   orgId:'00000001-0000-0000-0000-000000000003', createdAt:'2026-03-05', status:'active' },
      { id:'USR-032', name:'Mandla Zulu',     email:'driver@aether.org',    role:'driver', orgId:'00000001-0000-0000-0000-000000000003', createdAt:'2026-03-05', status:'active' },
      { id:'USR-040', name:'Fatima Patel',    email:'admin@terraform.co',   role:'admin',  orgId:'00000001-0000-0000-0000-000000000004', createdAt:'2026-04-11', status:'active' },
      { id:'USR-041', name:'David Botha',     email:'user@terraform.co',    role:'user',   orgId:'00000001-0000-0000-0000-000000000004', createdAt:'2026-04-11', status:'active' },
      { id:'USR-042', name:'Nkosi Dlamini',   email:'driver@terraform.co',  role:'driver', orgId:'00000001-0000-0000-0000-000000000004', createdAt:'2026-04-11', status:'active' },
      { id:'USR-050', name:'Bongani Dube',    email:'admin@ironclad.co.za', role:'admin',  orgId:'624ad6b5-3870-43d4-ab35-3d33a1c26d05', createdAt:'2026-05-01', status:'active' },
      { id:'USR-051', name:'Amahle Sithole',  email:'user@ironclad.co.za',  role:'user',   orgId:'624ad6b5-3870-43d4-ab35-3d33a1c26d05', createdAt:'2026-05-01', status:'active' },
      { id:'USR-052', name:'Johan Pretorius', email:'driver@ironclad.co.za',role:'driver', orgId:'624ad6b5-3870-43d4-ab35-3d33a1c26d05', createdAt:'2026-05-01', status:'active' },
    ],
    vehicles: [
      { id:'00000003-0000-0000-0000-000000000001', orgId:'00000001-0000-0000-0000-000000000001', make:'Caterpillar', model:'390F Excavator',    year:2022, type:'Excavator',            regPlate:'CAT-442-B', km:42000,  serviceIntervalKm:10000, nextServiceKm:50000,  status:'on_rent',     addedAt:'2024-03-10' },
      { id:'00000003-0000-0000-0000-000000000002', orgId:'00000001-0000-0000-0000-000000000001', make:'Volvo',       model:'A60H Hauler',       year:2021, type:'Articulated Hauler',   regPlate:'VOL-991-X', km:78500,  serviceIntervalKm:15000, nextServiceKm:80000,  status:'available',   addedAt:'2024-01-22' },
      { id:'00000003-0000-0000-0000-000000000003', orgId:'00000001-0000-0000-0000-000000000001', make:'Komatsu',     model:'WA470 Loader',      year:2023, type:'Wheel Loader',         regPlate:'KOM-005-A', km:12000,  serviceIntervalKm:10000, nextServiceKm:20000,  status:'on_rent',     addedAt:'2025-06-14' },
      { id:'00000003-0000-0000-0000-000000000004', orgId:'00000001-0000-0000-0000-000000000001', make:'Liebherr',    model:'LTM 1300',          year:2020, type:'Mobile Crane',         regPlate:'LIE-300-C', km:31000,  serviceIntervalKm:10000, nextServiceKm:40000,  status:'available',   addedAt:'2023-05-01' },
      { id:'00000003-0000-0000-0000-000000000005', orgId:'00000001-0000-0000-0000-000000000002', make:'Kalmar',      model:'DRF450 Reachstacker',year:2021, type:'Container Reachstacker',regPlate:'KAL-450-R',km:18000,  serviceIntervalKm:8000,  nextServiceKm:24000,  status:'available',   addedAt:'2024-02-10' },
      { id:'00000003-0000-0000-0000-000000000006', orgId:'00000001-0000-0000-0000-000000000002', make:'Sandvik',     model:'DD421 Drill Rig',   year:2022, type:'Drill Rig',            regPlate:'SDV-330-D', km:55000,  serviceIntervalKm:10000, nextServiceKm:60000,  status:'on_rent',     addedAt:'2024-07-19' },
      { id:'00000003-0000-0000-0000-000000000007', orgId:'00000001-0000-0000-0000-000000000002', make:'Scania',      model:'R500 Heavy Truck',  year:2022, type:'Heavy Truck',          regPlate:'SCN-770-P', km:97200,  serviceIntervalKm:20000, nextServiceKm:100000, status:'available',   addedAt:'2023-11-08' },
      { id:'00000003-0000-0000-0000-000000000008', orgId:'00000001-0000-0000-0000-000000000003', make:'Aggreko',     model:'500kVA Generator',  year:2023, type:'Generator',            regPlate:'AGG-500-G', km:0,      serviceIntervalKm:5000,  nextServiceKm:5000,   status:'available',   addedAt:'2025-01-10' },
      { id:'00000003-0000-0000-0000-000000000009', orgId:'00000001-0000-0000-0000-000000000003', make:'Atlas Copco', model:'ROC F9C Drill',     year:2021, type:'Drill Rig',            regPlate:'ACO-808-F', km:34000,  serviceIntervalKm:10000, nextServiceKm:40000,  status:'on_rent',     addedAt:'2024-09-18' },
      { id:'00000003-0000-0000-0000-000000000010', orgId:'00000001-0000-0000-0000-000000000003', make:'Toyota',      model:'Land Cruiser 79',   year:2024, type:'Pickup Truck',         regPlate:'TLC-079-U', km:5200,   serviceIntervalKm:15000, nextServiceKm:15000,  status:'available',   addedAt:'2025-03-20' },
      { id:'00000003-0000-0000-0000-000000000011', orgId:'00000001-0000-0000-0000-000000000004', make:'JCB',         model:'3CX Eco Backhoe',   year:2023, type:'Backhoe Loader',       regPlate:'JCB-121-R', km:8000,   serviceIntervalKm:5000,  nextServiceKm:10000,  status:'maintenance', addedAt:'2025-01-30' },
      { id:'00000003-0000-0000-0000-000000000012', orgId:'00000001-0000-0000-0000-000000000004', make:'John Deere',  model:'WL56 Loader',       year:2022, type:'Wheel Loader',         regPlate:'JDR-560-L', km:22500,  serviceIntervalKm:10000, nextServiceKm:30000,  status:'available',   addedAt:'2024-06-01' },
      { id:'00000003-0000-0000-0000-000000000013', orgId:'00000001-0000-0000-0000-000000000004', make:'Isuzu',       model:'FVZ 1400 Tipper',   year:2021, type:'Tipper Truck',         regPlate:'ISZ-140-T', km:64000,  serviceIntervalKm:20000, nextServiceKm:70000,  status:'on_rent',     addedAt:'2023-08-15' },
      { id:'00000003-0000-0000-0000-000000000014', orgId:'624ad6b5-3870-43d4-ab35-3d33a1c26d05', make:'Volvo',       model:'FH16 Globetrotter', year:2023, type:'Heavy Truck',          regPlate:'VLV-160-H', km:45000,  serviceIntervalKm:25000, nextServiceKm:50000,  status:'available',   addedAt:'2024-04-01' },
      { id:'00000003-0000-0000-0000-000000000015', orgId:'624ad6b5-3870-43d4-ab35-3d33a1c26d05', make:'Mercedes-Benz',model:'Actros 2645',      year:2022, type:'Heavy Truck',          regPlate:'MBZ-264-A', km:112000, serviceIntervalKm:25000, nextServiceKm:125000, status:'on_rent',     addedAt:'2023-09-10' },
      { id:'00000003-0000-0000-0000-000000000016', orgId:'624ad6b5-3870-43d4-ab35-3d33a1c26d05', make:'MAN',         model:'TGS 26.480',        year:2023, type:'Heavy Truck',          regPlate:'MAN-480-S', km:38000,  serviceIntervalKm:20000, nextServiceKm:40000,  status:'available',   addedAt:'2024-01-20' },
      { id:'00000003-0000-0000-0000-000000000017', orgId:'624ad6b5-3870-43d4-ab35-3d33a1c26d05', make:'Toyota',      model:'Hino 500',          year:2021, type:'Rigid Truck',          regPlate:'HIN-500-R', km:88000,  serviceIntervalKm:15000, nextServiceKm:90000,  status:'maintenance', addedAt:'2023-03-05' },
    ],
    maintenanceQueries: [
      { id:'MNT-001', vehicleId:'VEH-003', vehicleLabel:'Komatsu WA470 · KOM-005-A',         type:'driver_issue', description:'Warning light on dashboard — oil pressure critically low. Noticed at start of shift. Vehicle was still driven to site.',               priority:'high',     status:'open',        loggedBy:'Sam Rivera',     loggedAt:'2026-06-09T07:22:00', resolvedAt:null },
      { id:'MNT-002', vehicleId:'VEH-001', vehicleLabel:'Cat 390F Excavator · CAT-442-B',    type:'roadside',     description:'Vehicle broke down on N1 northbound near Midrand. Engine overheating. Driver stranded. Tow required. Contact: 082 444 9900.',         priority:'critical', status:'in_progress', loggedBy:'Jordan Mills',    loggedAt:'2026-06-08T14:45:00', resolvedAt:null },
      { id:'MNT-003', vehicleId:'VEH-004', vehicleLabel:'Scania R500 · SCN-770-P',           type:'tyres',        description:'Front left and rear right tyres showing significant tread wear. Below legal minimum. Need replacement before next deployment.',       priority:'high',     status:'open',        loggedBy:'Admin',           loggedAt:'2026-06-07T09:10:00', resolvedAt:null },
      { id:'MNT-004', vehicleId:'VEH-005', vehicleLabel:'JCB 3CX Eco · JCB-121-R',          type:'windscreen',   description:'Large crack running across windscreen from passenger side — result of debris impact on site. Safety risk. Vehicle grounded.',          priority:'high',     status:'open',        loggedBy:'Sam Rivera',     loggedAt:'2026-06-06T16:30:00', resolvedAt:null },
      { id:'MNT-005', vehicleId:'VEH-002', vehicleLabel:'Volvo A60H Hauler · VOL-991-X',     type:'service',      description:'Approaching 80,000km service milestone. Oil, filters, brake pads and full inspection required. Book in with service centre.',          priority:'medium',   status:'open',        loggedBy:'Admin',           loggedAt:'2026-06-05T08:00:00', resolvedAt:null },
      { id:'MNT-006', vehicleId:'VEH-004', vehicleLabel:'Scania R500 · SCN-770-P',           type:'general',      description:'Air conditioning unit not functioning. Compressor may be faulty. Driver comfort issue on long-haul routes.',                           priority:'low',      status:'open',        loggedBy:'Casey Drummond',  loggedAt:'2026-06-04T11:20:00', resolvedAt:null },
      { id:'MNT-007', vehicleId:'VEH-007', vehicleLabel:'Liebherr R 9400 · LIB-990-R',       type:'driver_issue', description:'Hydraulic arm making grinding noise when extended past 80%. Suspect bearing wear. Operator has flagged this for second consecutive shift.', priority:'medium',  status:'open',        loggedBy:'Jordan Mills',    loggedAt:'2026-06-03T14:05:00', resolvedAt:null },
      { id:'MNT-008', vehicleId:'VEH-006', vehicleLabel:'Sandvik DD421 Drill Rig · SDV-330-D',type:'tyres',       description:'All four rear tyres replaced as per scheduled rotation. Completed by on-site workshop. Disposal confirmed.',                          priority:'low',      status:'resolved',    loggedBy:'Admin',           loggedAt:'2026-05-28T09:00:00', resolvedAt:'2026-06-01T15:30:00' },
    ],
    rentals: [
      { id:'RNT-4821', equipment:'Cat 390F Excavator',       client:'Ngozi Mining Co.',    org:'ORG-001', startDate:'2026-05-28', returnDate:'2026-06-12', value:22400, status:'active' },
      { id:'RNT-4819', equipment:'Komatsu WA470',            client:'Atlas Quarry Ltd',    org:'ORG-003', startDate:'2026-05-20', returnDate:'2026-06-01', value:18900, status:'overdue' },
      { id:'RNT-4815', equipment:'Sandvik DD421 Drill',      client:'Cape Minerals SA',    org:'ORG-002', startDate:'2026-06-01', returnDate:'2026-06-20', value:34000, status:'active' },
      { id:'RNT-4810', equipment:'Volvo A40G Truck',         client:'Stonewall Const.',    org:'ORG-004', startDate:'2026-06-05', returnDate:'2026-06-30', value:41200, status:'pending' },
      { id:'RNT-4808', equipment:'Atlas Copco ROC F9C',      client:'Iron Peak Corp',      org:'ORG-001', startDate:'2026-06-03', returnDate:'2026-06-17', value:28600, status:'active' },
      { id:'RNT-4802', equipment:'Liebherr R 9400',          client:'DeepRock Mining',     org:'ORG-002', startDate:'2026-05-10', returnDate:'2026-05-28', value:52000, status:'complete' },
      { id:'RNT-4798', equipment:'JCB 3CX Backhoe',         client:'Horizon Build Ltd',   org:'ORG-003', startDate:'2026-05-15', returnDate:'2026-05-30', value:9800,  status:'overdue' },
      { id:'RNT-4795', equipment:'Epiroc SmartROC D65',      client:'Terra Bore Inc.',     org:'ORG-004', startDate:'2026-06-08', returnDate:'2026-06-25', value:31500, status:'pending' },
    ],
  };

  function load() {
    try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch (_) {}
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
  function save(db) { localStorage.setItem(KEY, JSON.stringify(db)); }
  function nextId(prefix, list) {
    const nums = list.map(x => parseInt((x.id||'').replace(/\D/g,''),10)).filter(Boolean);
    return `${prefix}-${String(nums.length ? Math.max(...nums)+1 : 1).padStart(3,'0')}`;
  }
  function now() { return new Date().toISOString(); }
  function today() { return now().slice(0,10); }

  let _orgScope = null;

  return {
    setOrgScope(orgId) { _orgScope = orgId || null; },
    getOrgScope()      { return _orgScope; },
    // Org Requests
    getOrgRequests()   { return load().orgRequests; },
    addOrgRequest(data) {
      const db=load(), req={...data, id:nextId('REQ',db.orgRequests), submittedAt:today(), status:'pending', notes:''};
      db.orgRequests.push(req); save(db); return req;
    },
    approveOrgRequest(id, notes='') {
      const db=load(), req=db.orgRequests.find(r=>r.id===id); if(!req) return null;
      req.status='approved'; req.notes=notes;
      const org={id:nextId('ORG',db.orgs), name:req.orgName, sector:req.sector, regId:req.regId, contactEmail:req.contactEmail, domain:req.domain, createdAt:today(), status:'active'};
      db.orgs.push(org); save(db); return org;
    },
    rejectOrgRequest(id, notes='') {
      const db=load(), req=db.orgRequests.find(r=>r.id===id);
      if(req){req.status='rejected'; req.notes=notes; save(db);}
    },

    // Orgs
    getOrgs()     { return load().orgs; },
    getOrg(id)    { return load().orgs.find(o=>o.id===id); },
    suspendOrg(id){ const db=load(),o=db.orgs.find(o=>o.id===id); if(o){o.status='suspended';save(db);} },
    reinstateOrg(id){ const db=load(),o=db.orgs.find(o=>o.id===id); if(o){o.status='active';save(db);} },

    // Users
    getUsers()          { return load().users; },
    getUsersByOrg(orgId){ return load().users.filter(u=>u.orgId===orgId); },
    addUser(data) {
      const db=load(), user={...data, id:nextId('USR',db.users), createdAt:today(), status:'active'};
      db.users.push(user); save(db); return user;
    },
    toggleUserStatus(id) {
      const db=load(), u=db.users.find(u=>u.id===id);
      if(u){u.status=u.status==='active'?'inactive':'active'; save(db);}
    },

    // Vehicles
    getVehicles() { const v = load().vehicles; return _orgScope ? v.filter(x => x.orgId === _orgScope) : v; },
    addVehicle(data) {
      const db=load(), v={...data, orgId: data.orgId || _orgScope || null, id:nextId('VEH',db.vehicles), addedAt:today()};
      db.vehicles.push(v); save(db); return v;
    },
    updateVehicleService(id, serviceIntervalKm, nextServiceKm) {
      const db=load(), v=db.vehicles.find(v=>v.id===id);
      if(v){v.serviceIntervalKm=+serviceIntervalKm; v.nextServiceKm=+nextServiceKm; save(db);}
    },
    updateVehicleStatus(id, status) {
      const db=load(), v=db.vehicles.find(v=>v.id===id);
      if(v){v.status=status; save(db);}
    },

    // Maintenance
    getMaintenanceQueries() {
      const db = load();
      if (!_orgScope) return db.maintenanceQueries;
      const orgVehicleIds = new Set(db.vehicles.filter(v => v.orgId === _orgScope).map(v => v.id));
      return db.maintenanceQueries.filter(q => orgVehicleIds.has(q.vehicleId));
    },
    addMaintenanceQuery(data) {
      const db=load(), q={...data, id:nextId('MNT',db.maintenanceQueries), loggedAt:now(), status:'open', resolvedAt:null};
      db.maintenanceQueries.push(q); save(db); return q;
    },
    updateQueryStatus(id, status) {
      const db=load(), q=db.maintenanceQueries.find(q=>q.id===id);
      if(q){q.status=status; if(status==='resolved')q.resolvedAt=now(); save(db);}
    },

    // Rentals
    getRentals() { const r = load().rentals; return _orgScope ? r.filter(x => x.org === _orgScope) : r; },
    addRental(data) {
      const db=load(), r={...data, id:nextId('RNT',db.rentals)};
      db.rentals.push(r); save(db); return r;
    },
    updateRentalStatus(id, status) {
      const db=load(), r=db.rentals.find(r=>r.id===id);
      if(r){r.status=status; save(db);}
    },

    // Vehicle km
    updateVehicleKm(id, km) {
      const db=load(), v=db.vehicles.find(v=>v.id===id);
      if(v){v.km=+km; save(db);}
    },

    reset() { localStorage.removeItem(KEY); location.reload(); },
  };
})();
