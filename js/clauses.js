/**
 * ScopeLock Protective Clauses Library
 * Professional contractual provisions with plain-English rationales and risk tags.
 * Drafting aid — have qualified counsel review for your specific jurisdiction.
 */

window.ScopeLockClauses = [
  {
    id: 'ip-upon-payment',
    title: 'Intellectual Property Transfer Contingent on Final Payment',
    category: 'IP',
    riskMitigated: 'Client taking assets, staging builds, or source code to a cheaper vendor without settling final milestone invoices.',
    plainEnglish: 'The client only legally owns the work after every single invoice is paid in full. If they cancel early or default, you retain 100% of the copyright.',
    contractLanguage: 'All right, title, and interest in and to the final Deliverables created by Contractor under this Statement of Work shall transfer to Client strictly upon Contractor’s receipt of all outstanding fees, invoices, and expenses in full cleared funds. Prior to full satisfaction of all payments due, Contractor retains sole and exclusive intellectual property rights, and Client is granted solely a revocable, non-exclusive internal evaluation license.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  },
  {
    id: 'change-order-mandate',
    title: 'Mandatory Written Change Order Protocol',
    category: 'Change Orders',
    riskMitigated: 'Informal Slack, WhatsApp, or email requests accumulating into dozens of uncompensated hours and disputed timelines.',
    plainEnglish: 'Any request outside the deliverable matrix requires an executed written Change Order with agreed fees and timeline extensions before any work begins.',
    contractLanguage: 'Any alteration, addition, or deviation from the specific Deliverables, specifications, or assumptions listed in this Statement of Work shall constitute a "Scope Modification." Contractor is under no obligation to commence or perform work on any Scope Modification until both Parties have executed a formal written Change Order specifying the additional compensation (billed at Contractor’s standard rate or mutually agreed fixed fee) and any resulting delivery schedule adjustment.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  },
  {
    id: 'revisions-cap',
    title: 'Consolidated Revision Rounds & Acceptance Window',
    category: 'Revisions',
    riskMitigated: 'Endless piecemeal feedback emails and subjective perfectionism dragging projects on for months.',
    plainEnglish: 'Revisions must be delivered in consolidated batches within 5 business days, up to the defined numeric limit. After that, work is deemed accepted.',
    contractLanguage: 'Client shall be entitled solely to the number of revision rounds explicitly specified per Deliverable. A "revision round" requires Client to compile and deliver a unified, single, written feedback document. Piecemeal comments shall not be processed. Client shall have five (5) business days following Deliverable submission to provide feedback; failure to provide feedback within said period shall constitute irrevocable and deemed acceptance of the Deliverable.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  },
  {
    id: 'client-delay-sla',
    title: 'Client Inaction & Dormancy Restart Fee',
    category: 'Delays',
    riskMitigated: 'Ghosting clients who vanish for weeks, then reappear demanding immediate weekend completion when your calendar is fully booked.',
    plainEnglish: 'If the client goes silent for more than 10 business days, the project pauses, deadlines are reset, and a 10% re-activation fee applies to resume.',
    contractLanguage: 'In the event Client fails to provide required approvals, assets, feedback, or access credentials for a period exceeding ten (10) consecutive business days, the Project shall be designated "Dormant." Contractor reserves the right to reassign personnel and reschedule completion dates based on subsequent studio availability. Re-activating a Dormant project shall incur a mandatory Administrative Re-scheduling Fee equal to 10% of total project value.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  },
  {
    id: 'late-payment-interest',
    title: 'Late Payment Penalty & Immediate Production Suspension',
    category: 'Payments',
    riskMitigated: 'Waiting 60 to 90 days for payment while being expected to continue active production work under pressure.',
    plainEnglish: 'Invoices unpaid after 7 days accrue 1.5% monthly interest, and all active production halts until payment clears.',
    contractLanguage: 'Invoices are strictly due Net-7 days from transmission date unless otherwise agreed in writing. Outstanding balances after seven (7) days shall accrue interest at the statutory rate of 1.5% per month (or the maximum allowed by law). Contractor reserves the right to immediately suspend all active production, staging server hosting, and milestone deliverables without liability if any invoice remains delinquent for more than five (5) days.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  },
  {
    id: 'acceptance-criteria',
    title: 'Objective Technical Acceptance Standard',
    category: 'Acceptance',
    riskMitigated: 'Subjective client rejection ("I will know it when I see it") despite conforming to functional specs.',
    plainEnglish: 'Deliverables are judged strictly against the written specifications in the matrix, not arbitrary personal tastes.',
    contractLanguage: 'Acceptance of Deliverables shall be evaluated strictly and exclusively against the objective technical and design criteria set forth in this Statement of Work. Subjective dissatisfaction not grounded in deviations from said specifications shall not constitute valid grounds for rejection, non-payment, or additional unpaid revision cycles.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  },
  {
    id: 'third-party-expenses',
    title: 'Client Liability for Third-Party API & SaaS Expenses',
    category: 'Third Parties',
    riskMitigated: 'Contractor having to pay out-of-pocket for expensive cloud hosting, font licenses, or API tiers.',
    plainEnglish: 'The client must pay directly for all hosting, domain registration, font licenses, and third-party SaaS charges.',
    contractLanguage: 'All costs associated with third-party software, cloud infrastructure (e.g., AWS, GCP, Vercel), font licenses, stock photography, payment gateway fees, and transactional messaging APIs are the sole responsibility of Client and shall be billed directly to Client account credentials or reimbursed immediately upon invoice.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  },
  {
    id: 'client-supplied-content',
    title: 'Timely Content & Asset Handoff Mandate',
    category: 'Client Responsibilities',
    riskMitigated: 'Project delays caused by missing client copy, brand photography, or database credentials.',
    plainEnglish: 'If the client delays providing necessary text, logos, or API keys, delivery milestones automatically push back by the same duration.',
    contractLanguage: 'Contractor’s performance timeline is strictly contingent upon Client providing all required copy, high-resolution imagery, brand guidelines, and third-party access credentials within three (3) business days of kickoff. Any delay by Client shall automatically extend all subsequent delivery milestones on a day-for-day basis.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  },
  {
    id: 'kill-fee-graduated',
    title: 'Graduated Early Termination & Kill Fee',
    category: 'Scope',
    riskMitigated: 'Client cancelling on short notice after you cleared your calendar and turned away other paying work.',
    plainEnglish: 'If the client cancels early, they forfeit deposits, pay for all work completed to date, plus a 20% capacity compensation fee.',
    contractLanguage: 'If Client terminates this Agreement for convenience, Client shall forfeit all non-refundable retainers and deposits, and shall immediately remit payment for: (a) 100% of all milestones reached; (b) pro-rata compensation for hours spent on work-in-progress; plus (c) an early termination fee equal to twenty percent (20%) of the remaining unbilled contract balance to compensate for reserved capacity.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  },
  {
    id: 'portfolio-display',
    title: 'Public Attribution & Portfolio Rights',
    category: 'IP',
    riskMitigated: 'Clients forbidding you from showcasing work you created in your portfolio or case studies.',
    plainEnglish: 'You maintain the right to display the finished designs or code in your portfolio once the client launches publicly.',
    contractLanguage: 'Contractor retains the perpetual, worldwide, non-exclusive right to display, describe, and link to the completed Deliverables in Contractor’s portfolio, website, marketing materials, and industry awards, provided that no Client confidential information or unreleased proprietary trade secrets are disclosed.',
    disclaimer: 'Drafting aid — have counsel review for your jurisdiction.'
  }
];
