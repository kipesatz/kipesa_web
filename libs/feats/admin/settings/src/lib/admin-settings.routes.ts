import { Routes } from '@angular/router';

export const adminSettingsRoutes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./admin-settings/admini-settings.routes').then(
        (m) => m.adminSettingsRoutes
      ),
  },
  { path: '**', redirectTo: 'settings', pathMatch: 'full' },
];
