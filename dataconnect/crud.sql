-- EquipCore — Complete SQL CRUD Reference
-- All queries use $1, $2 ... as parameter placeholders (PostgreSQL / pg npm package style)
-- Run in: Cloud SQL Studio → database: fdcdb
-- ─────────────────────────────────────────────────────────────────────────────


-- ══════════════════════════════════════════════════════════════════════════════
-- ORGANISATIONS
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all organisations
SELECT id, name, sector, reg_id, contact_email, domain, logo_url, status, created_at, updated_at
FROM organisations
ORDER BY name;

-- GET: by id
SELECT * FROM organisations WHERE id = $1;

-- GET: by domain (used for login org detection)
SELECT * FROM organisations WHERE domain = $1;

-- GET: active only
SELECT * FROM organisations WHERE status = 'ACTIVE' ORDER BY name;

-- GET: search by name
SELECT * FROM organisations WHERE name ILIKE '%' || $1 || '%' ORDER BY name;

-- POST: create organisation
INSERT INTO organisations (id, name, sector, reg_id, contact_email, domain, logo_url, status, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 'ACTIVE', NOW(), NOW())
RETURNING *;

-- PUT: full update
UPDATE organisations
SET name = $1, sector = $2, contact_email = $3, domain = $4, logo_url = $5, updated_at = NOW()
WHERE id = $6
RETURNING *;

-- PATCH: update status only
UPDATE organisations SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id, status;

-- PATCH: update logo
UPDATE organisations SET logo_url = $1, updated_at = NOW() WHERE id = $2 RETURNING id, logo_url;

-- DELETE: remove organisation
DELETE FROM organisations WHERE id = $1 RETURNING *;

-- STATS: count by status
SELECT status, COUNT(*) AS total FROM organisations GROUP BY status;


-- ══════════════════════════════════════════════════════════════════════════════
-- ORG REQUESTS
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all requests
SELECT * FROM org_requests ORDER BY submitted_at DESC;

-- GET: by id
SELECT * FROM org_requests WHERE id = $1;

-- GET: pending only
SELECT * FROM org_requests WHERE status = 'PENDING' ORDER BY submitted_at ASC;

-- GET: by status
SELECT * FROM org_requests WHERE status = $1 ORDER BY submitted_at DESC;

-- POST: submit new request
INSERT INTO org_requests (id, org_name, sector, reg_id, contact_name, contact_email, domain, status, submitted_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 'PENDING', NOW(), NOW())
RETURNING *;

-- PATCH: approve (link resulting org)
UPDATE org_requests
SET status = 'APPROVED', resulting_org_id = $1, admin_notes = $2, updated_at = NOW()
WHERE id = $3
RETURNING *;

-- PATCH: reject
UPDATE org_requests
SET status = 'REJECTED', admin_notes = $1, updated_at = NOW()
WHERE id = $2
RETURNING *;

-- DELETE: remove request
DELETE FROM org_requests WHERE id = $1 RETURNING *;

-- STATS: count by status
SELECT status, COUNT(*) AS total FROM org_requests GROUP BY status;


-- ══════════════════════════════════════════════════════════════════════════════
-- USERS
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all users
SELECT u.id, u.name, u.email, u.role, u.status, u.email_verified, u.last_login_at, u.created_at,
       o.name AS organisation_name
FROM users u
LEFT JOIN organisations o ON o.id = u.organisation_id
ORDER BY u.name;

-- GET: by id
SELECT u.*, o.name AS organisation_name
FROM users u
LEFT JOIN organisations o ON o.id = u.organisation_id
WHERE u.id = $1;

-- GET: by email
SELECT * FROM users WHERE email = $1;

-- GET: by firebase uid
SELECT * FROM users WHERE firebase_uid = $1;

-- GET: by organisation
SELECT * FROM users WHERE organisation_id = $1 ORDER BY name;

-- GET: by role
SELECT * FROM users WHERE role = $1 ORDER BY name;

-- GET: active users only
SELECT * FROM users WHERE status = 'ACTIVE' ORDER BY name;

-- POST: create user
INSERT INTO users (id, firebase_uid, name, email, role, organisation_id, status, avatar_url, email_verified, failed_attempts, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'ACTIVE', $6, FALSE, 0, NOW(), NOW())
RETURNING *;

-- PUT: full update
UPDATE users
SET name = $1, email = $2, role = $3, organisation_id = $4, avatar_url = $5, updated_at = NOW()
WHERE id = $6
RETURNING *;

-- PATCH: update status
UPDATE users SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id, status;

-- PATCH: update role
UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2 RETURNING id, role;

-- PATCH: update avatar
UPDATE users SET avatar_url = $1, updated_at = NOW() WHERE id = $2 RETURNING id, avatar_url;

-- PATCH: record successful login (reset failed attempts, update last_login_at)
UPDATE users SET last_login_at = NOW(), failed_attempts = 0, locked_until = NULL, updated_at = NOW()
WHERE id = $1 RETURNING id, last_login_at;

-- PATCH: record failed login attempt
UPDATE users SET failed_attempts = failed_attempts + 1, updated_at = NOW()
WHERE id = $1 RETURNING id, failed_attempts;

-- PATCH: lock account
UPDATE users SET locked_until = $1, updated_at = NOW()
WHERE id = $2 RETURNING id, locked_until;

-- PATCH: verify email
UPDATE users SET email_verified = TRUE, updated_at = NOW()
WHERE id = $1 RETURNING id, email_verified;

-- PATCH: link firebase uid
UPDATE users SET firebase_uid = $1, updated_at = NOW()
WHERE email = $2 RETURNING *;

-- DELETE: remove user
DELETE FROM users WHERE id = $1 RETURNING *;

-- STATS: users by role
SELECT role, COUNT(*) AS total FROM users GROUP BY role;

-- STATS: users by org
SELECT o.name AS organisation, COUNT(u.id) AS user_count
FROM users u
JOIN organisations o ON o.id = u.organisation_id
GROUP BY o.name
ORDER BY user_count DESC;


-- ══════════════════════════════════════════════════════════════════════════════
-- VEHICLES
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all vehicles
SELECT * FROM vehicles ORDER BY make, model;

-- GET: by id
SELECT * FROM vehicles WHERE id = $1;

-- GET: by registration plate
SELECT * FROM vehicles WHERE reg_plate = $1;

-- GET: by status
SELECT * FROM vehicles WHERE status = $1 ORDER BY make, model;

-- GET: available vehicles only
SELECT * FROM vehicles WHERE status = 'AVAILABLE' ORDER BY make, model;

-- GET: by type
SELECT * FROM vehicles WHERE type = $1 ORDER BY make, model;

-- GET: vehicles due for service (next_service_km <= km + 2000 buffer)
SELECT * FROM vehicles WHERE next_service_km <= km + 2000 ORDER BY (next_service_km - km);

-- GET: vehicles with gallery images
SELECT v.*, COUNT(vi.id) AS image_count
FROM vehicles v
LEFT JOIN vehicle_images vi ON vi.vehicle_id = v.id
GROUP BY v.id
ORDER BY v.make, v.model;

-- POST: add vehicle
INSERT INTO vehicles (id, make, model, year, type, reg_plate, description, km, service_interval_km, next_service_km, status, image_url, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, 'AVAILABLE', $10, NOW(), NOW())
RETURNING *;

-- PUT: full update
UPDATE vehicles
SET make = $1, model = $2, year = $3, type = $4, reg_plate = $5, description = $6,
    km = $7, service_interval_km = $8, next_service_km = $9, image_url = $10, updated_at = NOW()
WHERE id = $11
RETURNING *;

-- PATCH: update status
UPDATE vehicles SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id, status;

-- PATCH: update odometer
UPDATE vehicles SET km = $1, updated_at = NOW() WHERE id = $2 RETURNING id, km;

-- PATCH: update service schedule
UPDATE vehicles
SET service_interval_km = $1, next_service_km = $2, updated_at = NOW()
WHERE id = $3 RETURNING id, service_interval_km, next_service_km;

-- PATCH: update primary image
UPDATE vehicles SET image_url = $1, updated_at = NOW() WHERE id = $2 RETURNING id, image_url;

-- DELETE: remove vehicle
DELETE FROM vehicles WHERE id = $1 RETURNING *;

-- STATS: fleet status summary
SELECT status, COUNT(*) AS total FROM vehicles GROUP BY status;

-- STATS: fleet by type
SELECT type, COUNT(*) AS total FROM vehicles GROUP BY type ORDER BY total DESC;


-- ══════════════════════════════════════════════════════════════════════════════
-- VEHICLE IMAGES
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all images for a vehicle
SELECT * FROM vehicle_images WHERE vehicle_id = $1 ORDER BY sort_order;

-- GET: by id
SELECT * FROM vehicle_images WHERE id = $1;

-- POST: add gallery image
INSERT INTO vehicle_images (id, vehicle_id, image_url, caption, sort_order, uploaded_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW())
RETURNING *;

-- PATCH: update caption
UPDATE vehicle_images SET caption = $1 WHERE id = $2 RETURNING *;

-- PATCH: update sort order
UPDATE vehicle_images SET sort_order = $1 WHERE id = $2 RETURNING *;

-- DELETE: remove image
DELETE FROM vehicle_images WHERE id = $1 RETURNING *;

-- DELETE: remove all images for a vehicle
DELETE FROM vehicle_images WHERE vehicle_id = $1 RETURNING id;


-- ══════════════════════════════════════════════════════════════════════════════
-- MAINTENANCE QUERIES
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all maintenance queries (with vehicle and user info)
SELECT mq.*, v.make, v.model, v.reg_plate,
       u.name AS logged_by_user_name
FROM maintenance_queries mq
JOIN vehicles v ON v.id = mq.vehicle_id
LEFT JOIN users u ON u.id = mq.logged_by_user_id
ORDER BY mq.created_at DESC;

-- GET: by id
SELECT * FROM maintenance_queries WHERE id = $1;

-- GET: by vehicle
SELECT * FROM maintenance_queries WHERE vehicle_id = $1 ORDER BY created_at DESC;

-- GET: by status
SELECT * FROM maintenance_queries WHERE status = $1 ORDER BY priority DESC, created_at DESC;

-- GET: by priority
SELECT * FROM maintenance_queries WHERE priority = $1 ORDER BY created_at DESC;

-- GET: open and in-progress only (active issues)
SELECT mq.*, v.reg_plate
FROM maintenance_queries mq
JOIN vehicles v ON v.id = mq.vehicle_id
WHERE mq.status IN ('OPEN', 'IN_PROGRESS')
ORDER BY
  CASE mq.priority WHEN 'CRITICAL' THEN 1 WHEN 'HIGH' THEN 2 WHEN 'MEDIUM' THEN 3 ELSE 4 END,
  mq.created_at DESC;

-- GET: resolved queries within a date range
SELECT * FROM maintenance_queries
WHERE status = 'RESOLVED'
  AND resolved_at BETWEEN $1 AND $2
ORDER BY resolved_at DESC;

-- POST: log new maintenance query
INSERT INTO maintenance_queries (id, vehicle_id, vehicle_label, type, description, priority, status, logged_by_name, logged_by_user_id, issue_image_url, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'OPEN', $6, $7, $8, NOW(), NOW())
RETURNING *;

-- PUT: full update
UPDATE maintenance_queries
SET vehicle_id = $1, vehicle_label = $2, type = $3, description = $4,
    priority = $5, status = $6, issue_image_url = $7, updated_at = NOW()
WHERE id = $8
RETURNING *;

-- PATCH: update status
UPDATE maintenance_queries SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id, status;

-- PATCH: update priority
UPDATE maintenance_queries SET priority = $1, updated_at = NOW() WHERE id = $2 RETURNING id, priority;

-- PATCH: resolve query
UPDATE maintenance_queries
SET status = 'RESOLVED', resolved_by_id = $1, resolution_notes = $2, resolved_at = NOW(), updated_at = NOW()
WHERE id = $3
RETURNING *;

-- PATCH: attach issue photo
UPDATE maintenance_queries SET issue_image_url = $1, updated_at = NOW() WHERE id = $2 RETURNING id, issue_image_url;

-- DELETE: remove query
DELETE FROM maintenance_queries WHERE id = $1 RETURNING *;

-- STATS: count by status and priority
SELECT status, priority, COUNT(*) AS total
FROM maintenance_queries
GROUP BY status, priority
ORDER BY status, priority;


-- ══════════════════════════════════════════════════════════════════════════════
-- RENTALS
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all rentals (with vehicle and org info)
SELECT r.*, v.make, v.model, v.reg_plate, o.name AS organisation_name
FROM rentals r
LEFT JOIN vehicles v ON v.id = r.vehicle_id
LEFT JOIN organisations o ON o.id = r.organisation_id
ORDER BY r.created_at DESC;

-- GET: by id
SELECT * FROM rentals WHERE id = $1;

-- GET: by status
SELECT * FROM rentals WHERE status = $1 ORDER BY start_date DESC;

-- GET: by organisation
SELECT * FROM rentals WHERE organisation_id = $1 ORDER BY start_date DESC;

-- GET: by vehicle
SELECT * FROM rentals WHERE vehicle_id = $1 ORDER BY start_date DESC;

-- GET: active rentals (currently out)
SELECT r.*, v.reg_plate, o.name AS organisation_name
FROM rentals r
LEFT JOIN vehicles v ON v.id = r.vehicle_id
LEFT JOIN organisations o ON o.id = r.organisation_id
WHERE r.status = 'ACTIVE'
ORDER BY r.return_date ASC;

-- GET: overdue rentals (return date passed but still active/overdue)
SELECT r.*, v.reg_plate, o.name AS organisation_name,
       (CURRENT_DATE - r.return_date) AS days_overdue
FROM rentals r
LEFT JOIN vehicles v ON v.id = r.vehicle_id
LEFT JOIN organisations o ON o.id = r.organisation_id
WHERE r.status IN ('ACTIVE', 'OVERDUE') AND r.return_date < CURRENT_DATE
ORDER BY r.return_date ASC;

-- GET: rentals within a date range
SELECT * FROM rentals WHERE start_date BETWEEN $1 AND $2 ORDER BY start_date;

-- GET: revenue by organisation
SELECT o.name, SUM(r.value_zar) AS total_revenue, COUNT(r.id) AS rental_count
FROM rentals r
JOIN organisations o ON o.id = r.organisation_id
WHERE r.status = 'COMPLETE'
GROUP BY o.name
ORDER BY total_revenue DESC;

-- POST: create rental
INSERT INTO rentals (id, vehicle_id, equipment_name, client_name, organisation_id, start_date, return_date, value_zar, status, notes, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, 'PENDING', $8, NOW(), NOW())
RETURNING *;

-- PUT: full update
UPDATE rentals
SET vehicle_id = $1, equipment_name = $2, client_name = $3, organisation_id = $4,
    start_date = $5, return_date = $6, value_zar = $7, status = $8, notes = $9, updated_at = NOW()
WHERE id = $10
RETURNING *;

-- PATCH: update status
UPDATE rentals SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id, status;

-- PATCH: update dates
UPDATE rentals SET start_date = $1, return_date = $2, updated_at = NOW() WHERE id = $3 RETURNING *;

-- PATCH: update value
UPDATE rentals SET value_zar = $1, updated_at = NOW() WHERE id = $2 RETURNING id, value_zar;

-- DELETE: remove rental
DELETE FROM rentals WHERE id = $1 RETURNING *;

-- STATS: revenue summary
SELECT status, COUNT(*) AS count, COALESCE(SUM(value_zar), 0) AS total_value
FROM rentals
GROUP BY status;


-- ══════════════════════════════════════════════════════════════════════════════
-- RENTAL APPLICATIONS
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all applications
SELECT id, ref, status, first_name, last_name, email, equipment_name, start_date, end_date, estimated_cost, submitted_at
FROM rental_applications
ORDER BY submitted_at DESC;

-- GET: by id (full record)
SELECT * FROM rental_applications WHERE id = $1;

-- GET: by ref
SELECT * FROM rental_applications WHERE ref = $1;

-- GET: by status
SELECT * FROM rental_applications WHERE status = $1 ORDER BY submitted_at DESC;

-- GET: by applicant user
SELECT * FROM rental_applications WHERE applicant_user_id = $1 ORDER BY submitted_at DESC;

-- GET: by organisation
SELECT * FROM rental_applications WHERE organisation_id = $1 ORDER BY submitted_at DESC;

-- GET: pending applications for review queue
SELECT ra.*, u.name AS applicant_user_name
FROM rental_applications ra
LEFT JOIN users u ON u.id = ra.applicant_user_id
WHERE ra.status = 'PENDING'
ORDER BY ra.submitted_at ASC;

-- POST: submit application
INSERT INTO rental_applications (
  id, ref, applicant_user_id, organisation_id, status,
  first_name, last_name, id_number, date_of_birth, email, phone,
  address, city, province, postal_code,
  employment_status, employer_name, monthly_income, years_employed,
  bank, account_type, outstanding_credit, credit_check_consent,
  vehicle_id, equipment_name, daily_rate, start_date, end_date,
  estimated_cost, delivery_address, purpose, rental_notes,
  consent_credit_check, consent_terms, consent_understanding,
  submitted_at, updated_at
) VALUES (
  gen_random_uuid(), $1, $2, $3, 'PENDING',
  $4, $5, $6, $7, $8, $9,
  $10, $11, $12, $13,
  $14, $15, $16, $17,
  $18, $19, $20, $21,
  $22, $23, $24, $25, $26,
  $27, $28, $29, $30,
  $31, $32, $33,
  NOW(), NOW()
) RETURNING *;

-- PATCH: approve application
UPDATE rental_applications
SET status = 'APPROVED', reviewed_by_id = $1, reviewed_at = NOW(), updated_at = NOW()
WHERE id = $2
RETURNING *;

-- PATCH: reject application
UPDATE rental_applications
SET status = 'REJECTED', reviewed_by_id = $1, rejection_reason = $2, reviewed_at = NOW(), updated_at = NOW()
WHERE id = $3
RETURNING *;

-- PATCH: attach documents
UPDATE rental_applications
SET id_document_url = $1, proof_of_income_url = $2, supporting_doc_url = $3, updated_at = NOW()
WHERE id = $4
RETURNING id, id_document_url, proof_of_income_url, supporting_doc_url;

-- PATCH: cancel application
UPDATE rental_applications SET status = 'CANCELLED', updated_at = NOW() WHERE id = $1 RETURNING id, status;

-- DELETE: remove application
DELETE FROM rental_applications WHERE id = $1 RETURNING *;

-- STATS: applications by status
SELECT status, COUNT(*) AS total FROM rental_applications GROUP BY status;


-- ══════════════════════════════════════════════════════════════════════════════
-- CATALOG ITEMS
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all catalog items
SELECT * FROM catalog_items ORDER BY category, name;

-- GET: by id
SELECT ci.*, COUNT(cimg.id) AS image_count
FROM catalog_items ci
LEFT JOIN catalog_images cimg ON cimg.catalog_item_id = ci.id
WHERE ci.id = $1
GROUP BY ci.id;

-- GET: by category
SELECT * FROM catalog_items WHERE category = $1 ORDER BY name;

-- GET: available only
SELECT * FROM catalog_items WHERE status = 'AVAILABLE' ORDER BY category, name;

-- GET: search by name
SELECT * FROM catalog_items WHERE name ILIKE '%' || $1 || '%' ORDER BY name;

-- GET: with all gallery images
SELECT ci.*, COALESCE(
  json_agg(json_build_object('id', cimg.id, 'imageUrl', cimg.image_url, 'caption', cimg.caption, 'sortOrder', cimg.sort_order)
  ORDER BY cimg.sort_order) FILTER (WHERE cimg.id IS NOT NULL),
  '[]'
) AS gallery
FROM catalog_items ci
LEFT JOIN catalog_images cimg ON cimg.catalog_item_id = ci.id
GROUP BY ci.id
ORDER BY ci.category, ci.name;

-- POST: create catalog item
INSERT INTO catalog_items (id, name, subtitle, category, description, specs, daily_rate, status, available_from, image_url, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 'AVAILABLE', $7, $8, NOW(), NOW())
RETURNING *;

-- PUT: full update
UPDATE catalog_items
SET name = $1, subtitle = $2, category = $3, description = $4, specs = $5,
    daily_rate = $6, image_url = $7, updated_at = NOW()
WHERE id = $8
RETURNING *;

-- PATCH: update status
UPDATE catalog_items SET status = $1, available_from = $2, updated_at = NOW() WHERE id = $3 RETURNING id, status;

-- PATCH: update daily rate
UPDATE catalog_items SET daily_rate = $1, updated_at = NOW() WHERE id = $2 RETURNING id, daily_rate;

-- PATCH: update primary image
UPDATE catalog_items SET image_url = $1, updated_at = NOW() WHERE id = $2 RETURNING id, image_url;

-- DELETE: remove catalog item
DELETE FROM catalog_items WHERE id = $1 RETURNING *;

-- STATS: catalog by category and status
SELECT category, status, COUNT(*) AS total FROM catalog_items GROUP BY category, status ORDER BY category;


-- ══════════════════════════════════════════════════════════════════════════════
-- CATALOG IMAGES
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all images for a catalog item
SELECT * FROM catalog_images WHERE catalog_item_id = $1 ORDER BY sort_order;

-- POST: add gallery image
INSERT INTO catalog_images (id, catalog_item_id, image_url, caption, sort_order, uploaded_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW())
RETURNING *;

-- PATCH: update caption
UPDATE catalog_images SET caption = $1 WHERE id = $2 RETURNING *;

-- PATCH: update sort order
UPDATE catalog_images SET sort_order = $1 WHERE id = $2 RETURNING *;

-- DELETE: remove image
DELETE FROM catalog_images WHERE id = $1 RETURNING *;

-- DELETE: remove all images for a catalog item
DELETE FROM catalog_images WHERE catalog_item_id = $1 RETURNING id;


-- ══════════════════════════════════════════════════════════════════════════════
-- WAITLIST ENTRIES
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all waitlist entries for a catalog item
SELECT we.*, ci.name AS item_name
FROM waitlist_entries we
JOIN catalog_items ci ON ci.id = we.catalog_item_id
WHERE we.catalog_item_id = $1
ORDER BY we.submitted_at ASC;

-- GET: by id
SELECT * FROM waitlist_entries WHERE id = $1;

-- GET: pending entries (not yet notified)
SELECT * FROM waitlist_entries WHERE status = 'PENDING' ORDER BY submitted_at ASC;

-- POST: join waitlist
INSERT INTO waitlist_entries (id, catalog_item_id, user_id, name, email, phone, status, submitted_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'PENDING', NOW())
RETURNING *;

-- PATCH: mark as notified
UPDATE waitlist_entries SET status = 'NOTIFIED', notified_at = NOW() WHERE id = $1 RETURNING *;

-- PATCH: mark as expired
UPDATE waitlist_entries SET status = 'EXPIRED' WHERE id = $1 RETURNING *;

-- DELETE: remove entry
DELETE FROM waitlist_entries WHERE id = $1 RETURNING *;

-- DELETE: remove all entries for an item (e.g. when item becomes available and all notified)
DELETE FROM waitlist_entries WHERE catalog_item_id = $1 AND status = 'NOTIFIED' RETURNING id;


-- ══════════════════════════════════════════════════════════════════════════════
-- CONTACT INQUIRIES
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all inquiries
SELECT * FROM contact_inquiries ORDER BY submitted_at DESC;

-- GET: by id
SELECT * FROM contact_inquiries WHERE id = $1;

-- GET: by reference id
SELECT * FROM contact_inquiries WHERE reference_id = $1;

-- GET: new (unread) inquiries
SELECT * FROM contact_inquiries WHERE status = 'NEW' ORDER BY submitted_at ASC;

-- GET: by status
SELECT * FROM contact_inquiries WHERE status = $1 ORDER BY submitted_at DESC;

-- POST: submit inquiry
INSERT INTO contact_inquiries (id, reference_id, name, email, subject, message, status, submitted_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'NEW', NOW())
RETURNING *;

-- PATCH: mark as read
UPDATE contact_inquiries SET status = 'READ' WHERE id = $1 RETURNING id, status;

-- PATCH: mark as replied
UPDATE contact_inquiries
SET status = 'REPLIED', replied_by_id = $1, replied_at = NOW()
WHERE id = $2
RETURNING *;

-- DELETE: remove inquiry
DELETE FROM contact_inquiries WHERE id = $1 RETURNING *;

-- STATS: inquiries by status
SELECT status, COUNT(*) AS total FROM contact_inquiries GROUP BY status;


-- ══════════════════════════════════════════════════════════════════════════════
-- AUDIT LOGS  (append-only — no UPDATE or DELETE)
-- ══════════════════════════════════════════════════════════════════════════════

-- GET: all logs (newest first)
SELECT al.*, u.name AS user_display_name
FROM audit_logs al
LEFT JOIN users u ON u.id = al.user_id
ORDER BY al.created_at DESC
LIMIT 100;

-- GET: by id
SELECT * FROM audit_logs WHERE id = $1;

-- GET: by user
SELECT * FROM audit_logs WHERE user_id = $1 ORDER BY created_at DESC;

-- GET: by action
SELECT * FROM audit_logs WHERE action = $1 ORDER BY created_at DESC;

-- GET: by action type (wildcard match, e.g. 'LOGIN%')
SELECT * FROM audit_logs WHERE action LIKE $1 ORDER BY created_at DESC;

-- GET: logs within a time range
SELECT * FROM audit_logs
WHERE created_at BETWEEN $1 AND $2
ORDER BY created_at DESC;

-- GET: failed login attempts (last 24h)
SELECT * FROM audit_logs
WHERE action = 'LOGIN_FAILED'
  AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- GET: logs by page
SELECT * FROM audit_logs WHERE page = $1 ORDER BY created_at DESC LIMIT 50;

-- POST: write audit event (only INSERT — no update/delete ever)
INSERT INTO audit_logs (id, user_id, user_name, user_role, action, details, page, ip_address, user_agent, created_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW())
RETURNING *;

-- STATS: event counts by action (last 30 days)
SELECT action, COUNT(*) AS total
FROM audit_logs
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY action
ORDER BY total DESC;

-- STATS: logins per day (last 7 days)
SELECT DATE(created_at) AS day, COUNT(*) AS login_count
FROM audit_logs
WHERE action = 'LOGIN_SUCCESS'
  AND created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY day DESC;


-- ══════════════════════════════════════════════════════════════════════════════
-- CROSS-TABLE / DASHBOARD QUERIES
-- ══════════════════════════════════════════════════════════════════════════════

-- DASHBOARD: fleet overview summary
SELECT
  COUNT(*) FILTER (WHERE status = 'AVAILABLE')   AS available,
  COUNT(*) FILTER (WHERE status = 'ON_RENT')      AS on_rent,
  COUNT(*) FILTER (WHERE status = 'MAINTENANCE')  AS in_maintenance,
  COUNT(*) FILTER (WHERE status = 'RETIRED')      AS retired,
  COUNT(*)                                         AS total
FROM vehicles;

-- DASHBOARD: rental revenue this month
SELECT
  COALESCE(SUM(value_zar) FILTER (WHERE status = 'ACTIVE'),   0) AS active_value,
  COALESCE(SUM(value_zar) FILTER (WHERE status = 'COMPLETE'), 0) AS completed_value,
  COUNT(*)  FILTER (WHERE status = 'ACTIVE')                     AS active_count,
  COUNT(*)  FILTER (WHERE status = 'OVERDUE')                    AS overdue_count
FROM rentals
WHERE start_date >= DATE_TRUNC('month', CURRENT_DATE);

-- DASHBOARD: open maintenance issues by priority
SELECT priority, COUNT(*) AS total
FROM maintenance_queries
WHERE status IN ('OPEN', 'IN_PROGRESS')
GROUP BY priority
ORDER BY CASE priority WHEN 'CRITICAL' THEN 1 WHEN 'HIGH' THEN 2 WHEN 'MEDIUM' THEN 3 ELSE 4 END;

-- DASHBOARD: pending org requests count
SELECT COUNT(*) AS pending_requests FROM org_requests WHERE status = 'PENDING';

-- DASHBOARD: pending rental applications count
SELECT COUNT(*) AS pending_applications FROM rental_applications WHERE status = 'PENDING';

-- DASHBOARD: top clients by rental value
SELECT client_name, COUNT(*) AS rental_count, SUM(value_zar) AS total_spend
FROM rentals
GROUP BY client_name
ORDER BY total_spend DESC
LIMIT 10;

-- DASHBOARD: vehicles by org (currently rented)
SELECT o.name AS organisation, COUNT(r.id) AS active_rentals, SUM(r.value_zar) AS total_value
FROM rentals r
JOIN organisations o ON o.id = r.organisation_id
WHERE r.status = 'ACTIVE'
GROUP BY o.name
ORDER BY active_rentals DESC;
