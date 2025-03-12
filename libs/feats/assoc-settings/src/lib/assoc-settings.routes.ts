import { Routes } from '@angular/router';

export const assocSettingsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./assoc-settings-dialog/assoc-settings-dialog.component').then(
        (m) => m.AssocSettingsDialogComponent
      ),
    children: [
      {
        path: 'loanProducts',
        title: 'Loan Products',
        loadChildren: () =>
          import('@kps/assoc-settings/loan-products').then(
            (m) => m.loanProductsRoutes
          ),
      },
      { path: '', redirectTo: 'loanProducts', pathMatch: 'full' },
      { path: '**', redirectTo: 'loanProducts', pathMatch: 'full' },
    ],
  },
];
