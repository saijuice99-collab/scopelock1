/**
 * ScopeLock Rules-Based Contract Risk Auditor
 * Real-time heuristic evaluation of contract loopholes, scope exposure, and legal defense readiness.
 * Includes automated 1-click remedy actions.
 */

window.ScopeLockRiskEngine = {
  audit: function(project) {
    let score = 100;
    const checks = [];

    const deliverables = Array.isArray(project.deliverables) ? project.deliverables : [];
    const clauses = Array.isArray(project.clauses) ? project.clauses : [];

    // Check 1: Empty or minimal deliverables
    if (deliverables.length === 0) {
      score -= 40;
      checks.push({
        passed: false,
        severity: 'CRITICAL',
        impact: -40,
        title: 'Zero Deliverables Specified',
        message: 'A Statement of Work with no line-item deliverables leaves scope completely open-ended and unshielded.',
        remedy: 'Add at least one itemized deliverable with specifications.',
        fixAction: 'add_deliverable'
      });
    }

    // Check 2: Unlimited Revisions or Missing Revision Limits
    let uncappedRevisions = 0;
    let missingRevisionLimits = 0;
    deliverables.forEach(d => {
      const rev = Number(d.revisions);
      const text = `${d.title || ''} ${d.description || ''}`.toLowerCase();
      if (/unlimited\s+rev/i.test(text) || rev > 5) {
        uncappedRevisions++;
      } else if (isNaN(rev) || rev === 0 || d.revisions === null || d.revisions === undefined) {
        missingRevisionLimits++;
      }
    });

    if (uncappedRevisions > 0) {
      score -= 30;
      checks.push({
        passed: false,
        severity: 'CRITICAL',
        impact: -30,
        title: 'Runaway Revision Exposure',
        message: `${uncappedRevisions} deliverable(s) specify unlimited or excessive revision cycles (>5 rounds). This causes catastrophic project timeline slips.`,
        remedy: 'Cap revisions strictly to 2 consolidated rounds per milestone.',
        fixAction: 'cap_revisions'
      });
    } else if (missingRevisionLimits > 0) {
      score -= 15;
      checks.push({
        passed: false,
        severity: 'HIGH',
        impact: -15,
        title: 'Undefined Revision Limits',
        message: `${missingRevisionLimits} deliverable(s) have undefined revision limits. Clients will assume feedback cycles are limitless.`,
        remedy: 'Assign a numeric revision cap (2 rounds) to every deliverable.',
        fixAction: 'cap_revisions'
      });
    } else {
      checks.push({
        passed: true,
        severity: 'LOW',
        impact: 0,
        title: 'Revision Limits Quantified',
        message: 'All deliverables have explicit, numeric revision bounds.'
      });
    }

    // Check 3: Missing Out-of-Scope Exclusions
    let missingExclusions = 0;
    deliverables.forEach(d => {
      if (!d.exclusions || d.exclusions.trim().length < 6) {
        missingExclusions++;
      }
    });

    if (missingExclusions > 0) {
      score -= Math.min(25, missingExclusions * 8);
      checks.push({
        passed: false,
        severity: 'HIGH',
        impact: -(Math.min(25, missingExclusions * 8)),
        title: 'Missing Scope Boundaries (Exclusions)',
        message: `${missingExclusions} deliverable(s) do not define what is explicitly excluded. Clients routinely assume third-party licenses, cloud hosting, and data migrations are free.`,
        remedy: 'Apply standard commercial exclusions to unshielded deliverables.',
        fixAction: 'add_default_exclusions'
      });
    } else {
      checks.push({
        passed: true,
        severity: 'LOW',
        impact: 0,
        title: 'Explicit Exclusions Defined',
        message: 'Deliverables establish clear boundary exclusions.'
      });
    }

    // Check 4: Review SLAs / Turnaround Windows
    let missingSLA = 0;
    deliverables.forEach(d => {
      if (!d.slaDays || Number(d.slaDays) < 1) {
        missingSLA++;
      }
    });

    if (missingSLA > 0) {
      score -= 15;
      checks.push({
        passed: false,
        severity: 'MODERATE',
        impact: -15,
        title: 'Undefined Client Review Window',
        message: `${missingSLA} deliverable(s) lack a defined turnaround SLA. Clients can take weeks to review without project status impact.`,
        remedy: 'Enforce standard 3 business day client review turnaround SLA.',
        fixAction: 'set_standard_sla'
      });
    } else {
      checks.push({
        passed: true,
        severity: 'LOW',
        impact: 0,
        title: 'Turnaround SLAs Activated',
        message: 'Every deliverable includes a defined acceptance window.'
      });
    }

    // Check 5: Essential Legal Defenses (Protective Clauses)
    const hasIP = clauses.includes('ip-upon-payment');
    const hasChangeOrder = clauses.includes('change-order-mandate');
    const hasLatePayment = clauses.includes('late-payment-interest');
    const hasClientDelay = clauses.includes('client-delay-sla');

    if (!hasIP) {
      score -= 20;
      checks.push({
        passed: false,
        severity: 'CRITICAL',
        impact: -20,
        title: 'Missing IP Contingency Protection',
        message: 'Without an IP-contingent clause, copyright ownership may pass upon creation. Clients can legally use your code or designs even if they default on final payment.',
        remedy: 'Incorporate "IP Transfer Contingent on Final Payment" clause.',
        fixAction: 'add_ip_clause'
      });
    } else {
      checks.push({
        passed: true,
        severity: 'LOW',
        impact: 0,
        title: 'IP Ownership Shielded',
        message: 'IP rights remain with contractor until 100% of invoices clear.'
      });
    }

    if (!hasChangeOrder) {
      score -= 15;
      checks.push({
        passed: false,
        severity: 'HIGH',
        impact: -15,
        title: 'No Change Order Protocol',
        message: 'Without an express Change Order mechanism, out-of-scope requests blur into original deliverables without budget authorization.',
        remedy: 'Incorporate "Mandatory Written Change Order Protocol" clause.',
        fixAction: 'add_co_clause'
      });
    } else {
      checks.push({
        passed: true,
        severity: 'LOW',
        impact: 0,
        title: 'Change-Order Protocol Enforced',
        message: 'All scope expansions require executed addenda.'
      });
    }

    if (!hasLatePayment) {
      score -= 10;
      checks.push({
        passed: false,
        severity: 'MODERATE',
        impact: -10,
        title: 'No Late Payment Recourse',
        message: 'Missing standard interest and work-suspension rights if client invoices fall delinquent.',
        remedy: 'Incorporate "Late Payment Penalty & Work Suspension" clause.',
        fixAction: 'add_late_clause'
      });
    }

    if (!hasClientDelay) {
      score -= 10;
      checks.push({
        passed: false,
        severity: 'MODERATE',
        impact: -10,
        title: 'No Dormancy Pause Clause',
        message: 'If the client ghosts for weeks, your studio schedule is left in limbo without rescheduling fee protection.',
        remedy: 'Incorporate "Client Inaction & Dormancy Restart Fee" clause.',
        fixAction: 'add_dormancy_clause'
      });
    }

    // Clamp score
    score = Math.max(12, Math.min(100, score));

    let riskCategory = 'LOW RISK';
    let statusClass = 'badge-brand';
    let scoreColor = 'var(--color-brand)';

    if (score < 50) {
      riskCategory = 'CRITICAL EXPOSURE';
      statusClass = 'badge-danger';
      scoreColor = 'var(--color-danger)';
    } else if (score < 70) {
      riskCategory = 'HIGH RISK';
      statusClass = 'badge-danger';
      scoreColor = 'var(--color-danger)';
    } else if (score < 85) {
      riskCategory = 'MODERATE RISK';
      statusClass = 'badge-warning';
      scoreColor = 'var(--color-warning)';
    }

    return {
      score,
      category: riskCategory,
      statusClass,
      scoreColor,
      checks
    };
  },

  applyFix: function(fixAction) {
    const project = window.ScopeLockState.project;
    let message = 'Contract protection updated';

    switch (fixAction) {
      case 'cap_revisions':
        (project.deliverables || []).forEach(d => {
          d.revisions = 2;
          d.title = d.title.replace(/unlimited\s+revisions?/gi, 'Capped Revisions (2 Rounds)');
          d.description = d.description.replace(/unlimited\s+revisions?/gi, '2 consolidated rounds');
        });
        message = 'All revisions capped strictly to 2 rounds';
        break;

      case 'add_default_exclusions':
        (project.deliverables || []).forEach(d => {
          if (!d.exclusions || d.exclusions.trim().length < 6) {
            d.exclusions = 'Third-party API licensing, legacy database migration, custom 3D WebGL assets';
          }
        });
        message = 'Standard commercial exclusions assigned';
        break;

      case 'set_standard_sla':
        (project.deliverables || []).forEach(d => {
          if (!d.slaDays || Number(d.slaDays) < 1) {
            d.slaDays = 3;
          }
        });
        message = 'Standard 3-day turnaround SLAs established';
        break;

      case 'add_ip_clause':
        window.ScopeLockState.toggleClause('ip-upon-payment', true);
        message = 'IP Contingency clause activated';
        break;

      case 'add_co_clause':
        window.ScopeLockState.toggleClause('change-order-mandate', true);
        message = 'Mandatory Change Order protocol activated';
        break;

      case 'add_late_clause':
        window.ScopeLockState.toggleClause('late-payment-interest', true);
        message = 'Late payment interest clause activated';
        break;

      case 'add_dormancy_clause':
        window.ScopeLockState.toggleClause('client-delay-sla', true);
        message = 'Client dormancy pause clause activated';
        break;

      case 'add_deliverable':
        window.ScopeLockState.addDeliverable({
          title: 'Core System Deliverable 01',
          description: 'Provide detailed functional specifications.',
          revisions: 2,
          slaDays: 3,
          exclusions: 'Third-party infrastructure licensing'
        });
        message = 'Standard deliverable milestone created';
        break;
    }

    if (window.ScopeLockState && typeof window.ScopeLockState.save === 'function') {
      window.ScopeLockState.save();
    }
    if (window.ScopeLockUI) {
      if (typeof window.ScopeLockUI.renderStudio === 'function') window.ScopeLockUI.renderStudio();
      if (typeof window.ScopeLockUI.renderDocument === 'function') window.ScopeLockUI.renderDocument();
      if (typeof window.ScopeLockUI.showToast === 'function') window.ScopeLockUI.showToast(message, 'success');
    }
  }
};
