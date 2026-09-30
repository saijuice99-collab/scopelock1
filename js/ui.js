/**
 * ScopeLock Enhanced UI Renderer & Interaction Engine
 * Renders views, reactive DOM updates, powers the Hero sandbox,
 * 1-click legal remedies, workflow stepper, and change-order pitch copies.
 */

window.ScopeLockUI = {
  init: function() {
    this.bindHeroSandbox();
    this.bindStudioInputs();
    this.bindCalculator();
    this.bindClauseSearch();
    this.renderAll();

    // Subscribe to state changes
    window.ScopeLockState.subscribe(() => {
      this.renderStudio();
      this.renderDocument();
    });
  },

  onRouteEnter: function(routeId) {
    if (routeId === 'studio') {
      this.renderStudio();
      this.renderDocument();
    } else if (routeId === 'client-portal') {
      this.renderClientPortal();
    } else if (routeId === 'clauses') {
      this.renderClausesLibrary();
    } else if (routeId === 'calculator') {
      this.updateCalculatorResults();
    }
  },

  // =========================================================================
  // HERO INTERACTIVE RISK SANDBOX
  // =========================================================================
  sandboxState: {
    unlimitedRevisions: true,
    netTerms: '60',
    exclusionsDefined: false,
    ipShielded: false
  },

  bindHeroSandbox: function() {
    const updateSandbox = () => {
      let score = 25;
      let leakage = '$11,400/yr';
      let status = 'CRITICAL EXPOSURE';
      let statusColor = 'var(--color-danger)';
      let badgeClass = 'badge-danger';
      let segmentClass = 'active-danger';

      if (!this.sandboxState.unlimitedRevisions) score += 30;
      if (this.sandboxState.netTerms === '7') score += 20;
      if (this.sandboxState.exclusionsDefined) score += 15;
      if (this.sandboxState.ipShielded) score += 25;

      if (score >= 85) {
        status = 'FORTIFIED & SHIELDED';
        statusColor = 'var(--color-brand)';
        badgeClass = 'badge-brand';
        segmentClass = 'active-brand';
        leakage = '$0 (Protected)';
      } else if (score >= 60) {
        status = 'MODERATE EXPOSURE';
        statusColor = 'var(--color-warning)';
        badgeClass = 'badge-warning';
        segmentClass = 'active-warning';
        leakage = '$4,200/yr';
      }

      const scoreEl = document.getElementById('sandbox-score');
      const statusEl = document.getElementById('sandbox-status');
      const leakageEl = document.getElementById('sandbox-leakage');

      if (scoreEl) {
        scoreEl.innerText = score;
        scoreEl.style.color = statusColor;
      }
      if (statusEl) {
        statusEl.innerHTML = `<span class="badge ${badgeClass}">${status}</span>`;
      }
      if (leakageEl) {
        leakageEl.innerText = leakage;
        leakageEl.style.color = statusColor;
      }

      // Update segment bars
      const segContainer = document.getElementById('sandbox-segments');
      if (segContainer) {
        const activeCount = Math.round((score / 100) * 10);
        segContainer.innerHTML = Array.from({ length: 10 }, (_, i) => `
          <div class="segment-pill ${i < activeCount ? segmentClass : ''}"></div>
        `).join('');
      }
    };

    const chkRev = document.getElementById('sb-unlimited-rev');
    const chkNet = document.getElementById('sb-net-terms');
    const chkExcl = document.getElementById('sb-exclusions');
    const chkIp = document.getElementById('sb-ip-shield');

    if (chkRev) {
      chkRev.addEventListener('change', (e) => {
        this.sandboxState.unlimitedRevisions = e.target.checked;
        updateSandbox();
      });
    }
    if (chkNet) {
      chkNet.addEventListener('change', (e) => {
        this.sandboxState.netTerms = e.target.checked ? '7' : '60';
        updateSandbox();
      });
    }
    if (chkExcl) {
      chkExcl.addEventListener('change', (e) => {
        this.sandboxState.exclusionsDefined = e.target.checked;
        updateSandbox();
      });
    }
    if (chkIp) {
      chkIp.addEventListener('change', (e) => {
        this.sandboxState.ipShielded = e.target.checked;
        updateSandbox();
      });
    }

    updateSandbox();
  },

  // =========================================================================
  // STUDIO WORKSTATION BINDINGS
  // =========================================================================
  bindStudioInputs: function() {
    const bindText = (id, prop) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          window.ScopeLockState.updateProjectField(prop, e.target.value);
        });
      }
    };

    bindText('input-proj-name', 'projectName');
    bindText('input-client-name', 'clientName');
    bindText('input-client-email', 'clientEmail');
    bindText('input-studio-name', 'studioName');
    bindText('input-studio-email', 'studioEmail');
    bindText('input-start-date', 'startDate');
    bindText('input-end-date', 'endDate');
    bindText('input-payment-terms', 'paymentTerms');

    const numFee = document.getElementById('input-total-fee');
    if (numFee) {
      numFee.addEventListener('input', (e) => {
        window.ScopeLockState.updateProjectField('totalFee', Number(e.target.value) || 0);
      });
    }

    const numRate = document.getElementById('input-hourly-rate');
    if (numRate) {
      numRate.addEventListener('input', (e) => {
        window.ScopeLockState.updateProjectField('hourlyRate', Number(e.target.value) || 150);
      });
    }

    const selCurr = document.getElementById('select-currency');
    if (selCurr) {
      selCurr.addEventListener('change', (e) => {
        const symbols = { USD: '$', EUR: '€', GBP: '£', INR: '₹', CAD: '$' };
        const val = e.target.value;
        window.ScopeLockState.updateProjectField('currency', val);
        window.ScopeLockState.updateProjectField('symbol', symbols[val] || '$');
      });
    }
  },

  renderStudio: function() {
    const project = window.ScopeLockState.project;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el && document.activeElement !== el) el.value = val || '';
    };

    setVal('input-proj-name', project.projectName);
    setVal('input-client-name', project.clientName);
    setVal('input-client-email', project.clientEmail);
    setVal('input-studio-name', project.studioName);
    setVal('input-studio-email', project.studioEmail);
    setVal('input-total-fee', project.totalFee);
    setVal('input-hourly-rate', project.hourlyRate);
    setVal('select-currency', project.currency);
    setVal('input-start-date', project.startDate);
    setVal('input-end-date', project.endDate);
    setVal('input-payment-terms', project.paymentTerms);

    this.renderDeliverablesTable();
    this.renderMilestones();
    this.renderClausesSelectors();
    this.renderRiskAuditor();
    this.renderChangeOrders();
  },

  // =========================================================================
  // DELIVERABLES MATRIX (EDITABLE DATA TABLE)
  // =========================================================================
  renderDeliverablesTable: function() {
    const container = document.getElementById('deliverables-matrix-tbody');
    if (!container) return;

    const deliverables = window.ScopeLockState.project.deliverables || [];
    const symbol = window.ScopeLockState.project.symbol || '$';

    if (deliverables.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 28px; color: var(--text-muted);">
            No deliverables defined. Click <strong>"+ Add Deliverable"</strong> or select an Industry Preset.
          </td>
        </tr>
      `;
      return;
    }

    let totalHours = 0;
    let totalPrice = 0;

    container.innerHTML = deliverables.map((del, idx) => {
      const hours = Number(del.estimatedHours) || 0;
      const price = Number(del.price) || 0;
      totalHours += hours;
      totalPrice += price;

      return `
        <tr data-del-id="${del.id}">
          <td data-label="Deliverable" style="width: 22%;">
            <input type="text" class="table-input" style="font-weight: 700;" value="${escapeHTML(del.title)}" placeholder="Deliverable Name" onchange="ScopeLockState.updateDeliverable('${del.id}', 'title', this.value)" />
          </td>
          <td data-label="Specifications" style="width: 30%;">
            <input type="text" class="table-input" value="${escapeHTML(del.description)}" placeholder="Technical specifications & formats" onchange="ScopeLockState.updateDeliverable('${del.id}', 'description', this.value)" />
          </td>
          <td data-label="Revisions" style="width: 10%;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <input type="number" min="0" max="10" class="table-input" style="width: 48px; text-align: center;" value="${del.revisions}" onchange="ScopeLockState.updateDeliverable('${del.id}', 'revisions', Number(this.value))" />
              <span style="font-size: 0.74rem; color: var(--text-muted);">rounds</span>
            </div>
          </td>
          <td data-label="Review SLA" style="width: 10%;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <input type="number" min="1" max="30" class="table-input" style="width: 44px; text-align: center;" value="${del.slaDays}" onchange="ScopeLockState.updateDeliverable('${del.id}', 'slaDays', Number(this.value))" />
              <span style="font-size: 0.74rem; color: var(--text-muted);">days</span>
            </div>
          </td>
          <td data-label="Hours / Fee" style="width: 12%;">
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 0.75rem; color: var(--text-secondary);">${hours} hrs</span>
              <span style="font-weight: 700; font-size: 0.82rem; color: var(--color-brand); font-family: var(--font-mono);">${symbol}${price.toLocaleString()}</span>
            </div>
          </td>
          <td data-label="Exclusions" style="width: 24%;">
            <input type="text" class="table-input" style="color: #fbbf24;" value="${escapeHTML(del.exclusions || '')}" placeholder="Out of scope (e.g. data migration)" onchange="ScopeLockState.updateDeliverable('${del.id}', 'exclusions', this.value)" />
          </td>
          <td data-label="Actions" style="text-align: right; width: 70px;">
            <div style="display: inline-flex; gap: 4px;">
              <button type="button" class="btn-icon" title="Duplicate Deliverable" onclick="ScopeLockState.duplicateDeliverable('${del.id}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
              <button type="button" class="btn-icon danger" title="Delete Deliverable" onclick="ScopeLockState.deleteDeliverable('${del.id}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Update matrix summary bar if present
    const summaryBar = document.getElementById('matrix-summary-stats');
    if (summaryBar) {
      summaryBar.innerHTML = `
        <span><strong>${deliverables.length}</strong> Deliverable Items</span>
        <span>•</span>
        <span><strong>${totalHours}</strong> Total Professional Hours</span>
        <span>•</span>
        <span>Allocated Value: <strong>${symbol}${totalPrice.toLocaleString()}</strong></span>
      `;
    }
  },

  renderMilestones: function() {
    const container = document.getElementById('milestones-container');
    if (!container) return;

    const project = window.ScopeLockState.project;
    const totalFee = project.totalFee || 0;
    const milestones = project.milestones || [];

    container.innerHTML = milestones.map((m, idx) => {
      const amount = Math.round((totalFee * (m.percentage / 100)));
      return `
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 10px 14px; border-radius: var(--radius-sm); margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
            <span class="badge badge-neutral">Phase 0${idx + 1}</span>
            <span style="font-weight: 650; font-size: 0.88rem;">${escapeHTML(m.name)}</span>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${escapeHTML(m.trigger)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 14px;">
            <span style="font-weight: 600; font-size: 0.86rem; color: var(--text-secondary);">${m.percentage}%</span>
            <span style="font-weight: 750; font-size: 0.95rem; color: var(--text-primary); font-family: var(--font-mono);">${project.symbol || '$'}${amount.toLocaleString()}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  renderClausesSelectors: function() {
    const container = document.getElementById('studio-clauses-list');
    if (!container) return;

    const selected = window.ScopeLockState.project.clauses || [];

    container.innerHTML = window.ScopeLockClauses.map(clause => {
      const isChecked = selected.includes(clause.id);
      return `
        <label style="display: flex; align-items: flex-start; gap: 10px; background: var(--bg-surface-elevated); border: 1px solid ${isChecked ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)'}; padding: 10px 14px; border-radius: var(--radius-sm); margin-bottom: 6px; cursor: pointer; transition: border-color var(--transition-fast);">
          <input type="checkbox" style="margin-top: 3px; accent-color: var(--color-brand);" ${isChecked ? 'checked' : ''} onchange="ScopeLockState.toggleClause('${clause.id}', this.checked)" />
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 650; font-size: 0.88rem;">${escapeHTML(clause.title)}</span>
              <span class="badge badge-neutral">${clause.category}</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">${escapeHTML(clause.plainEnglish)}</div>
          </div>
        </label>
      `;
    }).join('');
  },

  // =========================================================================
  // RISK AUDITOR WIDGET (SOPHISTICATED DASHBOARD + 1-CLICK FIXES)
  // =========================================================================
  renderRiskAuditor: function() {
    const container = document.getElementById('risk-auditor-widget');
    if (!container) return;

    const project = window.ScopeLockState.project;
    const audit = window.ScopeLockRiskEngine.audit(project);
    const activeSegments = Math.round((audit.score / 100) * 10);
    const segClass = audit.score >= 85 ? 'active-brand' : audit.score >= 65 ? 'active-warning' : 'active-danger';

    container.innerHTML = `
      <div class="risk-meter-box">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div style="font-size: 0.74rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; font-weight: 750;">CONTRACT SECURITY RISK INDEX</div>
            <div style="display: flex; align-items: baseline; gap: 4px; margin-top: 2px;">
              <span class="risk-num" style="color: ${audit.scoreColor};">${audit.score}</span>
              <span class="risk-max">/100</span>
            </div>
          </div>
          <div style="text-align: right;">
            <span class="badge ${audit.statusClass}">${audit.category}</span>
            <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 4px;">Dynamic Rules Engine</div>
          </div>
        </div>

        <!-- Segmented Glow Meter -->
        <div class="segmented-risk-bar">
          ${Array.from({ length: 10 }, (_, i) => `
            <div class="segment-pill ${i < activeSegments ? segClass : ''}"></div>
          `).join('')}
        </div>

        <!-- Vulnerability Flags & 1-Click Legal Remedies -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${audit.checks.map(c => `
            <div class="finding-row ${c.passed ? 'passed' : c.severity.toLowerCase()}">
              <div style="display: flex; align-items: flex-start; gap: 8px; flex: 1;">
                <span style="font-weight: 750; color: ${c.passed ? 'var(--color-brand)' : c.severity === 'CRITICAL' ? 'var(--color-danger)' : 'var(--color-warning)'}; margin-top: 1px;">
                  ${c.passed ? '✓' : '⚠'}
                </span>
                <div>
                  <div style="font-weight: 650; color: var(--text-primary); font-size: 0.84rem;">${escapeHTML(c.title)}</div>
                  <div style="color: var(--text-secondary); margin-top: 2px; font-size: 0.78rem;">${escapeHTML(c.message)}</div>
                </div>
              </div>

              ${!c.passed && c.fixAction ? `
                <button type="button" class="btn btn-brand btn-sm" style="flex-shrink: 0; padding: 4px 8px; font-size: 0.74rem;" onclick="ScopeLockRiskEngine.applyFix('${c.fixAction}')">
                  ⚡ Fix Now
                </button>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // =========================================================================
  // CHANGE ORDERS (WITH 1-CLICK CLIENT PITCH COPY)
  // =========================================================================
  renderChangeOrders: function() {
    const list = document.getElementById('change-orders-list');
    if (!list) return;

    const project = window.ScopeLockState.project;
    const orders = project.changeOrders || [];

    if (orders.length === 0) {
      list.innerHTML = `<div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 0.85rem;">No Change Orders issued. When a client requests additions, generate a formal addendum below.</div>`;
      return;
    }

    list.innerHTML = orders.map(co => `
      <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <div>
            <span class="badge badge-brand">${co.id}</span>
            <span style="font-weight: 700; font-size: 0.95rem; margin-left: 6px;">${escapeHTML(co.title)}</span>
          </div>
          <span style="font-weight: 800; font-size: 1.1rem; color: var(--color-brand); font-family: var(--font-mono);">${project.symbol || '$'}${co.totalCost.toLocaleString()}</span>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 10px;">${escapeHTML(co.reason)}</div>
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted);">
          <span>+${co.additionalHours} Hours | +${co.additionalDays} Days (New Target: ${co.newDeadline})</span>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="ScopeLockUI.copyChangeOrderPitch('${co.id}')" title="Copy respectful scope-protection message for Slack/email">
              📋 Copy Client Pitch
            </button>
            <span class="badge badge-warning">${co.status}</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  copyChangeOrderPitch: function(coId) {
    const project = window.ScopeLockState.project;
    const co = (project.changeOrders || []).find(c => c.id === coId);
    if (!co) return;

    const symbol = project.symbol || '$';
    const pitch = `Hi ${project.clientName || 'there'},\n\nWe would be excited to build "${co.title}"! Since this feature is outside our agreed Statement of Work deliverable matrix, here is our formal Change Order addendum (#${co.id}):\n\n• Estimated Additional Effort: ${co.additionalHours} hours\n• Additional Investment: ${symbol}${co.totalCost.toLocaleString()} (${project.currency || 'USD'})\n• Delivery Schedule Impact: +${co.additionalDays} business days (Revised completion target: ${co.newDeadline})\n\nPlease reply with approval so our team can schedule this without delaying our primary milestone deliverables.\n\nBest regards,\n${project.studioName || 'Your Project Team'}`;

    navigator.clipboard.writeText(pitch).then(() => {
      this.showToast('Copied professional Change-Order pitch to clipboard!', 'success');
    }).catch(() => {
      this.showToast('Clipboard copy unavailable', 'warning');
    });
  },

  // =========================================================================
  // LIVE DOCUMENT PREVIEW
  // =========================================================================
  renderDocument: function() {
    const container = document.getElementById('document-preview-container');
    if (!container) return;

    const project = window.ScopeLockState.project;
    container.innerHTML = window.ScopeLockDocument.renderHTML(project);
  },

  // =========================================================================
  // LEAKAGE ROI CALCULATOR
  // =========================================================================
  bindCalculator: function() {
    ['calc-project-val', 'calc-projects-year', 'calc-included-rev', 'calc-actual-rev', 'calc-hours-rev', 'calc-hourly-rate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.updateCalculatorResults());
      }
    });
  },

  updateCalculatorResults: function() {
    const getVal = (id, fallback) => {
      const el = document.getElementById(id);
      return el ? Number(el.value) || fallback : fallback;
    };

    const projectValue = getVal('calc-project-val', 7000);
    const projectsPerYear = getVal('calc-projects-year', 8);
    const includedRevisions = getVal('calc-included-rev', 2);
    const actualRevisions = getVal('calc-actual-rev', 5);
    const avgHoursPerRevision = getVal('calc-hours-rev', 4);
    const hourlyRate = getVal('calc-hourly-rate', 140);

    const setLabel = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.innerText = txt;
    };

    setLabel('display-val-project', `$${projectValue.toLocaleString()}`);
    setLabel('display-val-projects', `${projectsPerYear} projects`);
    setLabel('display-val-included', `${includedRevisions} rounds`);
    setLabel('display-val-actual', `${actualRevisions} rounds`);
    setLabel('display-val-hours', `${avgHoursPerRevision} hrs/round`);
    setLabel('display-val-rate', `$${hourlyRate}/hr`);

    const result = window.ScopeLockCalc.calculateLeakage({
      projectValue,
      projectsPerYear,
      includedRevisions,
      actualRevisions,
      avgHoursPerRevision,
      hourlyRate
    });

    const elLeakage = document.getElementById('calc-res-leakage');
    const elHours = document.getElementById('calc-res-hours');
    const elMargin = document.getElementById('calc-res-margin');
    const elRecovered = document.getElementById('calc-res-recovered');

    if (elLeakage) elLeakage.innerText = `$${result.annualRevenueLeakage.toLocaleString()}`;
    if (elHours) elHours.innerText = `${result.annualUnbilledHours} hrs/yr`;
    if (elMargin) elMargin.innerText = `${result.marginLossPercent}%`;
    if (elRecovered) elRecovered.innerText = `$${result.potentialRecoveredRevenue.toLocaleString()}`;
  },

  // =========================================================================
  // CLAUSE LIBRARY SEARCH & FILTER
  // =========================================================================
  bindClauseSearch: function() {
    const searchInput = document.getElementById('clause-search-input');
    const filterSelect = document.getElementById('clause-cat-filter');

    const update = () => {
      const q = (searchInput?.value || '').toLowerCase().trim();
      const cat = filterSelect?.value || 'ALL';
      this.renderClausesLibrary(q, cat);
    };

    if (searchInput) searchInput.addEventListener('input', update);
    if (filterSelect) filterSelect.addEventListener('change', update);
  },

  renderClausesLibrary: function(query = '', category = 'ALL') {
    const container = document.getElementById('clauses-library-grid');
    if (!container) return;

    let clauses = window.ScopeLockClauses;

    if (category !== 'ALL') {
      clauses = clauses.filter(c => c.category === category);
    }
    if (query) {
      clauses = clauses.filter(c => c.title.toLowerCase().includes(query) || c.plainEnglish.toLowerCase().includes(query) || c.riskMitigated.toLowerCase().includes(query));
    }

    if (clauses.length === 0) {
      container.innerHTML = `<div style="text-align: center; padding: 32px; color: var(--text-muted); grid-column: 1/-1;">No clauses found matching your search.</div>`;
      return;
    }

    container.innerHTML = clauses.map(c => `
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="badge badge-brand">${c.category}</span>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Drafting Aid</span>
          </div>
          <h3 style="font-size: 1.05rem; margin-bottom: 8px;">${escapeHTML(c.title)}</h3>
          <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 12px;">
            <strong>Plain English:</strong> ${escapeHTML(c.plainEnglish)}
          </p>
          <div style="background: #0d0f15; border: 1px solid var(--border-subtle); padding: 10px; border-radius: var(--radius-xs); font-size: 0.78rem; color: #94a3b8; font-family: var(--font-mono); max-height: 100px; overflow-y: auto; margin-bottom: 12px;">
            ${escapeHTML(c.contractLanguage)}
          </div>
          <div style="font-size: 0.78rem; color: #fbbf24; background: rgba(245, 158, 11, 0.08); padding: 6px 10px; border-radius: var(--radius-xs); margin-bottom: 14px;">
            ⚠ <strong>Eliminates Trap:</strong> ${escapeHTML(c.riskMitigated)}
          </div>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" style="width: 100%;" onclick="ScopeLockState.toggleClause('${c.id}', true); ScopeLockUI.showToast('Appended to active SOW'); ScopeLockRouter.navigate('studio');">
          + Add to Active Statement of Work
        </button>
      </div>
    `).join('');
  },

  // =========================================================================
  // CLIENT SIGN-OFF PORTAL
  // =========================================================================
  renderClientPortal: function() {
    const container = document.getElementById('client-portal-card-body');
    if (!container) return;

    const project = window.ScopeLockState.project;
    const deliverables = project.deliverables || [];
    const signoff = window.ScopeLockState.state.clientSignoff;

    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <span class="badge badge-brand">Client Verification Mode</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Simulated Client View</span>
        </div>

        <h2 style="font-size: 1.8rem; margin-bottom: 6px;">Deliverable Acceptance & Electronic Execution</h2>
        <p style="font-size: 0.92rem; margin-bottom: 24px;">
          Review the project specifications, acknowledge the explicit boundaries, and confirm commencement for <strong>${escapeHTML(project.projectName)}</strong>.
        </p>

        <!-- Acceptance Checkboxes -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.05rem; margin-bottom: 10px;">Itemized Scope Verification</h3>
          ${deliverables.map((d, i) => `
            <label style="display: flex; align-items: flex-start; gap: 12px; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 8px; cursor: pointer;">
              <input type="checkbox" id="client-check-${d.id}" style="margin-top: 4px; accent-color: var(--color-brand);" ${signoff.acceptedDeliverables[d.id] ? 'checked' : ''} onchange="ScopeLockUI.toggleClientCheck('${d.id}', this.checked)" />
              <div>
                <div style="font-weight: 700; font-size: 0.92rem;">${i+1}. ${escapeHTML(d.title)}</div>
                <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 2px;">${escapeHTML(d.description)}</div>
                <div style="font-size: 0.78rem; color: #fbbf24; margin-top: 4px;">
                  <strong>Out of Scope:</strong> ${escapeHTML(d.exclusions || 'None defined')}
                </div>
              </div>
            </label>
          `).join('')}
        </div>

        <!-- Electronic Signature Box -->
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 20px;">
          <h3 style="font-size: 1.05rem; margin-bottom: 12px;">Electronic Sign-Off & Authorization</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="portal-input-name">Signer Full Legal Name</label>
              <input type="text" id="portal-input-name" class="form-control" value="${escapeHTML(signoff.signerName || project.clientName || '')}" />
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="portal-input-email">Signer Corporate Email</label>
              <input type="email" id="portal-input-email" class="form-control" value="${escapeHTML(signoff.signerEmail || project.clientEmail || '')}" />
            </div>
          </div>

          <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 18px; cursor: pointer;">
            <input type="checkbox" id="portal-confirm-ack" ${signoff.confirmed ? 'checked' : ''} style="margin-top: 3px; accent-color: var(--color-brand);" />
            <span>I confirm that I have authority to bind this entity. I agree to the milestone payment schedule, revision limits, and acknowledge that out-of-scope modifications require an executed Change Order.</span>
          </label>

          <div style="display: flex; align-items: center; justify-content: space-between;">
            <button type="button" class="btn btn-primary" onclick="ScopeLockUI.submitClientSignoff()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Confirm Digital Sign-Off
            </button>
            ${signoff.signedAt ? `
              <span class="badge badge-brand">
                Executed on ${new Date(signoff.signedAt).toLocaleString()}
              </span>
            ` : ''}
          </div>

          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 14px; text-align: center;">
            Electronic acknowledgement prototype for demo and verification purposes.
          </div>
        </div>
      </div>
    `;
  },

  toggleClientCheck: function(id, checked) {
    const signoff = window.ScopeLockState.state.clientSignoff;
    signoff.acceptedDeliverables[id] = checked;
  },

  submitClientSignoff: function() {
    const nameInput = document.getElementById('portal-input-name');
    const emailInput = document.getElementById('portal-input-email');
    const ackInput = document.getElementById('portal-confirm-ack');

    if (!nameInput || !nameInput.value.trim()) {
      this.showToast('Please provide your full legal name', 'danger');
      return;
    }
    if (!ackInput || !ackInput.checked) {
      this.showToast('Please confirm the agreement checkbox', 'warning');
      return;
    }

    window.ScopeLockState.signAgreement({
      signerName: nameInput.value.trim(),
      signerEmail: emailInput ? emailInput.value.trim() : ''
    });

    this.showToast('Document executed with digital timestamp audit', 'success');
    this.renderClientPortal();
  },

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  showToast: function(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-indicator"></div>
      <div>${escapeHTML(message)}</div>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  },

  renderAll: function() {
    this.renderStudio();
    this.renderDocument();
    this.updateCalculatorResults();
    this.renderClausesLibrary();
  }
};
