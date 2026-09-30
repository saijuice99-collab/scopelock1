/**
 * ScopeLock Reactive State Store
 * Manages active project model, change-order lifecycle, and pub/sub subscribers.
 */

window.ScopeLockState = (function() {
  const defaultProject = {
    projectName: 'Full-Stack SaaS Platform MVP',
    clientName: 'HyperScale Systems, Inc.',
    clientEmail: 'procurement@hyperscale.io',
    studioName: 'Aero Digital Studio',
    studioEmail: 'contracts@aerostudio.io',
    projectType: 'Engineering',
    currency: 'USD',
    symbol: '$',
    totalFee: 9500,
    hourlyRate: 150,
    startDate: '2026-10-01',
    endDate: '2026-11-15',
    paymentTerms: '50% deposit, 25% staging freeze, 25% production deployment',
    deliverables: [],
    milestones: [],
    clauses: [],
    changeOrders: [],
    notes: 'All cloud hosting (AWS/Vercel) and third-party SaaS fees billed directly to Client.'
  };

  let state = {
    activeTab: 'studio',
    project: JSON.parse(JSON.stringify(defaultProject)),
    clientSignoff: {
      acceptedDeliverables: {},
      signerName: '',
      signerEmail: '',
      signerTitle: '',
      signedAt: null,
      confirmed: false
    }
  };

  const listeners = [];

  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }

  function notify(event, payload) {
    listeners.forEach(fn => {
      try {
        fn(event, payload, state);
      } catch (err) {
        console.error('State subscriber error:', err);
      }
    });
  }

  function save() {
    window.ScopeLockStorage.save(state.project);
    if (state.clientSignoff.signedAt) {
      window.ScopeLockStorage.saveSignoff(state.clientSignoff);
    }
  }

  function init() {
    const loaded = window.ScopeLockStorage.load();
    if (loaded && loaded.deliverables && loaded.deliverables.length) {
      state.project = loaded;
    } else {
      // Load default preset
      loadPreset('web-dev', false);
    }

    const signoff = window.ScopeLockStorage.loadSignoff();
    if (signoff) {
      state.clientSignoff = signoff;
    }
  }

  function loadPreset(presetId, shouldNotify = true) {
    const preset = window.ScopeLockPresets.find(p => p.id === presetId);
    if (!preset) return;

    state.project.projectName = preset.name;
    state.project.projectType = preset.category;
    state.project.currency = preset.currency;
    state.project.symbol = preset.symbol;
    state.project.totalFee = preset.totalFee;
    state.project.hourlyRate = preset.hourlyRate;
    state.project.paymentTerms = preset.paymentTerms;
    state.project.deliverables = JSON.parse(JSON.stringify(preset.deliverables));
    state.project.milestones = JSON.parse(JSON.stringify(preset.milestones));
    state.project.clauses = [...preset.clauses];

    save();
    if (shouldNotify) notify('preset:loaded', preset);
  }

  function updateProjectField(field, value) {
    state.project[field] = value;
    save();
    notify('project:updated', { field, value });
  }

  // Deliverables CRUD
  function addDeliverable(item) {
    const newItem = {
      id: 'del-' + Date.now().toString(36),
      title: item?.title || 'New Project Deliverable',
      description: item?.description || 'Provide functional acceptance specifications.',
      included: true,
      revisions: item?.revisions !== undefined ? item.revisions : 2,
      slaDays: item?.slaDays !== undefined ? item.slaDays : 3,
      estimatedHours: item?.estimatedHours || 16,
      price: item?.price || 2000,
      exclusions: item?.exclusions || 'Define explicit boundary exclusions.',
      status: 'Defined'
    };
    state.project.deliverables.push(newItem);
    save();
    notify('deliverable:added', newItem);
    return newItem;
  }

  function updateDeliverable(id, field, value) {
    const d = state.project.deliverables.find(item => item.id === id);
    if (d) {
      d[field] = value;
      save();
      notify('deliverable:updated', { id, field, value });
    }
  }

  function deleteDeliverable(id) {
    state.project.deliverables = state.project.deliverables.filter(item => item.id !== id);
    save();
    notify('deliverable:deleted', { id });
  }

  function duplicateDeliverable(id) {
    const original = state.project.deliverables.find(item => item.id === id);
    if (!original) return;
    const copy = JSON.parse(JSON.stringify(original));
    copy.id = 'del-' + Date.now().toString(36);
    copy.title = `${copy.title} (Copy)`;
    state.project.deliverables.push(copy);
    save();
    notify('deliverable:added', copy);
  }

  // Clauses toggles
  function toggleClause(clauseId, enable) {
    if (enable) {
      if (!state.project.clauses.includes(clauseId)) state.project.clauses.push(clauseId);
    } else {
      state.project.clauses = state.project.clauses.filter(id => id !== clauseId);
    }
    save();
    notify('clause:toggled', { clauseId, enable });
  }

  // Change Orders
  function addChangeOrder(params) {
    const co = window.ScopeLockChangeOrders.create(params, state.project);
    if (!state.project.changeOrders) state.project.changeOrders = [];
    state.project.changeOrders.unshift(co);
    save();
    notify('changeorder:added', co);
    return co;
  }

  function updateChangeOrderStatus(id, newStatus) {
    const co = (state.project.changeOrders || []).find(c => c.id === id);
    if (co) {
      co.status = newStatus;
      save();
      notify('changeorder:updated', co);
    }
  }

  // Client Signoff
  function signAgreement(signerDetails) {
    state.clientSignoff = {
      ...state.clientSignoff,
      ...signerDetails,
      signedAt: new Date().toISOString(),
      confirmed: true
    };
    save();
    notify('signoff:completed', state.clientSignoff);
  }

  return {
    get state() { return state; },
    get project() { return state.project; },
    init,
    subscribe,
    save,
    loadPreset,
    updateProjectField,
    addDeliverable,
    updateDeliverable,
    deleteDeliverable,
    duplicateDeliverable,
    toggleClause,
    addChangeOrder,
    updateChangeOrderStatus,
    signAgreement
  };
})();
