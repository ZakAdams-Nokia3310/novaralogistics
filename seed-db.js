#!/usr/bin/env node
'use strict';

const API_KEY = process.env.FIREBASE_API_KEY;
if (!API_KEY) {
  console.error('Fatal: FIREBASE_API_KEY environment variable is not set.');
  process.exit(1);
}
const PROJECT_ID = 'novara-f985b';
const LOCATION = 'us-east1';
const SERVICE_ID = 'novara-f985b-service';
const CONNECTOR_ID = 'equipcore';

const CONNECTOR = `projects/${PROJECT_ID}/locations/${LOCATION}/services/${SERVICE_ID}/connectors/${CONNECTOR_ID}`;
const MUT_URL = `https://firebasedataconnect.googleapis.com/v1/${CONNECTOR}:executeMutation?key=${API_KEY}`;

async function mutate(operationName, variables = {}) {
  const res = await fetch(MUT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: CONNECTOR, operationName, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors?.length) {
    console.error(`  FAIL ${operationName}:`, json.errors || json);
    return false;
  }
  return true;
}

// ── Helpers ──
const ORG_IDS = {
  vanguard: '00000001-0000-0000-0000-000000000001',
  oceanic:  '00000001-0000-0000-0000-000000000002',
  aether:   '00000001-0000-0000-0000-000000000003',
  terra:    '00000001-0000-0000-0000-000000000004',
  ironclad: '00000001-0000-0000-0000-000000000005',
};

async function seedOrgs() {
  console.log('\n── Step 1: Organisations ──');
  const orgs = [
    { name:'Vanguard Heavies Ltd.', sector:'Construction',         regId:'VH-9921-X',  contactEmail:'ops@vanguard.io',    domain:'vanguard.io' },
    { name:'Oceanic Rigging Corp',  sector:'Maritime Logistics',   regId:'ORC-5542-A', contactEmail:'fleet@oceanic.com',   domain:'oceanic.com' },
    { name:'Aether Power Grid',     sector:'Energy & Utilities',   regId:'APG-8810-Z', contactEmail:'grid@aether.org',     domain:'aether.org' },
    { name:'TerraForming Inc',      sector:'Agricultural',         regId:'TFI-0021-M', contactEmail:'admin@terraform.co',  domain:'terraform.co' },
    { name:'Ironclad Logistics',    sector:'Logistics & Transport',regId:'ICL-7703-L', contactEmail:'ops@ironclad.co.za',  domain:'ironclad.co.za' },
  ];
  for (const o of orgs) {
    const ok = await mutate('CreateOrganisation', o);
    console.log(`  ${ok ? '✓' : '✗'} ${o.name}`);
  }
}

async function seedUsers() {
  console.log('\n── Step 2: Users ──');
  const users = [
    { name:'Alex Carter',     email:'admin@equipcore.com',    role:'ADMIN',  organisationId:null },
    { name:'Sipho Ndlovu',    email:'admin@vanguard.io',     role:'ADMIN',  organisationId:ORG_IDS.vanguard },
    { name:'Lerato Molefe',   email:'user@vanguard.io',      role:'USER',   organisationId:ORG_IDS.vanguard },
    { name:'Thabo Kgosi',     email:'driver@vanguard.io',    role:'DRIVER', organisationId:ORG_IDS.vanguard },
    { name:'Morgan Blake',    email:'admin@oceanic.com',     role:'ADMIN',  organisationId:ORG_IDS.oceanic },
    { name:'Taylor Osei',     email:'user@oceanic.com',      role:'USER',   organisationId:ORG_IDS.oceanic },
    { name:'Casey Drummond',  email:'driver@oceanic.com',    role:'DRIVER', organisationId:ORG_IDS.oceanic },
    { name:'Zanele Mthembu',  email:'admin@aether.org',      role:'ADMIN',  organisationId:ORG_IDS.aether },
    { name:'Pieter van Wyk',  email:'user@aether.org',       role:'USER',   organisationId:ORG_IDS.aether },
    { name:'Mandla Zulu',     email:'driver@aether.org',     role:'DRIVER', organisationId:ORG_IDS.aether },
    { name:'Fatima Patel',    email:'admin@terraform.co',    role:'ADMIN',  organisationId:ORG_IDS.terra },
    { name:'David Botha',     email:'user@terraform.co',     role:'USER',   organisationId:ORG_IDS.terra },
    { name:'Nkosi Dlamini',   email:'driver@terraform.co',   role:'DRIVER', organisationId:ORG_IDS.terra },
    { name:'Bongani Dube',    email:'admin@ironclad.co.za',  role:'ADMIN',  organisationId:ORG_IDS.ironclad },
    { name:'Amahle Sithole',  email:'user@ironclad.co.za',   role:'USER',   organisationId:ORG_IDS.ironclad },
    { name:'Johan Pretorius', email:'driver@ironclad.co.za', role:'DRIVER', organisationId:ORG_IDS.ironclad },
  ];
  for (const u of users) {
    const ok = await mutate('CreateUser', u);
    console.log(`  ${ok ? '✓' : '✗'} ${u.name} (${u.role})`);
  }
}

async function seedVehicles() {
  console.log('\n── Step 3: Vehicles ──');
  const vehicles = [
    // Vanguard
    { make:'Caterpillar', model:'390F Excavator',  year:2022, type:'EXCAVATOR',          regPlate:'CAT-442-B', km:42000,  serviceIntervalKm:10000, nextServiceKm:50000,  organisationId:ORG_IDS.vanguard },
    { make:'Volvo',       model:'A60H Hauler',     year:2021, type:'ARTICULATED_HAULER', regPlate:'VOL-991-X', km:78500,  serviceIntervalKm:15000, nextServiceKm:80000,  organisationId:ORG_IDS.vanguard },
    { make:'Komatsu',     model:'WA470 Loader',    year:2023, type:'WHEEL_LOADER',       regPlate:'KOM-005-A', km:12000,  serviceIntervalKm:10000, nextServiceKm:20000,  organisationId:ORG_IDS.vanguard },
    { make:'Liebherr',    model:'LTM 1300 Crane',  year:2020, type:'CRANE',              regPlate:'LIE-300-C', km:31000,  serviceIntervalKm:10000, nextServiceKm:40000,  organisationId:ORG_IDS.vanguard },
    // Oceanic
    { make:'Kalmar',      model:'DRF450 Reachstacker', year:2021, type:'CONTAINER_REACHSTACKER', regPlate:'KAL-450-R', km:18000, serviceIntervalKm:8000,  nextServiceKm:24000, organisationId:ORG_IDS.oceanic },
    { make:'Sandvik',     model:'DD421 Drill Rig',     year:2022, type:'DRILL_RIG',              regPlate:'SDV-330-D', km:55000, serviceIntervalKm:10000, nextServiceKm:60000, organisationId:ORG_IDS.oceanic },
    { make:'Scania',      model:'R500 Heavy Truck',    year:2022, type:'HEAVY_TRUCK',             regPlate:'SCN-770-P', km:97200, serviceIntervalKm:20000, nextServiceKm:100000,organisationId:ORG_IDS.oceanic },
    // Aether
    { make:'Aggreko',     model:'500kVA Generator',  year:2023, type:'GENERATOR',  regPlate:'AGG-500-G', km:0,     serviceIntervalKm:5000,  nextServiceKm:5000,  organisationId:ORG_IDS.aether },
    { make:'Atlas Copco', model:'ROC F9C Drill',     year:2021, type:'DRILL_RIG',  regPlate:'ACO-808-F', km:34000, serviceIntervalKm:10000, nextServiceKm:40000, organisationId:ORG_IDS.aether },
    { make:'Toyota',      model:'Land Cruiser 79',   year:2024, type:'VAN',        regPlate:'TLC-079-U', km:5200,  serviceIntervalKm:15000, nextServiceKm:15000, organisationId:ORG_IDS.aether },
    // TerraForming
    { make:'JCB',         model:'3CX Eco Backhoe',   year:2023, type:'BACKHOE_LOADER', regPlate:'JCB-121-R', km:8000,  serviceIntervalKm:5000,  nextServiceKm:10000, organisationId:ORG_IDS.terra },
    { make:'John Deere',  model:'WL56 Loader',       year:2022, type:'WHEEL_LOADER',   regPlate:'JDR-560-L', km:22500, serviceIntervalKm:10000, nextServiceKm:30000, organisationId:ORG_IDS.terra },
    { make:'Isuzu',       model:'FVZ 1400 Tipper',   year:2021, type:'HEAVY_TRUCK',    regPlate:'ISZ-140-T', km:64000, serviceIntervalKm:20000, nextServiceKm:70000, organisationId:ORG_IDS.terra },
    // Ironclad
    { make:'Volvo',          model:'FH16 Globetrotter', year:2023, type:'HEAVY_TRUCK', regPlate:'VLV-160-H', km:45000,  serviceIntervalKm:25000, nextServiceKm:50000,  organisationId:ORG_IDS.ironclad },
    { make:'Mercedes-Benz',  model:'Actros 2645',       year:2022, type:'HEAVY_TRUCK', regPlate:'MBZ-264-A', km:112000, serviceIntervalKm:25000, nextServiceKm:125000, organisationId:ORG_IDS.ironclad },
    { make:'MAN',            model:'TGS 26.480',        year:2023, type:'HEAVY_TRUCK', regPlate:'MAN-480-S', km:38000,  serviceIntervalKm:20000, nextServiceKm:40000,  organisationId:ORG_IDS.ironclad },
    { make:'Toyota',         model:'Hino 500',          year:2021, type:'HEAVY_TRUCK', regPlate:'HIN-500-R', km:88000,  serviceIntervalKm:15000, nextServiceKm:90000,  organisationId:ORG_IDS.ironclad },
  ];
  for (const v of vehicles) {
    const ok = await mutate('CreateVehicle', v);
    console.log(`  ${ok ? '✓' : '✗'} ${v.make} ${v.model} → ${v.regPlate}`);
  }
}

async function seedRentals() {
  console.log('\n── Step 4: Rentals ──');
  const rentals = [
    { equipmentName:'Cat 390F Excavator',    clientName:'Ngozi Mining Co.',      organisationId:ORG_IDS.vanguard, startDate:'2026-05-28', returnDate:'2026-07-12', valueZar:22400, status:'ACTIVE' },
    { equipmentName:'Komatsu WA470 Loader',  clientName:'Atlas Quarry Ltd',      organisationId:ORG_IDS.vanguard, startDate:'2026-05-20', returnDate:'2026-06-01', valueZar:18900, status:'OVERDUE' },
    { equipmentName:'Sandvik DD421 Drill',   clientName:'Cape Minerals SA',      organisationId:ORG_IDS.oceanic,  startDate:'2026-06-01', returnDate:'2026-07-20', valueZar:34000, status:'ACTIVE' },
    { equipmentName:'Atlas Copco ROC F9C',   clientName:'Eskom Renewables',      organisationId:ORG_IDS.aether,   startDate:'2026-06-03', returnDate:'2026-06-28', valueZar:28600, status:'ACTIVE' },
    { equipmentName:'Isuzu FVZ 1400 Tipper', clientName:'Horizon Build Ltd',     organisationId:ORG_IDS.terra,    startDate:'2026-06-05', returnDate:'2026-06-30', valueZar:41200, status:'ACTIVE' },
    { equipmentName:'Mercedes Actros 2645',  clientName:'Shoprite Distribution', organisationId:ORG_IDS.ironclad, startDate:'2026-06-01', returnDate:'2026-07-15', valueZar:52000, status:'ACTIVE' },
    { equipmentName:'Volvo FH16 Globetrotter',clientName:'TFG Logistics',        organisationId:ORG_IDS.ironclad, startDate:'2026-07-01', returnDate:'2026-07-20', valueZar:31500, status:'PENDING' },
  ];
  for (const r of rentals) {
    const ok = await mutate('CreateRental', r);
    console.log(`  ${ok ? '✓' : '✗'} ${r.equipmentName} → ${r.clientName}`);
  }
}

async function seedOrgRequests() {
  console.log('\n── Step 5: Org Requests ──');
  const reqs = [
    { orgName:'Stonewall Construction', sector:'Construction',       regId:'REG-0081-SC', contactName:'Priya Naidoo',   contactEmail:'priya@stonewall.co.za',    domain:'stonewall.co.za' },
    { orgName:'Southern Bore Co.',      sector:'Mining & Extraction', regId:'REG-3310-SB', contactName:'Andile Khumalo', contactEmail:'andile@southernbore.co.za', domain:'southernbore.co.za' },
  ];
  for (const r of reqs) {
    const ok = await mutate('CreateOrgRequest', r);
    console.log(`  ${ok ? '✓' : '✗'} ${r.orgName}`);
  }
}

async function main() {
  console.log('EquipCore — Seeding database via Data Connect API');
  console.log('='.repeat(50));
  await seedOrgs();
  await seedUsers();
  await seedVehicles();
  await seedRentals();
  await seedOrgRequests();
  console.log('\n✓ Seeding complete!');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
