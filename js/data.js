/**
 * ScopeLock Production Data Engine
 * Industry-grade presets, protective contract clauses, and risk analysis heuristics.
 */

window.ScopeLockData = {
  presets: [
    {
      id: 'web-dev',
      name: 'Full-Stack Web Application',
      category: 'Engineering',
      summary: 'Production Next.js / TypeScript web app with responsive UI, auth, and database integration.',
      currency: 'USD',
      symbol: '$',
      totalFee: 8500,
      deliverables: [
        {
          id: 'del-1',
          title: 'Architecture & Schema Specification',
          description: 'Entity relationship diagram, API contract documentation, and hosting architecture blueprint.',
          revisions: 2,
          slaDays: 3,
          exclusions: 'On-premise infrastructure setup, legacy database migrations.'
        },
        {
          id: 'del-2',
          title: 'Frontend Responsive UI (5 Core Views)',
          description: 'Dashboard, Settings, Data Table, Detail View, and Authentication screens implemented in Tailwind/React.',
          revisions: 2,
          slaDays: 4,
          exclusions: 'Custom 3D WebGL assets, unapproved multi-language localization.'
        },
        {
          id: 'del-3',
          title: 'Backend API & Webhook Integrations',
          description: 'REST/GraphQL endpoints, Stripe subscription billing webhooks, and transactional email triggers.',
          revisions: 1,
          slaDays: 3,
          exclusions: 'Third-party API subscription costs, automated load testing exceeding 10k rps.'
        },
        {
          id: 'del-4',
          title: 'Staging Deployment & 14-Day UAT Period',
          description: 'Vercel/AWS staging deployment, environment variable configuration, and post-launch bug triage.',
          revisions: 1,
          slaDays: 2,
          exclusions: 'Feature additions during bug remediation, 24/7 SLA on-call pager duty.'
        }
      ],
      milestones: [
        { name: 'Initial Deposit & Discovery Kickoff', percentage: 40, trigger: 'Upon signing of this Statement of Work' },
        { name: 'Core Architecture & Staging Feature Freeze', percentage: 35, trigger: 'Delivery of staging environment URL for client review' },
        { name: 'Final Production Deployment & IP Transfer', percentage: 25, trigger: 'Production domain propagation and repository access handoff' }
      ],
      clauses: [
        'ip-upon-payment',
        'change-order-mandate',
        'client-delay-sla',
        'kill-fee-graduated',
        'revisions-cap'
      ]
    },
    {
      id: 'brand-identity',
      name: 'Brand Identity & Visual System',
      category: 'Design',
      summary: 'Comprehensive brand identity system including logo suite, typography, color palette, and asset guidelines.',
      currency: 'USD',
      symbol: '$',
      totalFee: 5200,
      deliverables: [
        {
          id: 'del-1',
          title: 'Strategic Moodboard & 2 Creative Directions',
          description: 'Visual competitive audit, market positioning boards, and 2 distinct conceptual directions.',
          revisions: 2,
          slaDays: 3,
          exclusions: 'Naming workshops, consumer focus group facilitation.'
        },
        {
          id: 'del-2',
          title: 'Logo Suite & Vector Assets',
          description: 'Primary mark, secondary badge, monogram, favicon, and responsive SVG/EPS vector packages.',
          revisions: 2,
          slaDays: 4,
          exclusions: 'Complex 3D rendering, patent/trademark filing fees.'
        },
        {
          id: 'del-3',
          title: 'Digital Brand Guidelines (32-Page Deck)',
          description: 'Font pairings, color hierarchy, clear space guidelines, social media kit templates (Figma).',
          revisions: 1,
          slaDays: 3,
          exclusions: 'Print collateral manufacturing and physical production management.'
        }
      ],
      milestones: [
        { name: 'Commencement Retainer', percentage: 50, trigger: 'Execution of agreement before design sprint starts' },
        { name: 'Direction Approval & Asset Finalization', percentage: 30, trigger: 'Written sign-off on chosen visual direction' },
        { name: 'Brand Asset Handoff & Rights Release', percentage: 20, trigger: 'Delivery of Figma archive and vector package' }
      ],
      clauses: [
        'ip-upon-payment',
        'revisions-cap',
        'portfolio-display',
        'change-order-mandate'
      ]
    },
    {
      id: 'ui-ux-sprint',
      name: 'SaaS UI/UX Product Sprint',
      category: 'Product',
      summary: 'High-fidelity Figma prototype with interactive design system tokens and component library.',
      currency: 'USD',
      symbol: '$',
      totalFee: 6800,
      deliverables: [
        {
          id: 'del-1',
          title: 'User Flow Architecture & Wireframes',
          description: 'Complete user onboarding, workspace navigation, and core conversion funnel wireframes.',
          revisions: 2,
          slaDays: 3,
          exclusions: 'Original user research interviews with compensated study participants.'
        },
        {
          id: 'del-2',
          title: 'High-Fidelity Interactive Figma Prototype',
          description: 'Desktop and mobile high-fidelity views with interactive click-through states and micro-interactions.',
          revisions: 2,
          slaDays: 4,
          exclusions: 'Frontend code production, custom video animations.'
        },
        {
          id: 'del-3',
          title: 'Design System Handoff & Token Specs',
          description: 'Auto-layout components, color variables, typography styles, and developer handoff documentation.',
          revisions: 1,
          slaDays: 2,
          exclusions: 'Component coding in React/Vue.'
        }
      ],
      milestones: [
        { name: 'Sprint Commitment Deposit', percentage: 50, trigger: 'Signing of SOW' },
        { name: 'Interactive Prototype Delivery', percentage: 30, trigger: 'Presentation of click-through prototype link' },
        { name: 'Design Token Handoff & Figma Transfer', percentage: 20, trigger: 'Final delivery of editable Figma team file' }
      ],
      clauses: [
        'ip-upon-payment',
        'change-order-mandate',
        'client-delay-sla',
        'revisions-cap'
      ]
    }
  ],

  clauseLibrary: [
    {
      id: 'ip-upon-payment',
      title: 'IP Transfer Contingent on Final Payment',
      category: 'Intellectual Property',
      riskLevel: 'Critical',
      plainEnglish: 'The client only owns the work once every invoice is paid in full. If they cancel or ghost, you retain 100% of the copyright.',
      enforceableText: 'All right, title, and interest in and to the final Deliverables created by Contractor under this Statement of Work shall transfer to Client strictly upon Contractor’s receipt of all outstanding fees, invoices, and expenses in full cleared funds. Prior to full satisfaction of all payments due, Contractor retains sole and exclusive intellectual property rights, and Client is granted solely a revocable, non-exclusive internal evaluation license.',
      trapAvoided: 'Clients taking your staging code or vector assets to a cheaper offshore contractor without paying the final 50% invoice.'
    },
    {
      id: 'change-order-mandate',
      title: 'Mandatory Written Change Order Protocol',
      category: 'Scope Control',
      riskLevel: 'High',
      plainEnglish: 'Any request outside the deliverable matrix requires a formal price and timeline amendment before work begins. No informal Slack/WhatsApp "can you just quickly add this" creep.',
      enforceableText: 'Any alteration, addition, or deviation from the specific Deliverables, specifications, or assumptions listed in this Statement of Work shall constitute a "Scope Modification." Contractor is under no obligation to commence or perform work on any Scope Modification until both Parties have executed a formal written Change Order specifying the additional compensation (billed at Contractor’s standard rate of $150/hr or mutually agreed fixed fee) and any resulting delivery schedule adjustment.',
      trapAvoided: 'Casual requests accumulating into dozens of unbilled hours and blown client expectations.'
    },
    {
      id: 'revisions-cap',
      title: 'Consolidated Revision Rounds & Acceptance Window',
      category: 'Workflow & Revisions',
      riskLevel: 'High',
      plainEnglish: 'Revisions must be delivered in consolidated batches within 5 business days, up to the defined limit. No piecemeal, endless feedback loops.',
      enforceableText: 'Client shall be entitled solely to the number of revision rounds explicitly specified per Deliverable. A "revision round" requires Client to compile and deliver a unified, single, written feedback document. Piecemeal comments shall not be processed. Client shall have five (5) business days following Deliverable submission to provide feedback; failure to provide feedback within said period shall constitute irrevocable and deemed acceptance of the Deliverable.',
      trapAvoided: 'Clients sending one email every morning asking for minor tweaks, dragging a 2-week sprint into a 6-month hostage situation.'
    },
    {
      id: 'client-delay-sla',
      title: 'Client Inaction & Dormancy Restart Fee',
      category: 'Schedules & SLA',
      riskLevel: 'Medium',
      plainEnglish: 'If the client goes silent for more than 14 days, the project pauses, timelines are no longer guaranteed, and a re-onboarding fee applies to resume.',
      enforceableText: 'In the event Client fails to provide required approvals, assets, feedback, or access credentials for a period exceeding ten (10) consecutive business days, the Project shall be designated "Dormant." Contractor reserves the right to reassign personnel and reschedule completion dates based on subsequent studio availability. Re-activating a Dormant project shall incur a mandatory Administrative Re-scheduling Fee equal to 10% of total project value.',
      trapAvoided: 'Ghosting clients resurfacing 4 months later demanding immediate weekend delivery when your schedule is already booked.'
    },
    {
      id: 'kill-fee-graduated',
      title: 'Graduated Termination & Kill Fee',
      category: 'Termination & Protection',
      riskLevel: 'Critical',
      plainEnglish: 'If the client cancels early for convenience, they forfeit the deposit and owe pro-rata for all hours or phases already completed.',
      enforceableText: 'Either Party may terminate this Agreement upon written notice. If Client terminates for convenience or Contractor terminates due to Client’s material breach, Client shall forfeit all non-refundable deposits and shall immediately remit payment for: (a) 100% of all milestones completed; (b) pro-rata compensation for work-in-progress up to termination date; plus (c) a 20% early termination liquidation charge to compensate for reserved studio capacity.',
      trapAvoided: 'Client abruptly terminating when you turned down other lucrative client contracts to preserve their timeline.'
    },
    {
      id: 'portfolio-display',
      title: 'Marketing & Attribution Rights',
      category: 'Promotional',
      riskLevel: 'Low',
      plainEnglish: 'You can showcase the finished designs or code in your portfolio, case studies, and awards once publicly launched.',
      enforceableText: 'Contractor retains the perpetual, worldwide, non-exclusive right to display, describe, and link to the completed Deliverables in Contractor’s portfolio, website, marketing materials, and industry awards, provided that no Client confidential information or unreleased proprietary trade secrets are disclosed.',
      trapAvoided: 'Clients claiming you cannot display public case studies of work you created.'
    },
    {
      id: 'late-payment-interest',
      title: 'Late Payment Penalty & Work Suspension',
      category: 'Financial Protection',
      riskLevel: 'High',
      plainEnglish: 'Invoices unpaid after 7 days accrue 1.5% monthly interest, and all active production halts until payment clears.',
      enforceableText: 'Invoices are strictly due Net-7 days from transmission date unless otherwise agreed in writing. Outstanding balances after seven (7) days shall accrue interest at the statutory rate of 1.5% per month (or the maximum allowed by law). Contractor reserves the right to immediately suspend all active production, staging server hosting, and milestone deliverables without liability if any invoice remains delinquent for more than five (5) days.',
      trapAvoided: 'Waiting 60 to 90 days for money while working overtime under client pressure.'
    }
  ],

  riskHeuristics: [
    {
      pattern: /unlimited\s+revisions?/i,
      severity: 'Critical',
      scoreImpact: -25,
      title: 'Fatal Risk: "Unlimited Revisions" Detected',
      message: 'Contracts offering unlimited revisions statistically incur 42% average project budget overruns. Replace with strict, quantified rounds (e.g. 2 rounds per deliverable).',
      suggestion: 'Revisions: 2 consolidated written rounds within 5 business days.'
    },
    {
      pattern: /until\s+(client|we)\s+(is|are)\s+satisfied/i,
      severity: 'Critical',
      scoreImpact: -30,
      title: 'Subjective Acceptance Trap Detected',
      message: 'Phrasing like "until satisfied" leaves delivery criteria to personal whims rather than objective, verifiable specifications.',
      suggestion: 'Tie completion to objective specifications: "Deliverables match approved Figma wireframes and functional specification doc."'
    },
    {
      pattern: /net\s*(60|90)/i,
      severity: 'High',
      scoreImpact: -20,
      title: 'Dangerous Cash Flow Lag: Extended Net Terms',
      message: 'Net-60 or Net-90 terms force you to act as an uncompensated bank for your client. Standard independent terms should never exceed Net-15 (or Net-7).',
      suggestion: 'Update payment terms to: Net-7 days or 50% advance before kickoff.'
    },
    {
      pattern: /asap|as\s+soon\s+as\s+possible/i,
      severity: 'Medium',
      scoreImpact: -10,
      title: 'Ambiguous Schedule Target',
      message: '"ASAP" is legally unenforceable and breeds mutual resentment. Use fixed calendar dates or sprint milestones.',
      suggestion: 'Define a fixed milestone deadline: "Estimated delivery: 14 business days from kickoff deposit."'
    },
    {
      pattern: /minor\s+changes|quick\s+tweaks/i,
      severity: 'Medium',
      scoreImpact: -15,
      title: 'Scope Creep Gateway: "Minor Changes"',
      message: 'Clients define "minor" very differently than engineers. A "quick tweak" often means a complete backend architectural rewrite.',
      suggestion: 'Require formal written change orders for any task not explicitly detailed in the Deliverables Matrix.'
    }
  ]
};
