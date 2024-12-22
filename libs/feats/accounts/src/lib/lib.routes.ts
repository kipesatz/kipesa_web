import { Route } from '@angular/router';

export const accountsRoutes: Route[] = [
  {
    path: 'auth',
    title: 'Auth',
    loadChildren: () =>
      import('@kps/accounts/auth').then((m) => m.accountsAuthRoutes),
  },
  { path: '**', redirectTo: 'auth' },
];
