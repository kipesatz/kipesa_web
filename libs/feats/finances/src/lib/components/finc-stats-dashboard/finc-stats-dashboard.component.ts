import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { TableFilter } from '@kps/material/table';
import {
  fincStatsActions,
  FincStatsFacadeService,
  TransactionFacadeService,
} from '@kps/data/finances';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { ButtonComponent } from '@kps/material/button';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { RouterService } from '@kps/core/router';
import { FincStatsDashboardService } from '../../services';
import { BarChartComponent } from '@kps/charts/bar';
import { LineChartComponent } from '@kps/charts/line';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { ChartConfig } from '@kps/charts';

@Component({
  selector: 'kps-finc-stats-dashboard',
  imports: [
    MatCardModule,
    ButtonComponent,
    CurrencyPipe,
    LoadingIndicatorComponent,
    BarChartComponent,
    LineChartComponent,
  ],
  templateUrl: './finc-stats-dashboard.component.html',
  styleUrl: './finc-stats-dashboard.component.scss',
})
export class FincStatsDashboardComponent implements OnInit, OnDestroy {
  private dashboardService = inject(FincStatsDashboardService);
  private routerService = inject(RouterService);
  private transactionFacade = inject(TransactionFacadeService);
  private actions$ = inject(Actions);

  private fincStatsFacade = inject(FincStatsFacadeService);

  fincStatsData = this.fincStatsFacade.fincStats;
  fincStatsLoading = this.fincStatsFacade.loading;
  fincStatsError = this.fincStatsFacade.error;

  transactionsLoading = this.transactionFacade.loading

  private subscriptions = new Subscription();

  protected dateFilters: TableFilter[] = [
    {
      key: 'timeRange',
      label: 'Time Range',
      options: [
        { label: 'daily', value: 'DAILY' },
        { label: 'Weekly', value: 'WEEKLY' },
        { label: 'Monthly', value: 'MONTHLY' },
        { label: 'Quaterly', value: 'QUATERLY' },
        { label: 'Custom', value: 'CUSTOM' },
      ],
    },
    { key: 'startDate', label: 'Start Date', options: [] },
    { key: 'endDate', label: 'End Date', options: [] },
  ];

  protected chartData = this.dashboardService.fincStatsChartData();
  get transactionsData() {
    const refs = this.transactionFacade
      .transactions()
      .map((transaction) => transaction.transactionRef);
    const amounts = this.transactionFacade
      .transactions()
      .map((transaction) => transaction.amount);
    return { refs, amounts };
  }

  transactionsChartConfig  = computed<ChartConfig>(() => ({
    title: 'Cash Flow Trends',
    subtitle: 'Monthly Income vs Expenses',
    series: [
      {
        name: 'Income',
        type: 'line',
        data: this.transactionFacade.transactions().map((d) => ({ x: d.transactionRef, y: d.amount })),
        color: '#4CAF50',
        smooth: true,
        areaStyle: { opacity: 0.1 },
      },
    ],
    xAxis: {
      name: 'Transaction Ref',
      type: 'category',
    },
    yAxis: {
      name: 'Amount',
      type: 'value',
    },
  }));



  onFilterChange(_filters: Record<string, unknown>) {
    // this.reportFacade.fetchAll();
  }

  generateReport() {
    // Implement report generation logic
  }

  calculateGrowth() {
    // Implement growth calculation logic
    return 15;
  }

  calculateReturnsRate() {
    // Implement returns rate calculation
    return 85;
  }

  ngOnInit() {
    this.fincStatsFacade.loadFincStats(this.routerService.getAsHttpParams());

    this.subscriptions.add(
      this.actions$
        .pipe(ofType(fincStatsActions.loadFincStatsSuccess))
        .subscribe(() => this.transactionFacade.fetchAll())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
