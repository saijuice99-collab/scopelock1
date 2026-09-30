/**
 * ScopeLock Document Preview & Legal Output Formatter
 * Generates print-ready Statements of Work and Markdown exports.
 */

window.ScopeLockDocument = {
  renderHTML: function(project) {
    const symbol = project.symbol || '$';
    const totalFee = Number(project.totalFee) || 0;
    const deliverables = Array.isArray(project.deliverables) ? project.deliverables : [];
    const milestones = Array.isArray(project.milestones) ? project.milestones : [];
    const clauses = Array.isArray(project.clauses) ? project.clauses : [];

    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
      <div class="paper-document" id="rendered-sow-doc">
        <!-- Document Header -->
        <div class="doc-header-band">
          <div>
            <h1 class="doc-title-main">STATEMENT OF WORK</h1>
            <div class="doc-subhead-text">Binding Deliverables Schedule & Scope Protection Addendum</div>
          </div>
          <div style="text-align: right; font-size: 0.82rem; color: #475569;">
            <div><strong>Document Date:</strong> ${today}</div>
            <div><strong>Status:</strong> Legally Structured</div>
            <div><strong>Reference:</strong> SL-${Date.now().toString(36).toUpperCase().slice(-6)}</div>
          </div>
        </div>

        <!-- Contracting Parties -->
        <div class="parties-grid">
          <div>
            <div style="font-size: 0.72rem; color: #64748b; font-weight: 700; letter-spacing: 0.05em;">SERVICE PROVIDER</div>
            <div style="font-weight: 750; font-size: 1.05rem;">${escapeHTML(project.studioName || 'Studio Name')}</div>
            <div style="font-size: 0.85rem; color: #64748b;">${escapeHTML(project.studioEmail || 'provider@studio.com')}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; color: #64748b; font-weight: 700; letter-spacing: 0.05em;">CLIENT ORGANIZATION</div>
            <div style="font-weight: 750; font-size: 1.05rem;">${escapeHTML(project.clientName || 'Client Name')}</div>
            <div style="font-size: 0.85rem; color: #64748b;">${escapeHTML(project.clientEmail || 'procurement@client.com')}</div>
          </div>
        </div>

        <!-- Section 1: Overview & Compensation -->
        <div class="doc-section-block">
          <h2 class="doc-section-heading">1. PROJECT PURPOSE & FIXED COMPENSATION</h2>
          <p><strong>Project Title:</strong> ${escapeHTML(project.projectName || 'Unspecified Project')}</p>
          <p><strong>Timeline:</strong> ${project.startDate || 'Immediate'} through ${project.endDate || 'Target Completion'}</p>
          <p>
            <strong>Agreed Project Fee:</strong> ${symbol}${totalFee.toLocaleString()} (${project.currency || 'USD'}).
            Additional out-of-scope work requested by Client shall be executed via written Change Order billed at Contractor's standard rate of <strong>${symbol}${project.hourlyRate || 150}/hour</strong>.
          </p>
          <p><strong>Payment Terms:</strong> ${escapeHTML(project.paymentTerms || 'Standard Milestone Releases')}</p>
        </div>

        <!-- Section 2: Deliverables Matrix -->
        <div class="doc-section-block">
          <h2 class="doc-section-heading">2. ITEMIZED DELIVERABLES MATRIX & BOUNDARIES</h2>
          <table class="doc-legal-table">
            <thead>
              <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 25%;">Deliverable</th>
                <th style="width: 40%;">Acceptance Specifications</th>
                <th style="width: 15%;">Revision Cap</th>
                <th style="width: 15%;">Review SLA</th>
              </tr>
            </thead>
            <tbody>
              ${deliverables.length === 0 ? `
                <tr><td colspan="5" style="text-align: center; color: #94a3b8;">No deliverables specified.</td></tr>
              ` : deliverables.map((d, i) => `
                <tr>
                  <td><strong>0${i+1}</strong></td>
                  <td>
                    <div style="font-weight: 700; color: #0f172a;">${escapeHTML(d.title)}</div>
                    <div style="font-size: 0.75rem; color: #b45309; margin-top: 4px;">
                      <strong>Excludes:</strong> ${escapeHTML(d.exclusions || 'None explicitly defined')}
                    </div>
                  </td>
                  <td>${escapeHTML(d.description)}</td>
                  <td>${d.revisions || 2} consolidated rounds</td>
                  <td>${d.slaDays || 3} business days</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Section 3: Milestone Payment Schedule -->
        <div class="doc-section-block">
          <h2 class="doc-section-heading">3. MILESTONE INVOICING SCHEDULE</h2>
          <table class="doc-legal-table">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Milestone Deliverable</th>
                <th>Payment Release Trigger</th>
                <th>Percentage</th>
                <th>Amount Due</th>
              </tr>
            </thead>
            <tbody>
              ${milestones.map((m, i) => `
                <tr>
                  <td>Phase 0${i+1}</td>
                  <td><strong>${escapeHTML(m.name)}</strong></td>
                  <td>${escapeHTML(m.trigger)}</td>
                  <td>${m.percentage}%</td>
                  <td><strong>${symbol}${Math.round(totalFee * (m.percentage/100)).toLocaleString()}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Section 4: Protective Clauses -->
        <div class="doc-section-block">
          <h2 class="doc-section-heading">4. ENFORCEABLE PROTECTIVE CLAUSES</h2>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${clauses.map(cId => {
              const c = window.ScopeLockClauses.find(item => item.id === cId);
              if (!c) return '';
              return `
                <div style="background: #f8fafc; border-left: 3px solid #10b981; padding: 10px 14px; border-radius: 0 4px 4px 0;">
                  <div style="font-weight: 750; font-size: 0.88rem; color: #065f46; margin-bottom: 4px;">
                    § ${escapeHTML(c.title)}
                  </div>
                  <div style="font-size: 0.82rem; color: #334155; line-height: 1.55;">
                    ${escapeHTML(c.contractLanguage)}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Section 5: Signature Execution -->
        <div class="doc-signatures-grid">
          <div>
            <div class="signature-line"></div>
            <div style="font-weight: 750; font-size: 0.88rem;">Authorized Signature (${escapeHTML(project.studioName || 'Service Provider')})</div>
            <div style="font-size: 0.78rem; color: #64748b;">Date: ${today}</div>
          </div>
          <div>
            <div class="signature-line"></div>
            <div style="font-weight: 750; font-size: 0.88rem;">Authorized Client Acceptance (${escapeHTML(project.clientName || 'Client Organization')})</div>
            <div style="font-size: 0.78rem; color: #64748b;">Date: ____________________________________</div>
          </div>
        </div>

        <!-- Legal Disclaimer Note -->
        <div style="margin-top: 36px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 0.72rem; color: #94a3b8; text-align: center;">
          ScopeLock drafting aid. Requirements and enforceability vary across commercial jurisdictions. Consider review by qualified counsel.
        </div>
      </div>
    `;
  },

  toMarkdown: function(project) {
    const symbol = project.symbol || '$';
    let md = `# STATEMENT OF WORK (SOW)\n\n`;
    md += `**Project:** ${project.projectName || 'Project'}\n`;
    md += `**Client:** ${project.clientName || 'Client'} (${project.clientEmail || 'email'})\n`;
    md += `**Provider:** ${project.studioName || 'Provider'} (${project.studioEmail || 'email'})\n`;
    md += `**Total Fixed Fee:** ${symbol}${project.totalFee} ${project.currency} (Change orders billed at ${symbol}${project.hourlyRate}/hr)\n\n`;

    md += `## 1. Deliverables Matrix & Boundary Exclusions\n\n`;
    (project.deliverables || []).forEach((d, i) => {
      md += `### ${i+1}. ${d.title}\n`;
      md += `- **Scope:** ${d.description}\n`;
      md += `- **Revision Limit:** ${d.revisions} consolidated rounds\n`;
      md += `- **Review SLA:** ${d.slaDays} business days\n`;
      md += `- **Exclusions:** ${d.exclusions || 'None'}\n\n`;
    });

    md += `## 2. Milestone Payment Schedule\n\n`;
    (project.milestones || []).forEach((m, i) => {
      const amt = Math.round((project.totalFee * m.percentage) / 100);
      md += `- Phase ${i+1}: ${m.name} (${m.percentage}% = ${symbol}${amt}) [Trigger: ${m.trigger}]\n`;
    });

    md += `\n## 3. Protective Clauses\n\n`;
    (project.clauses || []).forEach(cId => {
      const c = window.ScopeLockClauses.find(x => x.id === cId);
      if (c) {
        md += `### ${c.title}\n${c.contractLanguage}\n\n`;
      }
    });

    return md;
  }
};

function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
