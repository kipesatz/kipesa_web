import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'accounts',
    title: 'Accounts',
    loadChildren: () => import('@kps/accounts').then((m) => m.accountsRoutes),
  },
  { path: '**', redirectTo: 'accounts' },
];
