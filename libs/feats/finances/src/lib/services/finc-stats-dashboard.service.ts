import { computed, inject, Injectable } from '@angular/core';
import { FincStats, FincStatsFacadeService } from '@kps/data/finances';

@Injectable({
  providedIn: 'root',
})
export class FincStatsDashboardService {
  private fincstatsFacade = inject(FincStatsFacadeService);
  fincStats = this.fincstatsFacade.fincStats;
  loading = this.fincstatsFacade.loading;
  error = this.fincstatsFacade.error;

  fincStatsChartData = computed(() => {
    const fincStats = this.fincStats();
    if (!fincStats) return null;

    return {
      loans: {
        ...fincStats.loansDisbursed,
      },
      cashflow: {
        deposits: fincStats.deposits.amount,
        withdrawals: fincStats.withdrawals.amount,
      },
      timeline: this.generateTimelineData(fincStats),
    };
  });

  private generateTimelineData(fincStats: FincStats) {
    // Transform report data into timeline series
    const startDate = new Date(fincStats.startDate);
    const endDate = new Date(fincStats.endDate);

    return [
      {
        name: 'Loans',
        series: [
          { name: startDate, value: fincStats.loansDisbursed.amount },
          { name: endDate, value: fincStats.loansRepaid.amount },
        ],
      },
    ];
  }
}
