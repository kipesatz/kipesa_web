import { Routes } from '@angular/router';
import { LoanDetailsCpanelComponent } from './loan-details-cpanel/loan-details-cpanel.component';
import { importProvidersFrom } from '@angular/core';
import { CollateralDataModule, LoanFileDataModule, LoanPaymentDataModule } from '@kps/data/finances';

export const loanDetailsRoutes: Routes = [
  {
    path: '',
    component: LoanDetailsCpanelComponent,
    title: 'Loan Details',
    children: [
      {
        path: 'tracking',
        title: 'Tracking',
        loadComponent: () =>
          import('./loan-tracking-tab/loan-tracking-tab.component').then(
            (c) => c.LoanTrackingTabComponent
          ),
      },
      {
        path: 'performance',
        title: 'Performance',
        loadComponent: () =>
          import('./loan-performance-tab/loan-performance-tab.component').then(
            (c) => c.LoanPerformanceTabComponent
          ),
      },
      {
        path: 'docs',
        title: 'Documents',
        providers: [importProvidersFrom(LoanFileDataModule)],
        loadComponent: () =>
          import('./loan-docs-tab/loan-docs-tab.component').then(
            (c) => c.LoanDocsTabComponent
          ),
      },
      {
        path: 'collaterals',
        title: 'Collaterals',
        providers: [importProvidersFrom(CollateralDataModule)],
        loadComponent: () =>
          import('./collaterals-tab/collaterals-tab.component').then(
            (c) => c.CollateralsTabComponent
          ),
      },
      {
        path: 'repayments',
        title: 'Repayments',
        providers: [importProvidersFrom(LoanPaymentDataModule)],
        loadComponent: () =>
          import('./loan-repayments-tab/loan-repayments-tab.component').then(
            (c) => c.LoanRepaymentsTabComponent
          ),
      },
      { path: '', redirectTo: 'tracking', pathMatch: 'full' },
    ],
  },
];
