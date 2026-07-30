'use strict';

/**
 * DC_DATA — Firebase Data Connect client for EquipCore.
 *
 * Uses the Data Connect v1 REST API:
 *   Queries   → :executeQuery   with { name, operationName, variables }
 *   Mutations → :executeMutation with { name, operationName, variables }
 *
 * All operations are pre-compiled in the deployed connector (queries.gql / mutations.gql).
 * The Firebase Web API key (?key=...) is used for PUBLIC-auth operations.
 */
const DC_DATA = (() => {

  // ─── Config ─────────────────────────────────────────────────────────────────
  const API_KEY    = (typeof FIREBASE_CONFIG !== 'undefined') ? FIREBASE_CONFIG.apiKey : '';
  const PROJECT_ID = (typeof FIREBASE_CONFIG !== 'undefined') ? FIREBASE_CONFIG.projectId : 'novara-f985b';
  const LOCATION   = 'us-east1';
  const SERVICE_ID = 'novara-f985b-service';
  const CONNECTOR_ID = 'equipcore';

  const CONNECTOR = `projects/${PROJECT_ID}/locations/${LOCATION}/services/${SERVICE_ID}/connectors/${CONNECTOR_ID}`;
  const BASE      = `https://firebasedataconnect.googleapis.com/v1/${CONNECTOR}`;
  const QUERY_URL = `${BASE}:executeQuery?key=${API_KEY}`;
  const MUT_URL   = `${BASE}:executeMutation?key=${API_KEY}`;

  // ─── In-memory cache ────────────────────────────────────────────────────────
  let _orgs = [], _orgRequests = [], _users = [], _vehicles = [];
  let _maintenance = [], _rentals = [], _catalogItems = [], _rentalApplications = [];
  let _ready = false;
  let _orgScope = null;

  const CACHE_KEY = 'ec_dc_cache';
  const CACHE_TTL = 90 * 1000; // 90 seconds

  function saveCache() {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        ts: Date.now(),
        orgs: _orgs, orgRequests: _orgRequests, users: _users,
        vehicles: _vehicles, maintenance: _maintenance,
        rentals: _rentals, catalogItems: _catalogItems,
        rentalApplications: _rentalApplications,
      }));
    } catch(_) {}
  }

  function loadCache() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return false;
      const c = JSON.parse(raw);
      if (Date.now() - c.ts > CACHE_TTL) { sessionStorage.removeItem(CACHE_KEY); return false; }
      _orgs = c.orgs || []; _orgRequests = c.orgRequests || [];
      _users = c.users || []; _vehicles = c.vehicles || [];
      _maintenance = c.maintenance || []; _rentals = c.rentals || [];
      _catalogItems = c.catalogItems || [];
      _rentalApplications = c.rentalApplications || [];
      return true;
    } catch(_) { return false; }
  }

  // ─── Core fetch (genuinely public operations only) ─────────────────────────
  // Data Connect's connector denies every OTHER operation to every client
  // (@auth(level: NO_ACCESS) in dataconnect/connectors/*.gql) — only the
  // read-only catalog browse and anonymous-submission forms in
  // PUBLIC_QUERIES/PUBLIC_MUTATIONS below are still reachable this way.
  // Everything else goes through authProxy(), which calls this project's
  // own authenticated backend (functions/routes/dataRoutes.js), the same
  // way /api/auth/* already works.
  async function dc(url, operationName, variables = {}) {
    let res;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: CONNECTOR, operationName, variables }),
      });
    } catch {
      if (_ready) window.showToast?.('error', 'Network error. Check your connection and try again.');
      throw new Error('Network error. Check your connection and try again.');
    }
    if (!res.ok) {
      let body = '';
      try { body = await res.text(); } catch { /**/ }
      console.error('[DC]', operationName, res.status, body);
      if (_ready) window.showToast?.('error', 'Unable to complete request. Please try again.');
      throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    let json;
    try { json = await res.json(); } catch (e) {
      throw new Error(`JSON parse error: ${e.message}`);
    }
    if (json.errors?.length) {
      console.error('[DC] GQL errors', operationName, json.errors);
      if (_ready) window.showToast?.('error', 'Unable to complete request. Please try again.');
      throw new Error(`GQL: ${json.errors.map(e => e.message).join('; ')}`);
    }
    return json.data || {};
  }

  // ─── Authenticated proxy (everything else) ─────────────────────────────────
  async function authProxy(operationName, variables = {}) {
    if (typeof EC_API === 'undefined') {
      throw new Error('Not signed in.');
    }
    let res;
    try {
      res = await EC_API.authFetch('/data/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName, variables }),
      });
    } catch {
      if (_ready) window.showToast?.('error', 'Network error. Check your connection and try again.');
      throw new Error('Network error. Check your connection and try again.');
    }
    if (!res.ok) {
      let body = '';
      try { body = await res.text(); } catch { /**/ }
      console.error('[DC]', operationName, res.status, body);
      if (_ready) window.showToast?.('error', 'Unable to complete request. Please try again.');
      throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    const json = await res.json();
    return json.data || {};
  }

  // Anonymous-submission forms — org registration, rental application,
  // waitlist join, contact inquiry. Routed through the backend (not Data
  // Connect directly, unlike the read-only catalog queries below) so
  // server-side schema validation (functions/validation/dataSchemas.js's
  // PUBLIC_SCHEMAS) runs before anything reaches the database — these
  // accept input from visitors who were never asked to sign in, so there's
  // no auth token to rely on as a first line of defence the way
  // authProxy() has. Deliberately plain fetch(), not EC_API.authFetch —
  // this must work identically whether or not anyone happens to be signed
  // in, and must not depend on frontend/token-client.js being loaded.
  async function publicSubmit(operationName, variables = {}) {
    let res;
    try {
      res = await fetch('/api/data/public-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName, variables }),
      });
    } catch {
      if (_ready) window.showToast?.('error', 'Network error. Check your connection and try again.');
      throw new Error('Network error. Check your connection and try again.');
    }
    if (!res.ok) {
      let body = '';
      try { body = await res.text(); } catch { /**/ }
      console.error('[DC]', operationName, res.status, body);
      if (_ready) window.showToast?.('error', 'Unable to complete request. Please try again.');
      throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    const json = await res.json();
    return json.data || {};
  }

  // Operations still declared @auth(level: PUBLIC) in the connector —
  // read-only catalog browsing, safe to call directly.
  const PUBLIC_QUERIES = new Set([
    'ListAllCatalogItems', 'ListCatalogItemsByCategory',
    'GetCatalogItemById', 'ListAvailableCatalogItems', 'ListCatalogImages',
  ]);
  const PUBLIC_MUTATIONS = new Set([
    'CreateOrgRequest', 'CreateRentalApplication', 'JoinWaitlist', 'CreateContactInquiry',
  ]);

  function query(operationName, variables = {}) {
    return PUBLIC_QUERIES.has(operationName)
      ? dc(QUERY_URL, operationName, variables)
      : authProxy(operationName, variables);
  }
  function mutate(operationName, variables = {}) {
    return PUBLIC_MUTATIONS.has(operationName)
      ? publicSubmit(operationName, variables)
      : authProxy(operationName, variables);
  }

  // ─── Normalizers ────────────────────────────────────────────────────────────
  const lo = v => (v || '').toLowerCase();

  function toDate(ts) {
    if (!ts) return '';
    if (typeof ts === 'string') return ts.slice(0, 10);
    return String(ts);
  }

  function normOrg(o) {
    return {
      id:           o.id,
      name:         o.name,
      sector:       o.sector,
      regId:        o.regId,
      contactEmail: o.contactEmail,
      domain:       o.domain,
      logoUrl:      o.logoUrl || null,
      status:       lo(o.status),
      createdAt:    toDate(o.createdAt),
    };
  }

  function normOrgRequest(r) {
    return {
      id:           r.id,
      orgName:      r.orgName,
      sector:       r.sector,
      regId:        r.regId,
      contactName:  r.contactName,
      contactEmail: r.contactEmail,
      domain:       r.domain,
      status:       lo(r.status),
      notes:        r.adminNotes || '',
      submittedAt:  toDate(r.submittedAt),
    };
  }

  function normUser(u) {
    return {
      id:        u.id,
      name:      u.name,
      email:     u.email,
      role:      lo(u.role),
      orgId:     u.organisation?.id   || null,
      orgName:   u.organisation?.name || null,
      status:    lo(u.status),
      avatarUrl: u.avatarUrl || null,
      createdAt: toDate(u.createdAt),
    };
  }

  function normVehicle(v) {
    return {
      id:               v.id,
      orgId:            v.organisation?.id || v.orgId || null,
      orgName:          v.organisation?.name || null,
      make:             v.make,
      model:            v.model,
      year:             v.year,
      type:             v.type,
      regPlate:         v.regPlate,
      description:      v.description || null,
      km:               v.km,
      serviceIntervalKm: v.serviceIntervalKm,
      nextServiceKm:    v.nextServiceKm,
      status:           lo(v.status),
      imageUrl:         v.imageUrl || null,
      vin:              v.vin || null,
      trackingCompany:  v.trackingCompany || null,
      lastServiceDate:  v.lastServiceDate || null,
      addedAt:          toDate(v.createdAt),
      updatedAt:        toDate(v.updatedAt),
    };
  }

  function normMaintenance(q) {
    return {
      id:           q.id,
      vehicleId:    q.vehicle?.id || null,
      vehicleLabel: q.vehicleLabel,
      type:         lo(q.type),
      description:  q.description,
      priority:     lo(q.priority),
      status:       lo(q.status),
      loggedBy:     q.loggedByName,
      loggedAt:     q.createdAt,
      resolvedAt:   q.resolvedAt || null,
      createdAt:    q.createdAt,
    };
  }

  function normRental(r) {
    return {
      id:         r.id,
      equipment:  r.equipmentName,
      client:     r.clientName,
      org:        r.organisation?.id   || null,
      orgName:    r.organisation?.name || null,
      vehicleId:  r.vehicle?.id        || null,
      startDate:  r.startDate,
      returnDate: r.returnDate,
      value:      r.valueZar,
      status:     lo(r.status),
      notes:      r.notes || '',
    };
  }

  function normRentalApplication(a) {
    return {
      id:            a.id,
      applicantName: [a.firstName, a.lastName].filter(Boolean).join(' '),
      email:         a.email,
      phone:         a.phone,
      equipment:     a.equipmentName,
      vehicleId:     a.vehicle?.id || null,
      vehicleLabel:  a.vehicle ? `${a.vehicle.make} ${a.vehicle.model}` : null,
      startDate:     a.startDate,
      endDate:       a.endDate,
      status:        lo(a.status),
      submittedAt:   toDate(a.submittedAt),
      updatedAt:     toDate(a.updatedAt),
    };
  }

  function normCatalog(c) {
    return {
      id:          c.id,
      name:        c.name,
      subtitle:    c.subtitle || null,
      category:    c.category,
      description: c.description || null,
      specs:       c.specs || null,
      dailyRate:   c.dailyRate,
      status:      lo(c.status),
      imageUrl:    c.imageUrl,
    };
  }

  // ─── Enum converters ────────────────────────────────────────────────────────
  const VEHICLE_TYPE = {
    // Earth Moving
    'Excavator':                 'EXCAVATOR',
    'Mini Excavator':            'MINI_EXCAVATOR',
    'Backhoe Loader':            'BACKHOE_LOADER',
    'Wheel Loader':              'WHEEL_LOADER',
    'Compact Track Loader':      'COMPACT_TRACK_LOADER',
    'Skid Steer Loader':         'SKID_STEER_LOADER',
    'Bulldozer':                 'BULLDOZER',
    'Motor Grader':              'MOTOR_GRADER',
    'Compactor':                 'COMPACTOR',
    // Trucks (On-Road)
    'Heavy Truck':               'HEAVY_TRUCK',
    'Rigid Truck':               'RIGID_TRUCK',
    'Tipper Truck':              'TIPPER_TRUCK',
    'Flatbed Truck':             'FLATBED_TRUCK',
    'Curtainsider Truck':        'CURTAINSIDER_TRUCK',
    'Refrigerated Truck':        'REFRIGERATED_TRUCK',
    'Tanker Truck':              'TANKER_TRUCK',
    'Concrete Mixer':            'CONCRETE_MIXER',
    'Car Transporter':           'CAR_TRANSPORTER',
    'Crane Truck':               'CRANE_TRUCK',
    // Trailers
    'Flatbed Trailer':           'FLATBED_TRAILER',
    'Curtainsider Trailer':      'CURTAINSIDER_TRAILER',
    'Refrigerated Trailer':      'REFRIGERATED_TRAILER',
    'Tanker Trailer':            'TANKER_TRAILER',
    'Tipper Trailer':            'TIPPER_TRAILER',
    'Lowboy Trailer':            'LOWBOY_TRAILER',
    'Skeletal Trailer':          'SKELETAL_TRAILER',
    'Car Transporter Trailer':   'CAR_TRANSPORTER_TRAILER',
    // Mining & Heavy Haul
    'Drill Rig':                 'DRILL_RIG',
    'Rigid Dump Truck':          'RIGID_DUMP_TRUCK',
    'Articulated Hauler':        'ARTICULATED_HAULER',
    // Cranes & Lifting
    'Crane':                     'CRANE',
    'Mobile Crane':              'MOBILE_CRANE',
    'Tower Crane':               'TOWER_CRANE',
    'Crawler Crane':             'CRAWLER_CRANE',
    'Overhead Crane':            'OVERHEAD_CRANE',
    'Boom Truck':                'BOOM_TRUCK',
    'Container Reachstacker':    'CONTAINER_REACHSTACKER',
    'Straddle Carrier':          'STRADDLE_CARRIER',
    'High Reach Truck':          'HIGH_REACH_TRUCK',
    // Forklifts & Warehouse
    'Forklift':                  'FORKLIFT',
    'Rough Terrain Forklift':    'ROUGH_TERRAIN_FORKLIFT',
    'Order Picker':              'ORDER_PICKER',
    'Pallet Jack':               'PALLET_JACK',
    'Telehandler':               'TELEHANDLER',
    // Aerial Work Platforms
    'Scissor Lift':              'SCISSOR_LIFT',
    'Boom Lift':                 'BOOM_LIFT',
    // Power & Utilities
    'Generator':                 'GENERATOR',
    'Compressor':                'COMPRESSOR',
    'Light Tower':               'LIGHT_TOWER',
    'Water Pump':                'WATER_PUMP',
    // Specialty & Road
    'Road Sweeper':              'ROAD_SWEEPER',
    'Water Bowser':              'WATER_BOWSER',
    'Concrete Pump':             'CONCRETE_PUMP',
    'Asphalt Paver':             'ASPHALT_PAVER',
    'Cold Planer':               'COLD_PLANER',
    // Light Vehicles
    'Van':                       'VAN',
    'Pickup Truck':              'PICKUP_TRUCK',
    'Minibus':                   'MINIBUS',
    // Other
    'Other':                     'OTHER',
  };

  const VEHICLE_STATUS = {
    available:   'AVAILABLE',
    on_rent:     'ON_RENT',
    maintenance: 'MAINTENANCE',
    retired:     'RETIRED',
  };

  const MAINT_TYPE = {
    driver_issue: 'DRIVER_ISSUE',
    roadside:     'ROADSIDE',
    tyres:        'TYRES',
    windscreen:   'WINDSCREEN',
    service:      'SERVICE',
    general:      'GENERAL',
  };

  const MAINT_PRIO = {
    critical: 'CRITICAL',
    high:     'HIGH',
    medium:   'MEDIUM',
    low:      'LOW',
  };

  const MAINT_STATUS = {
    open:        'OPEN',
    in_progress: 'IN_PROGRESS',
    resolved:    'RESOLVED',
  };

  const RENTAL_STATUS = {
    pending:   'PENDING',
    active:    'ACTIVE',
    overdue:   'OVERDUE',
    complete:  'COMPLETE',
    cancelled: 'CANCELLED',
  };

  // ─── Cache refresh helpers ───────────────────────────────────────────────────
  async function _loadOrgs() {
    const d = await query('ListAllOrganisations');
    _orgs = (d.organisations || []).map(normOrg);
  }
  async function _loadOrgRequests() {
    const d = await query('ListAllOrgRequests');
    _orgRequests = (d.orgRequests || []).map(normOrgRequest);
  }
  async function _loadUsers() {
    const d = await query('ListAllUsers');
    _users = (d.users || []).map(normUser);
  }
  async function _loadVehicles() {
    const d = await query('ListAllVehicles');
    _vehicles = (d.vehicles || []).map(normVehicle);
  }
  async function _loadMaintenance() {
    const d = await query('ListAllMaintenanceQueries');
    _maintenance = (d.maintenanceQueries || []).map(normMaintenance);
  }
  async function _loadRentals() {
    const d = await query('ListAllRentals');
    _rentals = (d.rentals || []).map(normRental);
  }
  async function _loadCatalog() {
    const d = await query('ListAllCatalogItems');
    _catalogItems = (d.catalogItems || []).map(normCatalog);
  }
  async function _loadRentalApplications() {
    const d = await query('ListAllRentalApplications');
    _rentalApplications = (d.rentalApplications || []).map(normRentalApplication);
  }

  // ─── Public API ──────────────────────────────────────────────────────────────
  return {

    async init() {
      if (_ready) return;
      if (!API_KEY) {
        window.showToast?.('error', 'Service configuration issue. Please contact support.');
        setTimeout(() => { window.location.href = 'error'; }, 1800);
        throw new Error('Service configuration issue.');
      }
      // Serve from sessionStorage cache if fresh (avoids refetch on page navigation)
      if (loadCache()) { _ready = true; return; }
      try {
        await Promise.all([
          _loadOrgs(), _loadOrgRequests(), _loadUsers(),
          _loadVehicles(), _loadMaintenance(), _loadRentals(), _loadCatalog(),
          _loadRentalApplications(),
        ]);
        _ready = true;
        saveCache();
      } catch (err) {
        window.showToast?.('error', 'Unable to load data. Please refresh or try again later.');
        setTimeout(() => { window.location.href = 'error'; }, 2000);
        throw err;
      }
    },

    // Narrow, non-admin-safe alternative to init() — used by pages a
    // "user"/"driver" role can reach (e.g. dashboard-user.html). init()
    // above loads the full admin dataset (ListAllUsers, ListAllVehicles,
    // etc.), all of which are admin-only server-side now — a non-admin
    // calling init() would 403 on the very first request. This instead
    // calls the org-scoped queries that any signed-in role may use, and
    // which the backend forces to the caller's OWN org regardless of what
    // orgId is passed here (see registry/dataOperations.js's orgRoles).
    async initForOrg(orgId) {
      _orgScope = orgId || null;
      if (!orgId) { _rentals = []; _vehicles = []; _ready = true; return; }
      const [rd, vd] = await Promise.all([
        query('ListRentalsByOrg', { organisationId: orgId }),
        query('ListVehiclesByOrg', { organisationId: orgId }),
      ]);
      _rentals = (rd.rentals || []).map(normRental);
      _vehicles = (vd.vehicles || []).map(normVehicle);
      _ready = true;
    },

    // Bust cache (call after any mutation to keep data fresh)
    bustCache() { try { sessionStorage.removeItem(CACHE_KEY); } catch(_) {} },

    // ── Polling (opt-in, per-page) ───────────────────────────────────────────
    // NOT wired into any page by default — call from a page's own script to
    // enable periodic refetch (e.g. for admin pages several people may be
    // editing at once). Bypasses the sessionStorage cache on every tick.
    _pollTimer: null,
    startPolling(onUpdate, intervalMs = 5000) {
      this.stopPolling();
      this._pollTimer = setInterval(async () => {
        try {
          this.bustCache();
          _ready = false;
          await this.init();
          onUpdate?.();
        } catch (_) { /* keep polling even if one tick fails */ }
      }, intervalMs);
      return this._pollTimer;
    },
    stopPolling() {
      if (this._pollTimer) { clearInterval(this._pollTimer); this._pollTimer = null; }
    },

    // ── Org scoping ───────────────────────────────────────────────────────
    setOrgScope(orgId) { _orgScope = orgId || null; },
    getOrgScope()      { return _orgScope; },

    // ── Synchronous getters (use after init()) ──────────────────────────────
    getOrgs()               { return _orgScope ? _orgs.filter(o => o.id === _orgScope) : _orgs; },
    getAllOrgs()             { return _orgs; },
    getOrg(id)              { return _orgs.find(o => o.id === id) || null; },
    getOrgRequests()        { return _orgRequests; },
    getUsers()              { return _orgScope ? _users.filter(u => u.orgId === _orgScope) : _users; },
    getAllUsers()            { return _users; },
    getUsersByOrg(orgId)    { return _users.filter(u => u.orgId === orgId); },
    getVehicles()           { return _orgScope ? _vehicles.filter(v => v.orgId === _orgScope) : _vehicles; },
    getAllVehicles()         { return _vehicles; },
    getVehicleById(id)      { return _vehicles.find(v => v.id === id) || null; },
    getRentalsForVehicle(vehicleId) { return _rentals.filter(r => r.vehicleId === vehicleId); },
    getMaintenanceQueries() {
      if (!_orgScope) return _maintenance;
      const ids = new Set(_vehicles.filter(v => v.orgId === _orgScope).map(v => v.id));
      return _maintenance.filter(q => ids.has(q.vehicleId));
    },
    getRentals()            { return _orgScope ? _rentals.filter(r => r.org === _orgScope) : _rentals; },
    getAllRentals()          { return _rentals; },
    getRentalById(id)       { return _rentals.find(r => r.id === id) || null; },
    getCatalogItems()       { return _catalogItems; },
    // Note: RentalApplication records aren't org-tagged in the schema, so this
    // is intentionally unscoped (same precedent as getOrgRequests()).
    getRentalApplications() { return _rentalApplications; },

    // ── Auth-time verification (deliberately bypasses the cache/init()
    //    flow above) ────────────────────────────────────────────────────────
    // Used by auth.js right after a Firebase Auth login/signup succeeds, to
    // confirm the account actually has a row in the real database — not the
    // in-memory cache other pages read after DC_DATA.init(), since that could
    // be up to CACHE_TTL stale and this needs a fresh answer at the moment
    // of sign-in. Bridges Firebase Auth to Postgres by email — the same key
    // functions/controllers/authController.js's resolveTargetUid uses,
    // since Data Connect has no notion of a Firebase UID to query by.
    // Uses the dedicated /api/data/user-by-email endpoint rather than the
    // generic authProxy() above — GetUserByEmail is admin-only in
    // registry/dataOperations.js, but this specific lookup also needs to
    // work for a non-admin checking their OWN email (e.g. right after
    // login/signup, before any role is established) — a rule that doesn't
    // fit the flat role-list the generic proxy enforces, so the backend
    // gives it its own route with an "own email, or admin" check instead.
    async getUserByEmailLive(email) {
      if (typeof EC_API === 'undefined') throw new Error('Not signed in.');
      const res = await EC_API.authFetch('/data/user-by-email?email=' + encodeURIComponent(email));
      if (!res.ok) return null;
      const json = await res.json();
      return json.user || null;
    },

    // Creates the Postgres User row for a brand-new Firebase Auth signup —
    // Firebase Auth account creation alone never touched the database
    // before this, so a self-signup had no corresponding row for
    // getUserByEmailLive to find on their very next login. Goes through
    // /api/data/register-self rather than the generic CreateUser proxy
    // (admin-only in the registry) — that endpoint hardcodes role USER and
    // no organisation server-side, so this can never be used to self-grant
    // anything more than a bare account; an admin assigns both afterward.
    async createUserLive(name, email) {
      if (typeof EC_API === 'undefined') throw new Error('Not signed in.');
      const res = await EC_API.authFetch('/data/register-self', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        let body = '';
        try { body = await res.text(); } catch { /**/ }
        throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
      }
      const json = await res.json();
      return json.user || (await this.getUserByEmailLive(email));
    },

    // ── Org Request mutations ───────────────────────────────────────────────
    async addOrgRequest(data) {
      await mutate('CreateOrgRequest', {
        orgName:      data.orgName,
        sector:       data.sector,
        regId:        data.regId,
        contactName:  data.contactName,
        contactEmail: data.contactEmail,
        domain:       data.domain,
      });
      await _loadOrgRequests();
    },

    async approveOrgRequest(id, notes = '') {
      const req = _orgRequests.find(r => r.id === id);
      if (!req) return null;
      await mutate('CreateOrganisation', {
        name:         req.orgName,
        sector:       req.sector,
        regId:        req.regId,
        contactEmail: req.contactEmail,
        domain:       req.domain,
        logoUrl:      null,
      });
      // Reload orgs to find the newly created one by its unique regId
      await _loadOrgs(); saveCache();
      const newOrg = _orgs.find(o => o.regId === req.regId);
      const orgId = newOrg?.id || null;
      await mutate('ApproveOrgRequest', {
        id,
        resultingOrgId: orgId,
        adminNotes:     notes || null,
      });
      await _loadOrgRequests();
      return orgId;
    },

    async rejectOrgRequest(id, notes = '') {
      await mutate('RejectOrgRequest', { id, adminNotes: notes || null });
      await _loadOrgRequests();
    },

    // ── Org mutations ───────────────────────────────────────────────────────
    async suspendOrg(id) {
      await mutate('UpdateOrgStatus', { id, status: 'SUSPENDED' });
      await _loadOrgs(); saveCache();
    },

    async reinstateOrg(id) {
      await mutate('UpdateOrgStatus', { id, status: 'ACTIVE' });
      await _loadOrgs(); saveCache();
    },

    // ── User mutations ──────────────────────────────────────────────────────
    async addUser(data) {
      await mutate('CreateUser', {
        name:           data.name,
        email:          data.email,
        role:           (data.role || 'user').toUpperCase(),
        organisationId: data.orgId || null,
        avatarUrl:      data.avatarUrl || null,
      });
      await _loadUsers(); saveCache();
    },

    async toggleUserStatus(id) {
      const u = _users.find(u => u.id === id);
      if (!u) return;
      const newStatus = u.status === 'active' ? 'INACTIVE' : 'ACTIVE';
      await mutate('UpdateUserStatus', { id, status: newStatus });
      await _loadUsers(); saveCache();
    },

    // Self-service (own profile) or admin (editing another user) — the
    // backend's ownField check in registry/dataOperations.js allows both;
    // it rejects anyone else's id for a non-admin caller.
    async updateUserProfile(id, data) {
      await mutate('UpdateUserProfile', {
        id,
        name:       data.name       ?? null,
        bio:        data.bio        ?? null,
        position:   data.position   ?? null,
        department: data.department ?? null,
        phone:      data.phone      ?? null,
        avatarUrl:  data.avatarUrl  ?? null,
      });
      await _loadUsers(); saveCache();
    },

    // Admin-only — enforced server-side by registry/dataOperations.js.
    async updateUserRole(id, role) {
      await mutate('UpdateUserRole', { id, role });
      await _loadUsers(); saveCache();
    },

    // ── Vehicle mutations ───────────────────────────────────────────────────
    async addVehicle(data) {
      await mutate('CreateVehicle', {
        make:              data.make,
        model:             data.model,
        year:              +data.year,
        type:              VEHICLE_TYPE[data.type] || 'OTHER',
        regPlate:          data.regPlate,
        description:       data.description || null,
        km:                +data.km,
        serviceIntervalKm: +data.serviceIntervalKm,
        nextServiceKm:     +data.nextServiceKm,
        imageUrl:          data.photo || data.imageUrl || null,
        organisationId:    data.orgId || _orgScope || null,
      });
      await _loadVehicles(); saveCache();
    },

    async updateVehicleStatus(id, status) {
      await mutate('UpdateVehicleStatus', {
        id,
        status: VEHICLE_STATUS[status] || status.toUpperCase(),
      });
      await _loadVehicles(); saveCache();
    },

    async updateVehicleKm(id, km) {
      await mutate('UpdateVehicleKm', { id, km: +km });
      await _loadVehicles(); saveCache();
    },

    async updateVehicleService(id, serviceIntervalKm, nextServiceKm) {
      await mutate('UpdateVehicleService', {
        id,
        nextServiceKm:     +nextServiceKm,
        serviceIntervalKm: +serviceIntervalKm,
      });
      await _loadVehicles(); saveCache();
    },

    async deleteVehicle(id) {
      await mutate('DeleteVehicle', { id });
      await _loadVehicles(); saveCache();
    },

    // Full-form save used by vehicle-detail.html's edit panel.
    async updateVehicleDetails(id, data) {
      await mutate('UpdateVehicleDetails', {
        id,
        make:              data.make,
        model:             data.model,
        year:              +data.year,
        type:              VEHICLE_TYPE[data.type] || data.type,
        regPlate:          data.regPlate,
        description:       data.description || null,
        km:                +data.km,
        serviceIntervalKm: +data.serviceIntervalKm,
        nextServiceKm:     +data.nextServiceKm,
        vin:               data.vin || null,
        trackingCompany:   data.trackingCompany || null,
        lastServiceDate:   data.lastServiceDate || null,
      });
      await _loadVehicles(); saveCache();
    },

    // ── Maintenance mutations ────────────────────────────────────────────────
    async addMaintenanceQuery(data) {
      const vehicleId = data.vehicleId;
      const vehicleLabel = data.vehicleLabel || (() => {
        const v = _vehicles.find(v => v.id === vehicleId);
        return v ? `${v.make} ${v.model} · ${v.regPlate}` : '';
      })();
      await mutate('CreateMaintenanceQuery', {
        vehicleId,
        vehicleLabel,
        type:           MAINT_TYPE[data.type]     || 'GENERAL',
        description:    data.description,
        priority:       MAINT_PRIO[data.priority]  || 'MEDIUM',
        loggedByName:   data.loggedBy || 'Admin',
        loggedByUserId: data.loggedByUserId || null,
        issueImageUrl:  data.issueImageUrl  || null,
      });
      await _loadMaintenance(); saveCache();
    },

    async updateQueryStatus(id, status) {
      await mutate('UpdateMaintenanceStatus', {
        id,
        status: MAINT_STATUS[status] || status.toUpperCase(),
      });
      await _loadMaintenance(); saveCache();
    },

    // ── Rental mutations ─────────────────────────────────────────────────────
    async addRental(data) {
      await mutate('CreateRental', {
        vehicleId:      data.vehicleId    || null,
        equipmentName:  data.equipment    || data.equipmentName,
        clientName:     data.client       || data.clientName,
        organisationId: data.org          || data.organisationId || null,
        startDate:      data.startDate,
        returnDate:     data.returnDate,
        valueZar:       +(data.value      || data.valueZar || 0),
        status:         RENTAL_STATUS[data.status] || 'PENDING',
        notes:          data.notes        || null,
      });
      await _loadRentals(); saveCache();
    },

    async updateRentalStatus(id, status) {
      await mutate('UpdateRentalStatus', {
        id,
        status: RENTAL_STATUS[status] || status.toUpperCase(),
      });
      await _loadRentals(); saveCache();
    },

    // Full-form save used by rental-detail.html's edit panel.
    async updateRental(id, data) {
      await mutate('UpdateRental', {
        id,
        startDate:  data.startDate,
        returnDate: data.returnDate,
        valueZar:   +data.value,
        status:     RENTAL_STATUS[data.status] || data.status.toUpperCase(),
        notes:      data.notes || null,
      });
      await _loadRentals(); saveCache();
    },

    async deleteRental(id) {
      await mutate('DeleteRental', { id });
      await _loadRentals(); saveCache();
    },
  };
})();
