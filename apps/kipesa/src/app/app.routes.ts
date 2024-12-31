import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { MyMembershipDataModule } from '@kps/data/associations';
import { LoginDataModule } from '@kps/data/auth';
import { MainLayoutComponent } from '@kps/layout';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [importProvidersFrom(LoginDataModule, MyMembershipDataModule)],
    children: [
      {
        path: 'accounts',
        title: 'Accounts',
        loadChildren: () =>
          import('@kps/accounts').then((m) => m.accountsRoutes),
      },
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: 'dashboards',
            loadChildren: () =>
              import('./dashboards').then((m) => m.dashboardRoutes),
          },
          {
            path: 'finances',
            title: 'Finances',
            loadChildren: () =>
              import('@kps/finances').then((m) => m.financesRoutes),
          },
          {
            path: 'associations',
            title: 'Associations',
            loadChildren: () =>
              import('@kps/associations').then((m) => m.associationsRoutes),
          },
          { path: '**', redirectTo: 'dashboards' },
        ],
      },
      { path: '**', redirectTo: 'accounts' },
    ],
  },
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: '**', redirectTo: 'accounts', pathMatch: 'full' },
];
