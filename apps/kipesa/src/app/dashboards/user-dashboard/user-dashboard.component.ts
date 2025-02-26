import { Component, inject, OnInit } from '@angular/core';
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
import { MembershipFacadeService } from '@kps/data/associations';
import { ButtonComponent, IconicButtonComponent } from '@kps/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { LineChartComponent } from '@kps/charts/line';
import { PieChartComponent } from '@kps/charts/pie';
import { BarChartComponent } from '@kps/charts/bar';

@Component({
  selector: 'kps-user-dashboard',
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
    MatIcon,
    RouterLink,
    CurrencyPipe,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  myMembershipsFacade = inject(MembershipFacadeService);
  myMemberships = this.myMembershipsFacade.memberships;
  totalMemberships = this.myMembershipsFacade.totalMemberships;

  ngOnInit(): void {
    this.myMembershipsFacade.fetchMyMemberships();
  }

  refreshDashboard(): void {
    console.log('refresh dashboard');
  }

  totalContributions = 250000;
  activeLoans = 2;

  // Line chart for contributions
  contributionsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Contributions',
      data: [65, 59, 80, 81, 56, 55],
      fill: true,
      tension: 0.4,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)'
    }]
  };

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  // Doughnut chart for loans
  loansChartData = {
    labels: ['Active', 'Paid', 'Pending'],
    datasets: [{
      data: [2, 3, 1],
      backgroundColor: [
        'rgba(255, 159, 64, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(54, 162, 235, 0.8)'
      ]
    }]
  };

  // Bar chart for contributions per association
  contributionsPerAssociationData = {
    labels: ['Assoc 1', 'Assoc 2', 'Assoc 3', 'Assoc 4'],
    datasets: [{
      label: 'Contributions',
      data: [45000, 35000, 25000, 20000],
      backgroundColor: 'rgba(54, 162, 235, 0.8)'
    }]
  };

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

}
