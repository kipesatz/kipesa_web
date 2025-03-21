import { Routes } from '@angular/router';
import { LoansPageComponent } from './pages';
import { importProvidersFrom } from '@angular/core';
import {
  LoanDataModule,
  LoanPerformanceStatsDataModule,
  LoanProductDataModule,
  LoanStatsPerStatusDataModule,
} from '@kps/data/finances';
import { MembershipDataModule } from '@kps/data/associations';
import { LoansContainerComponent } from './loans-container/loans-container.component';

export const loansRoutes: Routes = [
  {
    path: '',
    component: LoansContainerComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Loans Dashboard',
        providers: [
          importProvidersFrom([
            LoanPerformanceStatsDataModule,
            LoanStatsPerStatusDataModule,
          ]),
        ],
        loadComponent: () =>
          import('./loans-dashboard/loans-dashboard.component').then(
            (cmp) => cmp.LoansDashboardComponent
          ),
      },
      {
        path: 'all',
        component: LoansPageComponent,
        providers: [
          importProvidersFrom([
            LoanDataModule,
            LoanProductDataModule,
            MembershipDataModule,
          ]),
        ],
      },
      {
        path: ':loanId',
        loadChildren: () =>
          import('./loan-details/loan-details.routes').then(
            (m) => m.loanDetailsRoutes
          ),
      },

      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
