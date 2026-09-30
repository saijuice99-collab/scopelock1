/**
 * ScopeLock Industry Presets
 * Field-tested templates for Engineering, Design, Product, Mobile & Consulting.
 */

window.ScopeLockPresets = [
  {
    id: 'web-dev',
    name: 'Full-Stack Web Application',
    category: 'Engineering',
    summary: 'Production Next.js / TypeScript web application with authentication, database schema, and staging UAT.',
    currency: 'USD',
    symbol: '$',
    totalFee: 9500,
    hourlyRate: 150,
    paymentTerms: '50% deposit, 25% staging freeze, 25% production deployment',
    deliverables: [
      {
        id: 'del-101',
        title: 'System Architecture & Schema Blueprint',
        description: 'PostgreSQL schema diagram, Prisma migration models, and OpenAPI REST endpoint specifications.',
        included: true,
        revisions: 2,
        slaDays: 3,
        estimatedHours: 24,
        price: 2400,
        exclusions: 'Legacy database migration scripts, on-premise hardware setup.',
        status: 'Defined'
      },
      {
        id: 'del-102',
        title: 'Core Application Frontend (6 Responsive Views)',
        description: 'Dashboard, Settings, Data Matrix, Detail Modal, User Authentication, and Billing Portal views in Tailwind CSS.',
        included: true,
        revisions: 2,
        slaDays: 4,
        estimatedHours: 38,
        price: 3800,
        exclusions: 'Custom 3D WebGL animations, multi-language internationalization.',
        status: 'Defined'
      },
      {
        id: 'del-103',
        title: 'Backend API & Stripe Subscription Webhooks',
        description: 'Stripe Checkout integration, customer portal webhooks, session auth, and transactional email triggers.',
        included: true,
        revisions: 1,
        slaDays: 3,
        estimatedHours: 22,
        price: 2200,
        exclusions: 'Third-party API license costs, automated load testing beyond 5k rps.',
        status: 'Defined'
      },
      {
        id: 'del-104',
        title: 'Staging Deployment & 14-Day UAT Remediation',
        description: 'Vercel / AWS staging deployment, env variable configuration, and bug remediation within scope boundaries.',
        included: true,
        revisions: 1,
        slaDays: 2,
        estimatedHours: 11,
        price: 1100,
        exclusions: 'Feature additions during QA, 24/7 on-call emergency paging.',
        status: 'Defined'
      }
    ],
    milestones: [
      { name: 'Kickoff Retainer & Discovery', percentage: 50, trigger: 'Execution of Statement of Work' },
      { name: 'Staging Environment Feature Freeze', percentage: 25, trigger: 'Delivery of staging URL for Client UAT review' },
      { name: 'Production Deployment & IP Transfer', percentage: 25, trigger: 'Repository transfer and production domain routing' }
    ],
    clauses: [
      'ip-upon-payment',
      'change-order-mandate',
      'revisions-cap',
      'client-delay-sla',
      'late-payment-interest',
      'third-party-expenses'
    ]
  },
  {
    id: 'ui-ux-sprint',
    name: 'SaaS UI/UX Product Sprint',
    category: 'Product',
    summary: 'High-fidelity Figma component system, user journeys, and interactive prototype.',
    currency: 'USD',
    symbol: '$',
    totalFee: 6500,
    hourlyRate: 140,
    paymentTerms: '50% advance, 50% on final vector file delivery',
    deliverables: [
      {
        id: 'del-201',
        title: 'User Flows & Wireframe Architecture',
        description: 'Information architecture diagrams, primary conversion funnel, and 12 low-fidelity wireframe flows.',
        included: true,
        revisions: 2,
        slaDays: 3,
        estimatedHours: 18,
        price: 1800,
        exclusions: 'Recruitment of paid qualitative user testing panels.',
        status: 'Defined'
      },
      {
        id: 'del-202',
        title: 'Interactive Figma Prototype (Desktop & Mobile)',
        description: 'Click-through interactive prototype with auto-layout components, variant states, and transitions.',
        included: true,
        revisions: 2,
        slaDays: 4,
        estimatedHours: 32,
        price: 3200,
        exclusions: 'Production frontend code writing, custom 3D illustration rendering.',
        status: 'Defined'
      },
      {
        id: 'del-203',
        title: 'Design System Tokens & Developer Handoff',
        description: 'Color semantic variables, typography scales, spacing tokens, and component state documentation.',
        included: true,
        revisions: 1,
        slaDays: 2,
        estimatedHours: 15,
        price: 1500,
        exclusions: 'Storybook React implementation.',
        status: 'Defined'
      }
    ],
    milestones: [
      { name: 'Commencement Retainer', percentage: 50, trigger: 'Signing of agreement prior to sprint kickoff' },
      { name: 'Prototype Sign-Off', percentage: 30, trigger: 'Delivery of interactive prototype walkthrough' },
      { name: 'Design Token Package Release', percentage: 20, trigger: 'Figma file ownership transfer' }
    ],
    clauses: [
      'ip-upon-payment',
      'change-order-mandate',
      'revisions-cap',
      'client-delay-sla',
      'portfolio-display'
    ]
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity & Visual System',
    category: 'Design',
    summary: 'Complete brand identity suite, logo marks, typography hierarchy, and brand guide.',
    currency: 'USD',
    symbol: '$',
    totalFee: 5400,
    hourlyRate: 135,
    paymentTerms: '50% deposit, 50% upon final vector package handoff',
    deliverables: [
      {
        id: 'del-301',
        title: 'Strategic Positioning & 2 Visual Directions',
        description: 'Competitor audit, moodboards, and 2 distinct concept directions presented in Figma.',
        included: true,
        revisions: 2,
        slaDays: 3,
        estimatedHours: 16,
        price: 1600,
        exclusions: 'Company naming ideation, trademark legal registration fees.',
        status: 'Defined'
      },
      {
        id: 'del-302',
        title: 'Logo Suite & Master Vector Package',
        description: 'Primary mark, secondary badge, monochrome mark, favicon, and exported SVG/EPS assets.',
        included: true,
        revisions: 2,
        slaDays: 3,
        estimatedHours: 24,
        price: 2400,
        exclusions: '3D packaging physical manufacturing oversight.',
        status: 'Defined'
      },
      {
        id: 'del-303',
        title: 'Comprehensive Brand Guidelines Deck',
        description: 'Color pairings, clear space rules, typography guidance, and digital social media templates.',
        included: true,
        revisions: 1,
        slaDays: 2,
        estimatedHours: 14,
        price: 1400,
        exclusions: 'Printed physical book binding.',
        status: 'Defined'
      }
    ],
    milestones: [
      { name: 'Project Retainer', percentage: 50, trigger: 'Execution of SOW' },
      { name: 'Creative Direction Sign-Off', percentage: 30, trigger: 'Client approval of selected concept' },
      { name: 'Vector Suite Release', percentage: 20, trigger: 'Handoff of master asset archive' }
    ],
    clauses: [
      'ip-upon-payment',
      'revisions-cap',
      'change-order-mandate',
      'portfolio-display'
    ]
  },
  {
    id: 'mobile-app',
    name: 'Mobile Application MVP',
    category: 'Engineering',
    summary: 'Cross-platform React Native / Expo mobile application for iOS and Android with API client.',
    currency: 'USD',
    symbol: '$',
    totalFee: 12000,
    hourlyRate: 160,
    paymentTerms: '40% kickoff, 30% TestFlight build, 30% store submission ready',
    deliverables: [
      {
        id: 'del-401',
        title: 'App Architecture & State Management',
        description: 'React Native navigation structure, persistent local storage, and secure authentication flow.',
        included: true,
        revisions: 2,
        slaDays: 3,
        estimatedHours: 28,
        price: 2800,
        exclusions: 'Apple / Google developer account enrollment fees.',
        status: 'Defined'
      },
      {
        id: 'del-402',
        title: 'Core App Screen Module (7 Screens)',
        description: 'Feed, Item Detail, Search & Filter, User Profile, Checkout/Action, and Notification center.',
        included: true,
        revisions: 2,
        slaDays: 4,
        estimatedHours: 42,
        price: 4200,
        exclusions: 'Custom BLE bluetooth hardware device firmware pairing.',
        status: 'Defined'
      },
      {
        id: 'del-403',
        title: 'Push Notifications & Deep Linking',
        description: 'Expo Notification service integration, universal links setup, and background task handlers.',
        included: true,
        revisions: 1,
        slaDays: 3,
        estimatedHours: 25,
        price: 2500,
        exclusions: 'Custom SMS gateway provider billing.',
        status: 'Defined'
      },
      {
        id: 'del-404',
        title: 'TestFlight / Play Internal Track Deployment',
        description: 'Build compilation, store compliance checklist verification, and staging distribution.',
        included: true,
        revisions: 1,
        slaDays: 2,
        estimatedHours: 25,
        price: 2500,
        exclusions: 'App Store review rejection appeals arising from Client business model.',
        status: 'Defined'
      }
    ],
    milestones: [
      { name: 'Commencement Retainer', percentage: 40, trigger: 'Agreement execution' },
      { name: 'TestFlight Release Build', percentage: 30, trigger: 'Delivery of working TestFlight invite' },
      { name: 'Production Build Transfer', percentage: 30, trigger: 'App binary handoff and store submission readiness' }
    ],
    clauses: [
      'ip-upon-payment',
      'change-order-mandate',
      'revisions-cap',
      'client-delay-sla',
      'late-payment-interest',
      'third-party-expenses'
    ]
  },
  {
    id: 'consulting',
    name: 'Technical Advisory & Architecture Audit',
    category: 'Consulting',
    summary: 'Senior engineering infrastructure audit, security vulnerability assessment, and modernization roadmap.',
    currency: 'USD',
    symbol: '$',
    totalFee: 4800,
    hourlyRate: 200,
    paymentTerms: '100% upfront retainer',
    deliverables: [
      {
        id: 'del-501',
        title: 'Codebase & Cloud Infrastructure Discovery',
        description: 'Read-only audit of Git repository, AWS/GCP cloud topology, database queries, and CI/CD pipelines.',
        included: true,
        revisions: 1,
        slaDays: 2,
        estimatedHours: 12,
        price: 2400,
        exclusions: 'Writing production bug fix code or active DevOps refactoring.',
        status: 'Defined'
      },
      {
        id: 'del-502',
        title: 'Architecture Evaluation & Vulnerability Report',
        description: 'Detailed written findings detailing bottleneck analysis, database indexing issues, and security flags.',
        included: true,
        revisions: 1,
        slaDays: 3,
        estimatedHours: 8,
        price: 1600,
        exclusions: 'Formal SOC2 certification auditing.',
        status: 'Defined'
      },
      {
        id: 'del-503',
        title: 'Executive Presentation & Q&A Session (90 Min)',
        description: 'Virtual presentation with engineering leadership walking through priority roadmap recommendations.',
        included: true,
        revisions: 0,
        slaDays: 2,
        estimatedHours: 4,
        price: 800,
        exclusions: 'Additional recurring weekly standup attendance.',
        status: 'Defined'
      }
    ],
    milestones: [
      { name: 'Full Advisory Retainer', percentage: 100, trigger: 'Due upon execution before audit scheduling' }
    ],
    clauses: [
      'ip-upon-payment',
      'change-order-mandate',
      'client-delay-sla',
      'third-party-expenses'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Project SOW',
    category: 'Custom',
    summary: 'Blank slate configured with baseline protective clauses and customizable deliverable matrix.',
    currency: 'USD',
    symbol: '$',
    totalFee: 5000,
    hourlyRate: 150,
    paymentTerms: '50% advance deposit, 50% on final milestone delivery',
    deliverables: [
      {
        id: 'del-601',
        title: 'Core Deliverable 01',
        description: 'Define clear technical or creative specifications.',
        included: true,
        revisions: 2,
        slaDays: 3,
        estimatedHours: 20,
        price: 2500,
        exclusions: 'Define explicit out-of-scope boundaries.',
        status: 'Defined'
      },
      {
        id: 'del-602',
        title: 'Core Deliverable 02',
        description: 'Define acceptance parameters and delivery format.',
        included: true,
        revisions: 2,
        slaDays: 3,
        estimatedHours: 20,
        price: 2500,
        exclusions: 'Define explicit out-of-scope boundaries.',
        status: 'Defined'
      }
    ],
    milestones: [
      { name: 'Initial Deposit', percentage: 50, trigger: 'Execution of agreement' },
      { name: 'Final Acceptance', percentage: 50, trigger: 'Delivery of completed work' }
    ],
    clauses: [
      'ip-upon-payment',
      'change-order-mandate',
      'revisions-cap'
    ]
  }
];
