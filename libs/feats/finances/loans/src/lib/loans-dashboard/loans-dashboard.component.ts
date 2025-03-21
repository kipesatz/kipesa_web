import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  LoanPerformanceStatsFacadeService,
  loanStatsPerStatusActions,
  LoanStatsPerStatusFacadeService,
} from '@kps/data/finances';
import { LoanPerformanceCardComponent } from '../components/loan-performance-card/loan-performance-card.component';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { PieChartComponent } from '@kps/charts/pie';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { LoanPortfolioCardComponent } from '../loan-portfolio-card/loan-portfolio-card.component';
import { LoanStatsByStatusCardComponent } from '../loan-stats-by-status-card/loan-stats-by-status-card.component';

@Component({
  selector: 'kps-loans-dashboard',
  imports: [
    LoanPerformanceCardComponent,
    LoadingIndicatorComponent,
    LoanPortfolioCardComponent,
    LoanStatsByStatusCardComponent,
  ],
  templateUrl: './loans-dashboard.component.html',
  styleUrl: './loans-dashboard.component.scss',
})
export class LoansDashboardComponent implements OnInit, OnDestroy {
  private loanPerformanceFacade = inject(LoanPerformanceStatsFacadeService);
  private loanStatsByStatusFacade = inject(LoanStatsPerStatusFacadeService);

  private actions$ = inject(Actions);

  private subscriptions = new Subscription();

  // data
  performanceStats = this.loanPerformanceFacade.stats;
  performanceLoading = this.loanPerformanceFacade.loading;
  loanStatsByStatus = this.loanStatsByStatusFacade.allStatsPerStatus;
  loanStatsByStatusLoading = this.loanStatsByStatusFacade.loading;

  ngOnInit(): void {
    // load loan stats per status first
    this.loanStatsByStatusFacade.dispatchFetchStats();

    // then load performance stats
    this.subscriptions.add(
      this.actions$
        .pipe(ofType(loanStatsPerStatusActions.loadLoanStatsPerStatusSuccess))
        .subscribe(() => {
          this.loanPerformanceFacade.dispatchFetchPerformanceStats();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
