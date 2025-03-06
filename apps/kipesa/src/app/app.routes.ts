import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { MembershipDataModule } from '@kps/data/associations';
import { LoginDataModule, LogoutDataModule } from '@kps/data/auth';
import { MainLayoutComponent } from '@kps/layout';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        LoginDataModule,
        LogoutDataModule,
        MembershipDataModule
      ),
    ],
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
            path: 'admin',
            loadChildren: () => import('@kps/admin').then((m) => m.adminRoutes),
          },
          {
            path: 'myAccount',
            loadChildren: () =>
              import('@kps/accounts/my-account').then((m) => m.myAccountRoutes),
            title: 'My Account',
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
          { path: '**', redirectTo: 'myAccount' },
        ],
      },
      { path: '**', redirectTo: 'accounts' },
    ],
  },
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: '**', redirectTo: 'accounts', pathMatch: 'full' },
];
