import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { LoanProductDataModule } from '@kps/data/finances';

export const loanProductsRoutes: Routes = [
  {
    path: '',
    data: { title: 'Loan Products' },
    providers: [importProvidersFrom(LoanProductDataModule)],
    loadComponent: () =>
      import('./components').then((cmp) => cmp.LoanProductsTableComponent),
  },
];
