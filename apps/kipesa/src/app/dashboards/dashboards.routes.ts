import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'myDashboard',
    async loadComponent() {
      return import('./user-dashboard/user-dashboard.component').then(
        (c) => c.UserDashboardComponent
      );
    },
  },
  { path: '', redirectTo: 'myDashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'myDashboard', pathMatch: 'full' },
];
