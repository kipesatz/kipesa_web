import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { ContributionDataModule } from '@kps/data/finances';

export const dashboardRoutes: Routes = [
  {
    path: 'myDashboard',
    async loadComponent() {
      return import('./user-dashboard/user-dashboard.component').then(
        (c) => c.UserDashboardComponent
      );
    },
    providers: [importProvidersFrom(ContributionDataModule)],
  },
  { path: '', redirectTo: 'myDashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'myDashboard', pathMatch: 'full' },
];
