/**
 * ScopeLock Change Order Engine
 * Generates binding addenda for scope modifications with automatic cost & deadline calculations.
 */

window.ScopeLockChangeOrders = {
  create: function(params, project) {
    const hours = Number(params.additionalHours) || 0;
    const rate = Number(params.hourlyRate) || (Number(project.hourlyRate) || 150);
    const fixed = Number(params.additionalFixedCost) || 0;
    const cost = (hours * rate) + fixed;
    const days = Number(params.additionalDays) || 0;

    const baseDate = project.endDate ? new Date(project.endDate) : new Date();
    const newDeadline = new Date(baseDate.getTime() + (days * 24 * 60 * 60 * 1000));

    return {
      id: 'CO-' + (project.changeOrders ? project.changeOrders.length + 1 : 1).toString().padStart(3, '0'),
      title: params.title || 'Scope Modification Addendum',
      reason: params.reason || 'Client-requested feature expansion beyond agreed Deliverables Matrix.',
      requestedDate: params.requestedDate || new Date().toISOString().split('T')[0],
      additionalHours: hours,
      hourlyRate: rate,
      additionalFixedCost: fixed,
      totalCost: cost,
      additionalDays: days,
      newDeadline: newDeadline.toISOString().split('T')[0],
      status: 'Pending Client Execution'
    };
  },

  renderDocument: function(co, project) {
    const symbol = project.symbol || '$';
    return `
      <div class="paper-document change-order-doc" id="co-doc-${co.id}">
        <div class="doc-header-band">
          <div>
            <h2 class="doc-title-main">CHANGE ORDER ADDENDUM</h2>
            <div class="doc-subhead-text">Addendum #${co.id} to Statement of Work: ${project.projectName || 'Project'}</div>
          </div>
          <div style="text-align: right; font-size: 0.85rem;">
            <div><strong>Date:</strong> ${co.requestedDate}</div>
            <div><strong>Status:</strong> ${co.status}</div>
          </div>
        </div>

        <div class="parties-grid">
          <div>
            <div style="font-size: 0.72rem; color: #64748b; font-weight: 700;">SERVICE PROVIDER</div>
            <div style="font-weight: 700;">${project.studioName || 'Studio'}</div>
            <div style="font-size: 0.82rem; color: #64748b;">${project.studioEmail || ''}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; color: #64748b; font-weight: 700;">CLIENT ORGANIZATION</div>
            <div style="font-weight: 700;">${project.clientName || 'Client'}</div>
            <div style="font-size: 0.82rem; color: #64748b;">${project.clientEmail || ''}</div>
          </div>
        </div>

        <div class="doc-section-block">
          <h3 class="doc-section-heading">1. SCOPE EXPANSION DESCRIPTION</h3>
          <p><strong>Modification Summary:</strong> ${co.title}</p>
          <p><strong>Operational Justification:</strong> ${co.reason}</p>
        </div>

        <div class="doc-section-block">
          <h3 class="doc-section-heading">2. FINANCIAL & SCHEDULE ADJUSTMENTS</h3>
          <table class="doc-legal-table">
            <thead>
              <tr>
                <th>Adjustment Parameter</th>
                <th>Quantity / Metric</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Additional Professional Hours</td>
                <td>${co.additionalHours} billable hours @ ${symbol}${co.hourlyRate}/hr</td>
                <td>${symbol}${(co.additionalHours * co.hourlyRate).toLocaleString()}</td>
              </tr>
              ${co.additionalFixedCost > 0 ? `
              <tr>
                <td>Fixed Fee / Asset Licenses</td>
                <td>Third-party or dedicated resources</td>
                <td>${symbol}${co.additionalFixedCost.toLocaleString()}</td>
              </tr>
              ` : ''}
              <tr>
                <td><strong>Total Additional Compensation</strong></td>
                <td>Due upon execution of this Change Order</td>
                <td><strong>${symbol}${co.totalCost.toLocaleString()} (${project.currency || 'USD'})</strong></td>
              </tr>
              <tr>
                <td>Schedule Deadline Extension</td>
                <td>+${co.additionalDays} business days to project calendar</td>
                <td>New Target Date: <strong>${co.newDeadline}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="doc-section-block">
          <h3 class="doc-section-heading">3. AUTHORIZATION & INCORPORATION</h3>
          <p style="font-size: 0.82rem; color: #475569;">
            This Change Order modifies the original Statement of Work referenced above. All other terms, conditions, warranties, and protective clauses of the original agreement remain in full force and effect.
          </p>
        </div>

        <div class="doc-signatures-grid">
          <div>
            <div class="signature-line"></div>
            <div style="font-weight: 700; font-size: 0.85rem;">Authorized Service Provider (${project.studioName || 'Studio'})</div>
            <div style="font-size: 0.78rem; color: #64748b;">Date: ${co.requestedDate}</div>
          </div>
          <div>
            <div class="signature-line"></div>
            <div style="font-weight: 700; font-size: 0.85rem;">Client Acceptance (${project.clientName || 'Client'})</div>
            <div style="font-size: 0.78rem; color: #64748b;">Date: ___________________________</div>
          </div>
        </div>
      </div>
    `;
  }
};
