import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import {
  FincStatsDataModule,
  LoanDataModule,
  ReportDataModule,
  TransactionDataModule,
} from '@kps/data/finances';
import { FincStatsDashboardComponent } from './components/finc-stats-dashboard/finc-stats-dashboard.component';

export const financesRoutes: Routes = [
  {
    path: 'stats',
    component: FincStatsDashboardComponent,
    providers: [
      importProvidersFrom([FincStatsDataModule, TransactionDataModule]),
    ],
  },
  {
    path: 'contributionPurposes',
    loadChildren: () =>
      import('@kps/finances/contributions').then((m) => m.cpRoutes),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('@kps/finances/reports').then((m) => m.reportsRoutes),
    title: 'Reports',
    providers: [importProvidersFrom([ReportDataModule])],
  },
  {
    path: 'loans',
    loadChildren: () =>
      import('@kps/finances/loans').then((m) => m.loansRoutes),
    title: 'Loans',
    providers: [importProvidersFrom([LoanDataModule])],
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('@kps/finances/transactions').then((m) => m.transactionsRoutes),
    title: 'Financial Transactions',
    providers: [importProvidersFrom([TransactionDataModule])],
  },
  {
    path: '**',
    redirectTo: 'reports',
    pathMatch: 'full',
  },
];
