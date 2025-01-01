import { Route } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

export const adminRoutes: Route[] = [
  { path: '', component: AdminComponent },
  {
    path: 'settings',
    title: 'Settings',
    loadChildren: () =>
      import('@kps/admin/settings').then((lib) => lib.adminSettingsRoutes),
  },
];
