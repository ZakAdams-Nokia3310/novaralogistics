-- EquipCore — Seed Data
-- Run this in: Google Cloud Console → Cloud SQL → novara-f985b-instance → Cloud SQL Studio → database: fdcdb
-- Or via Firebase CLI: firebase dataconnect:sql:shell then paste this file
-- Run sections in order: organisations → users → vehicles → org_requests → maintenance_queries → rentals → catalog_items

-- ══════════════════════════════════════════════════════════════════════════════
-- 1. ORGANISATIONS
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO organisations (id, name, sector, reg_id, contact_email, domain, status, created_at, updated_at) VALUES
  ('00000001-0000-0000-0000-000000000001', 'Vanguard Heavies Ltd.',  'Construction',       'VH-9921-X',  'ops@vanguard.io',    'vanguard.io',  'ACTIVE', NOW(), NOW()),
  ('00000001-0000-0000-0000-000000000002', 'Oceanic Rigging Corp',   'Maritime Logistics', 'ORC-5542-A', 'fleet@oceanic.com',  'oceanic.com',  'ACTIVE', NOW(), NOW()),
  ('00000001-0000-0000-0000-000000000003', 'Aether Power Grid',      'Energy & Utilities', 'APG-8810-Z', 'grid@aether.org',   'aether.org',   'ACTIVE', NOW(), NOW()),
  ('00000001-0000-0000-0000-000000000004', 'TerraForming Inc',       'Agricultural',       'TFI-0021-M', 'admin@terraform.co','terraform.co', 'ACTIVE', NOW(), NOW());

-- ══════════════════════════════════════════════════════════════════════════════
-- 2. USERS  (depends on organisations)
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO users (id, name, email, role, organisation_id, status, email_verified, failed_attempts, created_at, updated_at) VALUES
  ('00000002-0000-0000-0000-000000000001', 'Alex Carter',    'admin@equipcore.com',  'ADMIN',  NULL,                                           'ACTIVE', TRUE, 0, NOW(), NOW()),
  ('00000002-0000-0000-0000-000000000002', 'Jordan Mills',   'user@equipcore.com',   'USER',   '00000001-0000-0000-0000-000000000001',          'ACTIVE', TRUE, 0, NOW(), NOW()),
  ('00000002-0000-0000-0000-000000000003', 'Sam Rivera',     'driver@equipcore.com', 'DRIVER', '00000001-0000-0000-0000-000000000001',          'ACTIVE', TRUE, 0, NOW(), NOW()),
  ('00000002-0000-0000-0000-000000000004', 'Morgan Blake',   'admin@novara.com',     'ADMIN',  '00000001-0000-0000-0000-000000000002',          'ACTIVE', TRUE, 0, NOW(), NOW()),
  ('00000002-0000-0000-0000-000000000005', 'Taylor Osei',    'user@novara.com',      'USER',   '00000001-0000-0000-0000-000000000002',          'ACTIVE', TRUE, 0, NOW(), NOW()),
  ('00000002-0000-0000-0000-000000000006', 'Casey Drummond', 'driver@novara.com',    'DRIVER', '00000001-0000-0000-0000-000000000002',          'ACTIVE', TRUE, 0, NOW(), NOW());

-- ══════════════════════════════════════════════════════════════════════════════
-- 3. VEHICLES
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO vehicles (id, make, model, year, type, reg_plate, km, service_interval_km, next_service_km, status, created_at, updated_at) VALUES
  ('00000003-0000-0000-0000-000000000001', 'Caterpillar', '390F Excavator',   2022, 'EXCAVATOR',          'CAT-442-B', 42000,  10000, 50000,  'ON_RENT',     NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000002', 'Volvo',       'A60H Hauler',      2021, 'ARTICULATED_HAULER', 'VOL-991-X', 78500,  15000, 80000,  'AVAILABLE',   NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000003', 'Komatsu',     'WA470',            2023, 'WHEEL_LOADER',       'KOM-005-A', 12000,  10000, 20000,  'ON_RENT',     NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000004', 'Scania',      'R500',             2022, 'HEAVY_TRUCK',        'SCN-770-P', 97200,  20000, 100000, 'AVAILABLE',   NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000005', 'JCB',         '3CX Eco',          2023, 'BACKHOE_LOADER',     'JCB-121-R', 8000,   5000,  10000,  'MAINTENANCE', NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000006', 'Sandvik',     'DD421 Drill Rig',  2022, 'DRILL_RIG',          'SDV-330-D', 55000,  10000, 60000,  'ON_RENT',     NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000007', 'Liebherr',    'R 9400 Excavator', 2020, 'EXCAVATOR',          'LIB-990-R', 120000, 20000, 130000, 'AVAILABLE',   NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000008', 'Atlas Copco', 'ROC F9C Drill',    2021, 'DRILL_RIG',          'ACO-808-F', 34000,  10000, 40000,  'ON_RENT',     NOW(), NOW());

-- ══════════════════════════════════════════════════════════════════════════════
-- 4. ORG REQUESTS
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO org_requests (id, org_name, sector, reg_id, contact_name, contact_email, domain, status, submitted_at, updated_at) VALUES
  ('00000005-0000-0000-0000-000000000001', 'Ironclad Logistics',    'Logistics',          'REG-4421-IL', 'Bongani Dube',   'bongani@ironclad.co.za',     'ironclad.co.za',     'PENDING', NOW(), NOW()),
  ('00000005-0000-0000-0000-000000000002', 'Stonewall Construction','Construction',        'REG-0081-SC', 'Priya Naidoo',   'priya@stonewall.co.za',      'stonewall.co.za',    'PENDING', NOW(), NOW()),
  ('00000005-0000-0000-0000-000000000003', 'Southern Bore Co.',     'Mining & Extraction','REG-3310-SB', 'Andile Khumalo', 'andile@southernbore.co.za',  'southernbore.co.za', 'PENDING', NOW(), NOW());

-- ══════════════════════════════════════════════════════════════════════════════
-- 5. MAINTENANCE QUERIES  (depends on vehicles and users)
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO maintenance_queries (vehicle_id, vehicle_label, type, description, priority, status, logged_by_name, logged_by_user_id, created_at, updated_at) VALUES
  (
    '00000003-0000-0000-0000-000000000003',
    'Komatsu WA470 · KOM-005-A',
    'DRIVER_ISSUE',
    'Warning light on dashboard — oil pressure critically low. Noticed at start of shift. Vehicle was still driven to site.',
    'HIGH', 'OPEN', 'Sam Rivera', '00000002-0000-0000-0000-000000000003', NOW(), NOW()
  ),
  (
    '00000003-0000-0000-0000-000000000001',
    'Cat 390F Excavator · CAT-442-B',
    'ROADSIDE',
    'Vehicle broke down on N1 northbound near Midrand. Engine overheating. Driver stranded. Tow required. Contact: 082 444 9900.',
    'CRITICAL', 'IN_PROGRESS', 'Jordan Mills', '00000002-0000-0000-0000-000000000002', NOW(), NOW()
  ),
  (
    '00000003-0000-0000-0000-000000000004',
    'Scania R500 · SCN-770-P',
    'TYRES',
    'Front left and rear right tyres showing significant tread wear. Below legal minimum. Need replacement before next deployment.',
    'HIGH', 'OPEN', 'Alex Carter', '00000002-0000-0000-0000-000000000001', NOW(), NOW()
  ),
  (
    '00000003-0000-0000-0000-000000000005',
    'JCB 3CX Eco · JCB-121-R',
    'WINDSCREEN',
    'Large crack running across windscreen from passenger side — result of debris impact on site. Safety risk. Vehicle grounded.',
    'HIGH', 'OPEN', 'Sam Rivera', '00000002-0000-0000-0000-000000000003', NOW(), NOW()
  ),
  (
    '00000003-0000-0000-0000-000000000002',
    'Volvo A60H Hauler · VOL-991-X',
    'SERVICE',
    'Approaching 80,000km service milestone. Oil, filters, brake pads and full inspection required. Book in with service centre.',
    'MEDIUM', 'OPEN', 'Alex Carter', '00000002-0000-0000-0000-000000000001', NOW(), NOW()
  ),
  (
    '00000003-0000-0000-0000-000000000004',
    'Scania R500 · SCN-770-P',
    'GENERAL',
    'Air conditioning unit not functioning. Compressor may be faulty. Driver comfort issue on long-haul routes.',
    'LOW', 'OPEN', 'Casey Drummond', '00000002-0000-0000-0000-000000000006', NOW(), NOW()
  ),
  (
    '00000003-0000-0000-0000-000000000007',
    'Liebherr R 9400 · LIB-990-R',
    'DRIVER_ISSUE',
    'Hydraulic arm making grinding noise when extended past 80%. Suspect bearing wear. Operator flagged for second consecutive shift.',
    'MEDIUM', 'OPEN', 'Jordan Mills', '00000002-0000-0000-0000-000000000002', NOW(), NOW()
  ),
  (
    '00000003-0000-0000-0000-000000000006',
    'Sandvik DD421 Drill Rig · SDV-330-D',
    'TYRES',
    'All four rear tyres replaced as per scheduled rotation. Completed by on-site workshop. Disposal confirmed.',
    'LOW', 'RESOLVED', 'Alex Carter', '00000002-0000-0000-0000-000000000001', NOW(), NOW()
  );

-- Mark the last maintenance query as resolved
UPDATE maintenance_queries
SET resolved_by_id = '00000002-0000-0000-0000-000000000001',
    resolution_notes = 'Tyres replaced and disposed of correctly. Workshop sign-off complete.',
    resolved_at = NOW()
WHERE vehicle_id = '00000003-0000-0000-0000-000000000006'
  AND type = 'TYRES'
  AND status = 'RESOLVED';

-- ══════════════════════════════════════════════════════════════════════════════
-- 6. RENTALS  (depends on vehicles and organisations)
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO rentals (vehicle_id, equipment_name, client_name, organisation_id, start_date, return_date, value_zar, status, created_at, updated_at) VALUES
  ('00000003-0000-0000-0000-000000000001', 'Cat 390F Excavator',     'Ngozi Mining Co.',  '00000001-0000-0000-0000-000000000001', '2026-05-28', '2026-06-12', 22400, 'ACTIVE',   NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000003', 'Komatsu WA470',          'Atlas Quarry Ltd',  '00000001-0000-0000-0000-000000000003', '2026-05-20', '2026-06-01', 18900, 'OVERDUE',  NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000006', 'Sandvik DD421 Drill Rig','Cape Minerals SA',  '00000001-0000-0000-0000-000000000002', '2026-06-01', '2026-06-20', 34000, 'ACTIVE',   NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000002', 'Volvo A60H Hauler',      'Stonewall Const.',  '00000001-0000-0000-0000-000000000004', '2026-06-05', '2026-06-30', 41200, 'PENDING',  NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000008', 'Atlas Copco ROC F9C',    'Iron Peak Corp',    '00000001-0000-0000-0000-000000000001', '2026-06-03', '2026-06-17', 28600, 'ACTIVE',   NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000007', 'Liebherr R 9400',        'DeepRock Mining',   '00000001-0000-0000-0000-000000000002', '2026-05-10', '2026-05-28', 52000, 'COMPLETE', NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000005', 'JCB 3CX Backhoe',        'Horizon Build Ltd', '00000001-0000-0000-0000-000000000003', '2026-05-15', '2026-05-30', 9800,  'OVERDUE',  NOW(), NOW()),
  (NULL,                                   'Epiroc SmartROC D65',    'Terra Bore Inc.',   '00000001-0000-0000-0000-000000000004', '2026-06-08', '2026-06-25', 31500, 'PENDING',  NOW(), NOW());

-- ══════════════════════════════════════════════════════════════════════════════
-- 7. CATALOG ITEMS
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO catalog_items (id, name, subtitle, category, description, specs, daily_rate, status, image_url, created_at, updated_at) VALUES
  (
    '00000004-0000-0000-0000-000000000001',
    'Volvo FH16 Globetrotter', 'Long-Haul Freight', 'TRUCK',
    'Industry-leading long-haul truck with 750 hp and class-leading driver ergonomics.',
    '{"hp":"750","payload":"25,000 kg","engine":"16.1L"}',
    4200, 'AVAILABLE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAv8e87iP2w_pHeQcW7esQSy6rjuuzXoliWo98ZkWquL6R0NH4Wt64g10-CEaMYh-ErLyiif_9SWsCi-be1XiCdLZkyB-gRd18LqFi005Twx_ZVbvSAesU6ZrpShpx61tTo3W1U8cBqCEYYtI3bSFTzgMM5gH2tB3QpkUFAaz3wImYaRMJlburfRXIHZYDZoVoXZviouUPktBzQx2UklNr9bjAoR2u_3hI7-Ba06LkWZBdJ3Vz1YJkfe80rjiD3De49_iR9BGneReY',
    NOW(), NOW()
  ),
  (
    '00000004-0000-0000-0000-000000000002',
    'EX-350 Crawler Excavator', 'Earth Moving', 'EXCAVATOR',
    'High-performance crawler excavator for demanding earth-moving and mining operations.',
    '{"hp":"350","operatingWeight":"35,000 kg","maxDigDepth":"7.8m"}',
    5800, 'AVAILABLE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvjBh4G6uFhvFE7zGhLGVK_LfyO1n_pJWncpqsRMSKAU_7NZLlqLR6zwSRawgQ6QMNb21cdXuxXF-7laAXMHx4efih_N9wXGraW9q_I0AkUr_B-EJvaYRIWUwS0TDgpL5qYluKnb3Isqkkiiyw3PMQywZIHRIF1bmUHqSXA5Vg0Uk0biPqwV2yLb7xPD8v5t4ByxG9fI3_L0N9YUeP8LgseDLL0MIRtCDA78mrOrjsAarzBLHZNXtkgAS__EyBAVC9DqZ2OIKpwRE',
    NOW(), NOW()
  ),
  (
    '00000004-0000-0000-0000-000000000003',
    'HC-900 Heavy Lifter', 'Industrial Crane', 'CRANE',
    'Massive industrial crane for heavy construction and infrastructure projects.',
    '{"liftCapacity":"900t","maxBoom":"120m"}',
    18500, 'ON_RENT',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCdE2hCW5w2ij9u0n1ow2t5elpRp1Mbj3wDGIvJDwLfM0OVkDC7dwpdHhpZD0nZ70no8JAVxJ6HZs84JXziytiGiBWNmLFx3Qc-cWt6qAnt7FNNujYtVfB1hdxk3dXLJMlSHjAkY-XkCUnBXWuv-JdxrX3FdKCoWnG1HKStyXtBvm8HsO1wgNo6nBhN5GN9pSraR9Y2oUFbBhaeZI7sT1dMs1buHld872mq5n6ezGvPzlsGvQ9ArczrClq2unSaMPmSIubvGK3mhjQ',
    NOW(), NOW()
  ),
  (
    '00000004-0000-0000-0000-000000000004',
    'FL-55 Electric Lift', 'Warehouse Operations', 'FORKLIFT',
    'Zero-emission electric forklift for indoor warehouse and logistics operations.',
    '{"liftCapacity":"5,500 kg","liftHeight":"6.5m","powerType":"Electric"}',
    2400, 'AVAILABLE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCLnqEThifzelwz4MzogjW6rOKbsuFc98eonxWhKQXPqBsj8TZgMBnroCAoF9kevYOsmEcOExOJhGqPPm1wrR2gxOWm54F3BIH5t13RFoYJo_AdtfzJZZDtq7IHgMkVqMDLi5eziGkhf7DT8fIFO4sJjUmZyZNlGTQs152vXMHr9p6sUIasnHI_Ens5aSxLkpmfCQ9OOKLArJDvnCtr_-r_BviOtTGqW4qsKI--lzKV-sG2rOp365fwtN9rTjPbbEtAYtPzy9QkuyU',
    NOW(), NOW()
  ),
  (
    '00000004-0000-0000-0000-000000000005',
    'Scania R 500 V8', 'Heavy Distribution', 'TRUCK',
    'Powerful heavy-distribution truck for demanding South African road conditions.',
    '{"hp":"500","payload":"18,500 kg"}',
    3950, 'MAINTENANCE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA7nmhm5Mmsc-uvE_XD7dzO_Im4ie0zEnxqdjhdkmN_trtemZgrxJNfmh9PCEyLGRiuW5opmcSmq5m5gvP94Qf91tWnTiggJLNfHYvEMEZnq3U4m7db3PybMimUbkGLoLYha3mN8vozSQOZGrP_kRo6_ER9GC_89UrVCU0j37d0bpAW5mqvkDZGoM3QjlPNhIR4h5sh6guimFxRiOs981SLIy0408buzxN_Lx6aAIaal8zjBZUMdsVmqJDDMm7FeltP_udG0neA3uc',
    NOW(), NOW()
  ),
  (
    '00000004-0000-0000-0000-000000000006',
    'Cat 5t Diesel Forklift', 'Warehousing & Yard', 'FORKLIFT',
    'Reliable diesel forklift for yard and warehouse operations with 5-tonne capacity.',
    '{"liftCapacity":"5,000 kg","powerType":"Diesel"}',
    1250, 'AVAILABLE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCLnqEThifzelwz4MzogjW6rOKbsuFc98eonxWhKQXPqBsj8TZgMBnroCAoF9kevYOsmEcOExOJhGqPPm1wrR2gxOWm54F3BIH5t13RFoYJo_AdtfzJZZDtq7IHgMkVqMDLi5eziGkhf7DT8fIFO4sJjUmZyZNlGTQs152vXMHr9p6sUIasnHI_Ens5aSxLkpmfCQ9OOKLArJDvnCtr_-r_BviOtTGqW4qsKI--lzKV-sG2rOp365fwtN9rTjPbbEtAYtPzy9QkuyU',
    NOW(), NOW()
  ),
  (
    '00000004-0000-0000-0000-000000000007',
    'Aggreko 500kVA Generator', 'Diesel Generator', 'GENERATOR',
    'Industrial diesel generator with remote monitoring for reliable site power.',
    '{"capacity":"500 kVA","monitoring":"Remote","fuelType":"Diesel"}',
    4800, 'AVAILABLE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCILAJD0qHenQ4pb-B4zEVOtqAGhcU-YpyA0fA_Gep_94jih-Gp4fIXaA4V1ad27fJBFPOLxc9zeyASqSn2Fxug8ybWvXbERLp6vTSgbr0tHyiIvJcaOKxY6r66B77vUVDRqRo9T5qh_cywe2-arrqT-v-pGNqICJYgNTsWWcHyQO250Wo0ssSsbKIBMy1HKO9P-aL79-mkMpDRswhAOnATZyYbLgRlfPAa9Rt_R4uOfH4C4WTtKV8OItRUOf7YqenPC_8mIoEM9-0',
    NOW(), NOW()
  ),
  (
    '00000004-0000-0000-0000-000000000008',
    'Mercedes Sprinter 519', 'Last-Mile Logistics', 'TRUCK',
    'Versatile light commercial van for last-mile delivery and logistics operations.',
    '{"hp":"190","payload":"3,200 kg","engine":"3.0L"}',
    1100, 'AVAILABLE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCbIk_Ofuta210Qz_VxV52J68zAbgWycVuWq948mfK7pLap-qNDUWv87ytj-CFMlpkWKzDivGzzFrFZuPZoCEv2rXBECgIeG73mwzsKLlATS6Awd0LLZVmpgUcDT1vAUIrxN-j7dwrkGVVac1uVWdn89ey8xMNC4ATHGyn26Esqn42gT_OO2qlSL-x1VOPx8Vc7jmLsxFFDjFV9HV-9FCqU847sPV852Q-KyG-W3JGp07YebaE5gnH6l46WqyCOEpLDGmuzgRCkgmY',
    NOW(), NOW()
  ),
  (
    '00000004-0000-0000-0000-000000000009',
    'Crown RR 5700', 'High-Reach Truck', 'FORKLIFT',
    'Electric high-reach truck for narrow-aisle warehouse operations up to 11.2m.',
    '{"maxHeight":"11.2m","liftCapacity":"2,000 kg","powerType":"Electric"}',
    2100, 'AVAILABLE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdmGpam3TdzvozeJuMi145vz3WCNlrnLNmh3hXXCWedEETJEWHXCxTQ6BKpJpBu1SDNV9N2BVyQRlTO7FEBEE9RzBYjST4NtUy4_YA10X7y9oQcdiT11OdZMLA-yp-qdxMNLtzE_IO6fWpTZl_0ArWl7oMLFl-SRKsMHOpFimXyz_XBG66PSF25uYvpl-InaQ6CJPdfNNvCKsgmahwVMBJhDTOgD_bU-XJpKKc04iTtmcMsvQw8g7hahT_I',
    NOW(), NOW()
  ),
  (
    '00000004-0000-0000-0000-000000000010',
    'Kalmar DRF450', 'Container Reachstacker', 'CRANE',
    'Container reachstacker for port and logistics terminal operations.',
    '{"liftCapacity":"45,000 kg","reach":"15.1m"}',
    12400, 'AVAILABLE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD1MYSSyQH5cDzaHjMEjckr6J24PF7vEuxGC9SvpKUcTi2xyVvtt6ufMngUoY54qsNwD74bl-HdEjAPQaeXONTmttepMuTojTEeHX6tmwtJL-AOqBNOXPmZeyU-x1ZMcKFL4kQPwNEF6vMqaN-b3r9_Q1OM_1MRWn-rUSLM25_xsOfnyF6jdJSUEdEptUcXs5CaP4h6JKSJnGft95WglYu-vWl0aiXMAJp1Nl1jXGPIQv8Mx-fUr5Wo8DyzJ7ngbfVCRW4GUa0omb0',
    NOW(), NOW()
  );
