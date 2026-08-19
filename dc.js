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
  const API_KEY = (typeof FIREBASE_CONFIG !== 'undefined') ? FIREBASE_CONFIG.apiKey : '';

  // ─── In-memory cache ────────────────────────────────────────────────────────
  let _orgs = [], _orgRequests = [], _users = [], _vehicles = [];
  let _maintenance = [], _rentals = [], _rentalApplications = [];
  let _roles = [];
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
        rentals: _rentals,
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
      _rentalApplications = c.rentalApplications || [];
      return true;
    } catch(_) { return false; }
  }

  // ─── Authenticated proxy (everything else) ─────────────────────────────────
  // Returns the full parsed response body — authProxy() below (used by every
  // ordinary query()/mutate() call) unwraps just `.data` from this; a couple
  // of special-case mutations (e.g. CompleteMockCreditCheck) carry extra
  // top-level fields the generic path doesn't know about, so they call this
  // directly instead.
  async function authProxyRaw(operationName, variables = {}) {
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
      if (_ready) window.showToast?.('error', 'Unable to complete request. Please try again.');
      throw new Error('Unable to complete request. Please try again.');
    }
    return res.json();
  }
  async function authProxy(operationName, variables = {}) {
    const json = await authProxyRaw(operationName, variables);
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
        // window.__ecTurnstileToken is set by the page's Turnstile widget
        // callback (see contact.html / apply-rental.html) when a site key
        // is configured; the server only checks it once a secret key is
        // configured too (functions/services/turnstile.js) — harmless
        // no-op field until both sides of that are set up.
        body: JSON.stringify({ operationName, variables, turnstileToken: window.__ecTurnstileToken || null }),
      });
    } catch {
      if (_ready) window.showToast?.('error', 'Network error. Check your connection and try again.');
      throw new Error('Network error. Check your connection and try again.');
    }
    if (!res.ok) {
      if (_ready) window.showToast?.('error', 'Unable to complete request. Please try again.');
      throw new Error('Unable to complete request. Please try again.');
    }
    const json = await res.json();
    return json.data || {};
  }

  // No guest/anonymous browsing anywhere in the product anymore — every
  // read goes through the authenticated proxy. Anonymous-submission forms
  // (rental applications, contact inquiries) still exist for people
  // reaching out before they have an account, hence PUBLIC_MUTATIONS below.
  const PUBLIC_MUTATIONS = new Set([
    'CreateOrgRequest', 'CreateRentalApplication', 'JoinWaitlist', 'CreateContactInquiry',
  ]);

  function query(operationName, variables = {}) {
    return authProxy(operationName, variables);
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
      id:             u.id,
      name:           u.name,
      email:          u.email,
      role:           lo(u.role),
      orgId:          u.organisation?.id   || null,
      orgName:        u.organisation?.name || null,
      status:         lo(u.status),
      avatarUrl:      u.avatarUrl || null,
      customRoleId:   u.customRole?.id   || null,
      customRoleName: u.customRole?.name || null,
      totpEnabled:    !!u.totpEnabled,
      createdAt:      toDate(u.createdAt),
    };
  }

  function normRole(r) {
    let permissions = {};
    try { permissions = JSON.parse(r.permissions || '{}'); } catch (_) {}
    return {
      id:          r.id,
      name:        r.name,
      description: r.description || '',
      permissions,
      createdAt:   toDate(r.createdAt),
      updatedAt:   toDate(r.updatedAt),
    };
  }

  function normVehicle(v) {
    return {
      id:               v.id,
      orgId:            v.organisation?.id || v.orgId || null,
      orgName:          v.organisation?.name || null,
      assignedDriverId:   v.assignedDriver?.id || null,
      assignedDriverName: v.assignedDriver?.name || null,
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
      // ── Marketplace listing — all nullable, see schema.gql's Vehicle doc
      // comment. supplierOrgId/Name is who owns/lists the equipment,
      // distinct from orgId/orgName above (which stays "who's scoped to
      // rent it," unchanged).
      province:            v.province || null,
      hireMode:            v.hireMode ? lo(v.hireMode) : null,
      operatorIncluded:    v.operatorIncluded ?? null,
      fuelIncluded:        v.fuelIncluded ?? null,
      transportIncluded:   v.transportIncluded ?? null,
      hourlyRate:          v.hourlyRate ?? null,
      dailyRate:           v.dailyRate ?? null,
      weeklyRate:          v.weeklyRate ?? null,
      monthlyRate:         v.monthlyRate ?? null,
      supplierOrgId:       v.supplierOrganisation?.id || null,
      supplierOrgName:     v.supplierOrganisation?.name || null,
      addedAt:          toDate(v.createdAt),
      updatedAt:        toDate(v.updatedAt),
    };
  }

  function normEquipmentRequest(r) {
    return {
      id:            r.id,
      requestedById:   r.requestedBy?.id || null,
      requestedByName: r.requestedBy?.name || null,
      vehicleType:   r.vehicleType,
      province:      r.province || null,
      hireMode:      r.hireMode ? lo(r.hireMode) : null,
      neededFrom:    r.neededFrom || null,
      neededTo:      r.neededTo || null,
      description:   r.description || null,
      status:        lo(r.status),
      createdAt:      toDate(r.createdAt),
    };
  }

  function normQuote(q) {
    return {
      id:               q.id,
      supplierOrgId:    q.supplierOrganisation?.id || null,
      supplierOrgName:  q.supplierOrganisation?.name || null,
      submittedById:    q.submittedBy?.id || null,
      submittedByName:  q.submittedBy?.name || null,
      submittedByEmail: q.submittedBy?.email || null,
      vehicleId:        q.vehicle?.id || null,
      vehicleLabel:     q.vehicle ? `${q.vehicle.make} ${q.vehicle.model}` : null,
      requestId:        q.request?.id || null,
      requestVehicleType: q.request?.vehicleType || null,
      requestProvince:  q.request?.province || null,
      requestStatus:    q.request?.status ? lo(q.request.status) : null,
      dailyRate:        q.dailyRate ?? null,
      weeklyRate:       q.weeklyRate ?? null,
      monthlyRate:      q.monthlyRate ?? null,
      message:          q.message || null,
      status:           lo(q.status),
      createdAt:         toDate(q.createdAt),
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
      // Source application, if this rental was auto-created from one (see
      // dataconnect/schema/schema.gql's Rental.application) — null for a
      // walk-in/manual rental. Used to synthesize "Application Submitted"/
      // "Application Reviewed" timeline entries without duplicating them
      // as RentalEvent rows.
      application: r.application ? {
        id:               r.application.id,
        ref:              r.application.ref,
        status:           lo(r.application.status),
        submittedAt:      r.application.submittedAt,
        reviewedAt:       r.application.reviewedAt || null,
        reviewedByName:   r.application.reviewedBy?.name || null,
        rejectionReason:  r.application.rejectionReason || null,
      } : null,
    };
  }

  function normRentalApplication(a) {
    return {
      id:            a.id,
      ref:           a.ref,
      applicantName: [a.firstName, a.lastName].filter(Boolean).join(' '),
      email:         a.email,
      phone:         a.phone,
      orgId:         a.organisation?.id || null,
      orgName:       a.organisation?.name || null,
      equipment:     a.equipmentName,
      estimatedCost: a.estimatedCost ?? null,
      vehicleId:     a.vehicle?.id || null,
      vehicleLabel:  a.vehicle ? `${a.vehicle.make} ${a.vehicle.model}` : null,
      startDate:     a.startDate,
      endDate:       a.endDate,
      status:        lo(a.status),
      // Credit-check state — see dataconnect/schema/schema.gql's
      // CreditCheckStatus enum and functions/services/creditCheck.js.
      creditCheckStatus:      lo(a.creditCheckStatus || 'NOT_REQUESTED'),
      creditCheckScore:       a.creditCheckScore ?? null,
      creditCheckFeeZar:      a.creditCheckFeeZar ?? 250,
      creditCheckRequestedAt: a.creditCheckRequestedAt ? toDate(a.creditCheckRequestedAt) : null,
      creditCheckCompletedAt: a.creditCheckCompletedAt ? toDate(a.creditCheckCompletedAt) : null,
      submittedAt:   toDate(a.submittedAt),
      updatedAt:     toDate(a.updatedAt),
    };
  }

  // ─── Enum converters ────────────────────────────────────────────────────────
  // Must match dataconnect/schema/schema.gql's VehicleType enum exactly —
  // any key not listed there makes CreateVehicle/UpdateVehicleDetails fail
  // server-side with a 500.
  const VEHICLE_TYPE = {
    'Heavy Truck': 'HEAVY_TRUCK',
    'Rigid Truck': 'RIGID_TRUCK',
    'Tipper Truck': 'TIPPER_TRUCK',
    'Side Tipper': 'SIDE_TIPPER',
    'Rigid Dump Truck': 'RIGID_DUMP_TRUCK',
    'Concrete Mixer': 'CONCRETE_MIXER',
    'Crane Truck': 'CRANE_TRUCK',
    'Road Sweeper': 'ROAD_SWEEPER',
    'Water Bowser': 'WATER_BOWSER',
    'Flatbed Truck': 'FLATBED_TRUCK',
    'Curtainsider Truck': 'CURTAINSIDER_TRUCK',
    'Refrigerated Truck': 'REFRIGERATED_TRUCK',
    'Tanker Truck': 'TANKER_TRUCK',
    'Car Transporter': 'CAR_TRANSPORTER',
    'Asphalt Paver': 'ASPHALT_PAVER',
    'Cold Planer': 'COLD_PLANER',
    'Concrete Pump': 'CONCRETE_PUMP',
    'Superlink': 'SUPERLINK',
    'Horse & Trailer': 'HORSE_TRAILER',
    'Flatbed Trailer': 'FLATBED_TRAILER',
    'Curtainsider Trailer': 'CURTAINSIDER_TRAILER',
    'Refrigerated Trailer': 'REFRIGERATED_TRAILER',
    'Tanker Trailer': 'TANKER_TRAILER',
    'Tipper Trailer': 'TIPPER_TRAILER',
    'Lowboy Trailer': 'LOWBOY_TRAILER',
    'Skeletal Trailer': 'SKELETAL_TRAILER',
    'Car Transporter Trailer': 'CAR_TRANSPORTER_TRAILER',
    'Excavator': 'EXCAVATOR',
    'Mini Excavator': 'MINI_EXCAVATOR',
    'Backhoe Loader (TLB)': 'BACKHOE_LOADER',
    'Wheel Loader': 'WHEEL_LOADER',
    'Compact Track Loader': 'COMPACT_TRACK_LOADER',
    'Skid Steer Loader': 'SKID_STEER_LOADER',
    'Bulldozer': 'BULLDOZER',
    'Motor Grader': 'MOTOR_GRADER',
    'Compactor': 'COMPACTOR',
    'Articulated Hauler (ADT)': 'ARTICULATED_HAULER',
    'Drill Rig': 'DRILL_RIG',
    'Crusher': 'CRUSHER',
    'Screening Plant': 'SCREENING_PLANT',
    'Crane': 'CRANE',
    'Mobile Crane': 'MOBILE_CRANE',
    'Tower Crane': 'TOWER_CRANE',
    'Crawler Crane': 'CRAWLER_CRANE',
    'Overhead Crane': 'OVERHEAD_CRANE',
    'Boom Truck': 'BOOM_TRUCK',
    'Forklift': 'FORKLIFT',
    'Rough Terrain Forklift': 'ROUGH_TERRAIN_FORKLIFT',
    'Order Picker': 'ORDER_PICKER',
    'Pallet Jack': 'PALLET_JACK',
    'Telehandler': 'TELEHANDLER',
    'Scissor Lift': 'SCISSOR_LIFT',
    'Boom Lift': 'BOOM_LIFT',
    'Straddle Carrier': 'STRADDLE_CARRIER',
    'Container Reachstacker': 'CONTAINER_REACHSTACKER',
    'High Reach Truck': 'HIGH_REACH_TRUCK',
    'Generator': 'GENERATOR',
    'Compressor': 'COMPRESSOR',
    'Light Tower': 'LIGHT_TOWER',
    'Water Pump': 'WATER_PUMP',
    'Tractor': 'TRACTOR',
    'Agricultural Implement': 'AGRICULTURAL_IMPLEMENT',
    'Irrigation Equipment': 'IRRIGATION_EQUIPMENT',
    'Van': 'VAN',
    'Pickup Truck': 'PICKUP_TRUCK',
    'Minibus': 'MINIBUS',
    'Other': 'OTHER',
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
  async function _loadRentalApplications() {
    const d = await query('ListAllRentalApplications');
    _rentalApplications = (d.rentalApplications || []).map(normRentalApplication);
  }
  async function _loadRoles() {
    const d = await query('ListAllRoles');
    _roles = (d.roles || []).map(normRole);
  }

  // ─── Public API ──────────────────────────────────────────────────────────────
  return {

    async submitRentalApplication(data) {
      await mutate('CreateRentalApplication', data);
    },

    async submitContactInquiry(data) {
      await mutate('CreateContactInquiry', data);
    },

    async init() {
      if (_ready) return;
      if (!API_KEY) {
        window.showToast?.('error', 'Service configuration issue. Please contact support.');
        setTimeout(() => { window.location.href = 'error'; }, 1800);
        throw new Error('Service configuration issue.');
      }
      // Serve from sessionStorage cache if fresh (avoids refetch on page navigation)
      if (loadCache()) { _ready = true; return; }
      // allSettled, not all — a custom-role caller (see dataconnect/schema/
      // schema.gql's Role type) may legitimately be authorized for only ONE
      // of these seven lists (e.g. view-only on admin-rentals) and gets a
      // correct, expected 403 on the rest. Promise.all would fail the whole
      // page load over that; each loader instead just leaves its array at
      // its initial [] on failure, and the page only errors out if NOTHING
      // came back at all (a real auth/network failure, not partial access).
      const results = await Promise.allSettled([
        _loadOrgs(), _loadOrgRequests(), _loadUsers(),
        _loadVehicles(), _loadMaintenance(), _loadRentals(),
        _loadRentalApplications(),
      ]);
      const failures = results.filter(r => r.status === 'rejected');
      if (failures.length) {
        failures.forEach(f => console.debug('[DC_DATA.init] partial load failure (expected for restricted access):', f.reason?.message));
      }
      if (failures.length === results.length) {
        window.showToast?.('error', 'Unable to load data. Please refresh or try again later.');
        setTimeout(() => { window.location.href = 'error'; }, 2000);
        throw failures[0].reason;
      }
      _ready = true;
      saveCache();
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
    // Used by dashboard-driver.html/driver-vehicles.html to find "my
    // vehicle" — real assignment (see schema.gql's Vehicle.assignedDriver)
    // instead of the old "first on_rent vehicle in the org" guess.
    getVehicleAssignedToDriver(driverId) { return _vehicles.find(v => v.assignedDriverId === driverId) || null; },

    // Cross-organisation marketplace browse — every AVAILABLE vehicle
    // platform-wide, not scoped to the caller's own org. Fetched fresh
    // on-demand (not part of init()'s cache, same precedent as
    // getAuditLogs()/getAllNotificationsForReports()) — this is a distinct
    // dataset from _vehicles, which stays org-scoped for
    // rent-equipment.html's existing behaviour.
    async getMarketplaceVehicles() {
      const d = await query('ListMarketplaceVehicles');
      return (d.vehicles || []).map(normVehicle);
    },

    // ── Equipment Requests / Quotes (self-service RFQ marketplace) ──
    // Fetched fresh on demand, same precedent as getMarketplaceVehicles
    // above — not part of init()'s cache. requestedById/
    // supplierOrganisationId are pass-it-yourself (EC_AUTH.current().dbId/
    // .orgId), same convention as getNotifications(userId) — the server
    // independently re-derives or overrides these itself, so a spoofed
    // value here is just rejected or ignored, never trusted.
    async createEquipmentRequest(data) {
      await mutate('CreateEquipmentRequest', {
        vehicleType: VEHICLE_TYPE[data.vehicleType] || 'OTHER',
        province:    data.province || null,
        hireMode:    data.hireMode ? data.hireMode.toUpperCase() : null,
        neededFrom:  data.neededFrom || null,
        neededTo:    data.neededTo || null,
        description: data.description || null,
      });
    },
    async getOpenEquipmentRequests() {
      const d = await query('ListOpenEquipmentRequests');
      return (d.equipmentRequests || []).map(normEquipmentRequest);
    },
    async getMyEquipmentRequests(requestedById) {
      if (!requestedById) return [];
      const d = await query('ListMyEquipmentRequests', { requestedById });
      return (d.equipmentRequests || []).map(normEquipmentRequest);
    },
    async getQuotesForRequest(requestId) {
      const d = await query('ListQuotesForRequest', { requestId });
      return (d.quotes || []).map(normQuote);
    },
    async getMyQuotes(supplierOrganisationId) {
      if (!supplierOrganisationId) return [];
      const d = await query('ListMyQuotes', { supplierOrganisationId });
      return (d.quotes || []).map(normQuote);
    },
    async submitQuote(data) {
      await mutate('SubmitQuote', {
        requestId:               data.requestId,
        supplierOrganisationId:  data.supplierOrganisationId,
        vehicleId:               data.vehicleId || null,
        dailyRate:   data.dailyRate === '' || data.dailyRate == null ? null : +data.dailyRate,
        weeklyRate:  data.weeklyRate === '' || data.weeklyRate == null ? null : +data.weeklyRate,
        monthlyRate: data.monthlyRate === '' || data.monthlyRate == null ? null : +data.monthlyRate,
        message:     data.message || null,
      });
    },
    async acceptQuote(id) {
      await mutate('AcceptQuote', { id });
    },
    getRentalsForVehicle(vehicleId) { return _rentals.filter(r => r.vehicleId === vehicleId); },
    getMaintenanceQueries() {
      if (!_orgScope) return _maintenance;
      const ids = new Set(_vehicles.filter(v => v.orgId === _orgScope).map(v => v.id));
      return _maintenance.filter(q => ids.has(q.vehicleId));
    },
    getRentals()            { return _orgScope ? _rentals.filter(r => r.org === _orgScope) : _rentals; },
    getAllRentals()          { return _rentals; },
    getRentalById(id)       { return _rentals.find(r => r.id === id) || null; },

    // Timeline for one rental — fetched fresh on demand (not part of the
    // main cache), same precedent as getRentalApplicationDetail() below.
    // organisationId is resolved from the already-cached rental itself; the
    // server always overrides it with the caller's own org for a
    // user/driver caller regardless of what's sent (see
    // registry/dataOperations.js's ListRentalEvents), so this only matters
    // for an admin caller, who needs the rental's REAL org for the match to
    // find anything.
    async getRentalEvents(rentalId) {
      const rental = _rentals.find(r => r.id === rentalId);
      if (!rental || !rental.org) return [];
      const d = await query('ListRentalEvents', { rentalId, organisationId: rental.org });
      return (d.rentalEvents || []).map(e => ({
        id:          e.id,
        type:        lo(e.type),
        description: e.description,
        fromStatus:  e.fromStatus ? lo(e.fromStatus) : null,
        toStatus:    e.toStatus ? lo(e.toStatus) : null,
        actorName:   e.actorUser?.name || null,
        createdAt:   e.createdAt,
      }));
    },

    // ── Notifications ── fetched fresh on demand (not part of the main
    // cache, same precedent as getRentalEvents above) — the sidebar bell
    // (sidebar.js) polls this itself rather than depending on init().
    // userId is the caller's own dbId (EC_AUTH.current().dbId), same
    // pass-it-yourself pattern used for applicantUserId elsewhere — the
    // server independently verifies it via registry/dataOperations.js's
    // ownField, so a spoofed value here is just rejected, never trusted.
    async getNotifications(userId) {
      if (!userId) return [];
      const d = await query('ListNotifications', { userId });
      return (d.notifications || []).map(n => ({
        id:        n.id,
        type:      lo(n.type),
        title:     n.title,
        body:      n.body,
        linkPath:  n.linkPath || null,
        read:      n.read,
        createdAt: n.createdAt,
      }));
    },
    async markNotificationRead(id) {
      await mutate('MarkNotificationRead', { id });
    },

    // Unscoped by DC_DATA.setOrgScope (same precedent as getOrgRequests()) —
    // admin-rentals.html's review queue needs to see every org's pending
    // applications regardless of the admin's own org. orgId IS present on
    // each row (see normRentalApplication) for callers that want to filter
    // themselves, e.g. admin-reports.html's org drilldown.
    getRentalApplications() { return _rentalApplications; },

    // Full detail (ID number, address, employment/financial info) for the
    // review modal — not in the list-shaped _rentalApplications cache, and
    // deliberately fetched fresh each time rather than cached, since this
    // is only opened right before a review decision.
    async getRentalApplicationDetail(id) {
      const d = await query('GetRentalApplicationById', { id });
      return d.rentalApplication || null;
    },

    // reviewedById is intentionally not a parameter here — the server
    // resolves and injects the caller's own user id (dataController.js's
    // injectOwnIdAs), so it can never be spoofed as a different admin.
    async reviewRentalApplication(id, status, rejectionReason) {
      await mutate('ReviewRentalApplication', { id, status, rejectionReason: rejectionReason || null });
      await _loadRentalApplications();
    },

    // ── Credit-check workflow ──────────────────────────────────────────────
    // score is intentionally not a parameter on completeMockCreditCheck —
    // the server always computes and injects it itself (see
    // dataController.js's CompleteMockCreditCheck special case); a client-
    // supplied score would just be overwritten.
    async requestCreditCheck(id) {
      await mutate('RequestCreditCheck', { id });
      await _loadRentalApplications();
    },
    // Returns the full XDS-shaped report (see functions/services/creditCheck.js)
    // — not persisted server-side beyond the score, so callers that want to
    // redisplay it later (without re-running the check) should cache it
    // client-side themselves.
    async completeMockCreditCheck(id) {
      const json = await authProxyRaw('CompleteMockCreditCheck', { id, score: 0 });
      await _loadRentalApplications();
      return json.creditCheckReport || null;
    },
    async declineCreditCheck(id) {
      await mutate('DeclineCreditCheck', { id, acknowledged: true });
      await _loadRentalApplications();
    },

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
    // profile carries name plus whatever KYC fields signup.html collected
    // (see REGISTER_SELF_SCHEMA for the accepted shape) — email/role/org are
    // never taken from it, same server-side guarantee as before.
    async createUserLive(profile, email) {
      if (typeof EC_API === 'undefined') throw new Error('Not signed in.');
      const res = await EC_API.authFetch('/data/register-self', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        throw new Error('Unable to complete request. Please try again.');
      }
      const json = await res.json();
      return json.user || (await this.getUserByEmailLive(email));
    },

    // Self-service account deletion — goes through /api/data/delete-own-account
    // rather than the generic mutation proxy for the same reason
    // createUserLive above bypasses it: the target row and the anonymized
    // replacement email are both resolved/generated server-side from the
    // caller's own verified token, never trusted from here.
    async deleteOwnAccount(reason) {
      if (typeof EC_API === 'undefined') throw new Error('Not signed in.');
      const res = await EC_API.authFetch('/data/delete-own-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Unable to delete account. Please try again.');
      }
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
    // customRoleId is applied as a second mutation after creation —
    // CreateUser itself has no such parameter (see functions/gql/mutations.gql),
    // so a freshly-created user is resolved back out of the reloaded list by
    // their (unique) email to get the id AssignUserCustomRole needs.
    async addUser(data) {
      await mutate('CreateUser', {
        name:           data.name,
        email:          data.email,
        role:           (data.role || 'user').toUpperCase(),
        organisationId: data.orgId || null,
        avatarUrl:      data.avatarUrl || null,
      });
      await _loadUsers();
      if (data.customRoleId) {
        const created = _users.find(u => u.email === data.email);
        if (created) {
          await mutate('AssignUserCustomRole', { id: created.id, customRoleId: data.customRoleId });
          await _loadUsers();
        }
      }
      saveCache();
    },

    async toggleUserStatus(id) {
      const u = _users.find(u => u.id === id);
      if (!u) return;
      const newStatus = u.status === 'active' ? 'INACTIVE' : 'ACTIVE';
      await mutate('UpdateUserStatus', { id, status: newStatus });
      await _loadUsers(); saveCache();
    },

    // Admin-initiated delete — unlike deleteOwnAccount (self-service, see
    // auth.js), this doesn't anonymize the row: an admin removing someone
    // else's account is a deliberate, rarer action, not the "let me leave
    // and maybe come back" case that made freeing the email necessary for
    // self-delete. The email stays as-is; re-signup under it would need an
    // admin to free it explicitly if that's ever actually wanted.
    async deleteUserByAdmin(id) {
      await mutate('UpdateUserStatus', { id, status: 'DELETED' });
      await _loadUsers(); saveCache();
    },

    // Self-service (own profile) or admin (editing another user) — the
    // backend's ownField check in registry/dataOperations.js allows both;
    // it rejects anyone else's id for a non-admin caller.
    // Only fields actually present as keys in `data` are sent — profile.html
    // manages name/bio/position/department/phone/avatarUrl and always
    // supplies all of them (so leaving one blank there correctly clears it),
    // while apply-rental.html's post-submit sync-back only ever supplies the
    // KYC fields it collected. Neither caller should be able to accidentally
    // null out fields the OTHER one owns just by omitting them.
    async updateUserProfile(id, data) {
      const vars = { id };
      [
        'name', 'bio', 'position', 'department', 'phone', 'avatarUrl',
        'idNumber', 'dateOfBirth', 'address', 'city', 'province', 'postalCode',
        'employmentStatus', 'employerName', 'monthlyIncome', 'yearsEmployed',
        'bank', 'accountType', 'outstandingCredit',
      ].forEach(f => { if (f in data) vars[f] = data[f]; });
      await mutate('UpdateUserProfile', vars);
      // Refreshes the cached admin user list so admin-orgs.html-style views
      // reflect the edit immediately — but this mutation is also callable by
      // any signed-in user editing their own profile (ownField-authorized),
      // for whom ListAllUsers is admin-only and would 403. Only refresh when
      // the admin dataset was already loaded (i.e. an admin context).
      if (_users.length) { try { await _loadUsers(); saveCache(); } catch {} }
    },

    // Admin-only — enforced server-side by registry/dataOperations.js.
    async updateUserRole(id, role) {
      await mutate('UpdateUserRole', { id, role });
      await _loadUsers(); saveCache();
    },

    // Admin-only. Sets/clears a user's additive custom role — see
    // dataconnect/schema/schema.gql's Role type. customRoleId may be null
    // to revoke a custom role, leaving the user's base role unchanged.
    async assignUserCustomRole(id, customRoleId) {
      await mutate('AssignUserCustomRole', { id, customRoleId: customRoleId || null });
      await _loadUsers(); saveCache();
    },

    // ── Audit logs (server-side, DB-backed) ──────────────────────────────
    // Not part of init()'s Promise.all — only admin-reports.html's Activity
    // tab needs this, and it's a live/paged view rather than a cached list.
    async getAuditLogs(limit = 200) {
      const d = await query('ListAuditLogs', { limit });
      return (d.auditLogs || []).map(l => ({
        id:        l.id,
        userId:    l.user?.id || null,
        userName:  l.userName || l.user?.name || 'System',
        userRole:  lo(l.userRole || ''),
        action:    l.action,
        details:   l.details || '',
        page:      l.page || '',
        createdAt: l.createdAt,
      }));
    },

    // Admin-wide notification engagement view for admin-reports.html's
    // Notifications tab — not part of init()'s Promise.all (same precedent
    // as getAuditLogs above), fetched lazily when that tab is opened.
    // Distinct from getNotifications(userId) above, which is self-scoped.
    async getAllNotificationsForReports(limit = 500) {
      const d = await query('ListAllNotifications', { limit });
      return (d.notifications || []).map(n => ({
        id:        n.id,
        userId:    n.user?.id || null,
        userName:  n.user?.name || null,
        type:      lo(n.type),
        title:     n.title,
        body:      n.body,
        read:      n.read,
        createdAt: n.createdAt,
      }));
    },

    // ── Custom roles ──────────────────────────────────────────────────────
    // Not part of init()'s Promise.all — only admin-roles.html and the Add
    // User / profile "Custom Role" pickers need this list, so it's fetched
    // on demand rather than on every admin page load.
    async loadRoles() { await _loadRoles(); },
    getRoles()        { return _roles; },
    getRoleById(id)   { return _roles.find(r => r.id === id) || null; },

    async addRole(data) {
      await mutate('CreateRole', {
        name:        data.name,
        description: data.description || null,
        permissions: JSON.stringify(data.permissions || {}),
        createdById: data.createdById || null,
      });
      await _loadRoles();
    },

    async updateRole(id, data) {
      await mutate('UpdateRole', {
        id,
        name:        data.name,
        description: data.description || null,
        permissions: JSON.stringify(data.permissions || {}),
      });
      await _loadRoles();
    },

    async deleteRole(id) {
      await mutate('DeleteRole', { id });
      await _loadRoles();
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

    // driverId may be null/empty to unassign.
    async assignDriverToVehicle(id, driverId) {
      await mutate('AssignDriverToVehicle', { id, assignedDriverId: driverId || null });
      await _loadVehicles(); saveCache();
    },

    // Marketplace listing terms — separate from updateVehicleDetails below,
    // matching the separate UpdateVehicleListing mutation (see its doc
    // comment in functions/gql/mutations.gql for why).
    async updateVehicleListing(id, data) {
      await mutate('UpdateVehicleListing', {
        id,
        province:              data.province || null,
        hireMode:               data.hireMode ? data.hireMode.toUpperCase() : null,
        operatorIncluded:      data.operatorIncluded ?? null,
        fuelIncluded:          data.fuelIncluded ?? null,
        transportIncluded:     data.transportIncluded ?? null,
        hourlyRate:            data.hourlyRate === '' || data.hourlyRate == null ? null : +data.hourlyRate,
        dailyRate:             data.dailyRate === '' || data.dailyRate == null ? null : +data.dailyRate,
        weeklyRate:            data.weeklyRate === '' || data.weeklyRate == null ? null : +data.weeklyRate,
        monthlyRate:           data.monthlyRate === '' || data.monthlyRate == null ? null : +data.monthlyRate,
        supplierOrganisationId: data.supplierOrganisationId || null,
      });
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
