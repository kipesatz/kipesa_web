import { Component, inject, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { ButtonComponent } from '@kps/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxEchartsModule } from 'ngx-echarts';
import { FincStatsFacadeService } from '@kps/data/finances';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { TimeRange, TimerangeFiltersComponent } from '@kps/core/datetime';
import { RouterService } from '@kps/core/router';

@Component({
  selector: 'kps-reports-overview',
  imports: [
    MatToolbar,
    ButtonComponent,
    CommonModule,
    NgxEchartsModule,
    MatCardModule,
    ButtonComponent,
    LoadingIndicatorComponent,
    TimerangeFiltersComponent,
  ],
  templateUrl: './reports-overview.component.html',
  styleUrl: './reports-overview.component.scss',
})
export class ReportsOverviewComponent implements OnInit {
  private fincStatsFacade = inject(FincStatsFacadeService);
  private routerService = inject(RouterService);

  // side-effect data
  fincStats = this.fincStatsFacade.fincStats;
  statsLoading = this.fincStatsFacade.loading;

  barChartOption: any;
  pieChartOption: any;

  ngOnInit() {
    this.fincStatsFacade.loadFincStats();
    this.initializeCharts();
  }

  private initializeCharts() {
    this.barChartOption = {
      title: {
        text: 'Transactions Overview',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        top: '10%',
        data: ['Count', 'Amount'],
      },
      xAxis: {
        type: 'category',
        data: ['Loans Disbursed', 'Loans Repaid', 'Withdrawals', 'Deposits'],
      },
      yAxis: [
        {
          type: 'value',
          name: 'Count',
          position: 'left',
        },
        {
          type: 'value',
          name: 'Amount',
          position: 'right',
        },
      ],
      series: [
        {
          name: 'Count',
          type: 'bar',
          data: [
            this.fincStats()?.loansDisbursed.count ?? 0,
            this.fincStats()?.loansRepaid.count ?? 0,
            this.fincStats()?.withdrawals.count ?? 0,
            this.fincStats()?.deposits.count ?? 0,
          ],
        },
        {
          name: 'Amount',
          type: 'bar',
          yAxisIndex: 1,
          data: [
            this.fincStats()?.loansDisbursed.amount ?? 0,
            this.fincStats()?.loansRepaid.amount ?? 0,
            this.fincStats()?.withdrawals.amount ?? 0,
            this.fincStats()?.deposits.amount ?? 0,
          ],
        },
      ],
    };

    this.pieChartOption = {
      title: {
        text: 'Transaction Distribution',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        top: '10%',
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Amount Distribution',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: this.fincStats()?.loansDisbursed.amount ?? 0,
              name: 'Loans Disbursed',
            },
            {
              value: this.fincStats()?.loansRepaid.amount ?? 0,
              name: 'Loans Repaid',
            },
            {
              value: this.fincStats()?.withdrawals.amount ?? 0,
              name: 'Withdrawals',
            },
            { value: this.fincStats()?.deposits.amount ?? 0, name: 'Deposits' },
          ],
        },
      ],
    };
  }

  applyFilters(timeRange: TimeRange): void {
    this.routerService
      .updateRouterState(timeRange)
      .then(() =>
        this.fincStatsFacade.loadFincStats(this.routerService.getAsHttpParams())
      );
  }

  saveToReports(): void {
    // save to reports
  }
}
