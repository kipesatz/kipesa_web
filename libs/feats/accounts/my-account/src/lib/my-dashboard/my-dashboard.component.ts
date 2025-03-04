import { Component, computed, inject, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import {
  MembershipActions,
  MembershipFacadeService,
} from '@kps/data/associations';
import { ButtonComponent, IconicButtonComponent } from '@kps/material/button';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { LineChartComponent } from '@kps/charts/line';
import { PieChartComponent } from '@kps/charts/pie';
import { BarChartComponent } from '@kps/charts/bar';
import { StatCardComponent } from '@kps/material/card';
import { ChartConfig } from '@kps/charts';
import { ContributionFacadeService } from '@kps/data/finances';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

import dayjs from 'dayjs';

@Component({
  selector: 'kps-my-dashboard',
  standalone: true,
  imports: [
    MatToolbar,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    IconicButtonComponent,
    ButtonComponent,
    MatTooltip,
    MatCardActions,
    RouterLink,
    CurrencyPipe,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
    StatCardComponent,
  ],
  templateUrl: './my-dashboard.component.html',
  styleUrl: './my-dashboard.component.scss',
})
export class MyDashboardComponent implements OnInit {
  myMembershipsFacade = inject(MembershipFacadeService);
  private actions$ = inject(Actions);

  myMemberships = this.myMembershipsFacade.memberships;
  totalMemberships = this.myMembershipsFacade.totalMemberships;
  private contributionFacade = inject(ContributionFacadeService);
  private subscriptions = new Subscription();

  // data
  contributionsLoading = this.contributionFacade.loading;

  ngOnInit(): void {
    this.myMembershipsFacade.fetchMyMemberships();

    this.subscriptions.add(
      this.actions$
        .pipe(ofType(MembershipActions.loadMyMembershipsSuccess))
        .subscribe(() => {
          this.contributionFacade.fetchSelfContributions();
        })
    );
  }

  refreshDashboard(): void {
    console.log('refresh dashboard');
  }

  totalContributions = 250000;
  activeLoans = 2;

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  contributionsChartConfig = computed<ChartConfig>(() => ({
    title: 'My Contribution Trends',
    series: [
      {
        name: 'Amount',
        type: 'line',
        data: this.contributionFacade
          .allContributions()
          .map((d) => ({
            x: dayjs(d.createdOn).format('MMM D, YYYY'),
            y: d.amount,
          })),
        color: '#4CAF50',
        smooth: true,
        areaStyle: { opacity: 0.1 },
      },
    ],
    xAxis: {
      name: 'Contribution Date',
      type: 'category',
    },
    yAxis: {
      name: 'Amount',
      type: 'value',
    },
  }));

  // Doughnut chart for loans
  loansChartData = {
    labels: ['Active', 'Paid', 'Pending'],
    datasets: [
      {
        data: [2, 3, 1],
        backgroundColor: [
          'rgba(255, 159, 64, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
      },
    ],
  };

  // Bar chart for contributions per association
  contributionsPerAssociationData = {
    labels: ['Assoc 1', 'Assoc 2', 'Assoc 3', 'Assoc 4'],
    datasets: [
      {
        label: 'Contributions',
        data: [45000, 35000, 25000, 20000],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  };

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };
}
