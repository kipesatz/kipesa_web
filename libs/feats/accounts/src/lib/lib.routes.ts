import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { unauthOnlyGuard } from '@kps/acls';
import { MembershipDataModule } from '@kps/data/associations';

export const accountsRoutes: Route[] = [
  {
    path: 'auth',
    title: 'Auth',
    canActivate: [unauthOnlyGuard],
    loadChildren: () =>
      import('@kps/accounts/auth').then((m) => m.accountsAuthRoutes),
    providers: [importProvidersFrom(MembershipDataModule)],
  },
  { path: '**', redirectTo: 'auth' },
];
