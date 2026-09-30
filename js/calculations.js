/**
 * ScopeLock Calculation & Financial Modeling Utilities
 */

window.ScopeLockCalc = {
  formatMoney: function(amount, symbol = '$') {
    const num = Math.round(Number(amount) || 0);
    return `${symbol}${num.toLocaleString('en-US')}`;
  },

  calculateLeakage: function(params) {
    const projectValue = Number(params.projectValue) || 6000;
    const projectsPerYear = Number(params.projectsPerYear) || 8;
    const includedRevisions = Number(params.includedRevisions) || 2;
    const actualRevisions = Number(params.actualRevisions) || 5;
    const avgHoursPerRevision = Number(params.avgHoursPerRevision) || 4;
    const hourlyRate = Number(params.hourlyRate) || 125;

    const excessRevisionsPerProject = Math.max(0, actualRevisions - includedRevisions);
    const unbilledHoursPerProject = excessRevisionsPerProject * avgHoursPerRevision;
    const annualUnbilledHours = unbilledHoursPerProject * projectsPerYear;
    const annualRevenueLeakage = annualUnbilledHours * hourlyRate;
    const grossAnnualRevenue = projectValue * projectsPerYear;
    const totalPotentialBilling = grossAnnualRevenue + annualRevenueLeakage;
    const marginLossPercent = totalPotentialBilling > 0 ? Math.round((annualRevenueLeakage / totalPotentialBilling) * 100) : 0;

    return {
      grossAnnualRevenue,
      annualUnbilledHours,
      annualRevenueLeakage,
      marginLossPercent,
      potentialRecoveredRevenue: annualRevenueLeakage,
      unbilledHoursPerProject
    };
  },

  calculateMilestones: function(totalFee, milestones) {
    if (!Array.isArray(milestones)) return [];
    return milestones.map(m => {
      const pct = Number(m.percentage) || 0;
      const amount = Math.round((totalFee * pct) / 100);
      return {
        ...m,
        amount
      };
    });
  },

  aggregateDeliverables: function(deliverables) {
    if (!Array.isArray(deliverables)) return { totalHours: 0, totalPrice: 0 };
    return deliverables.reduce((acc, d) => {
      if (d.included !== false) {
        acc.totalHours += Number(d.estimatedHours) || 0;
        acc.totalPrice += Number(d.price) || 0;
      }
      return acc;
    }, { totalHours: 0, totalPrice: 0 });
  }
};
