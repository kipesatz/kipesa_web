import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { PaymentMethodDataModule } from '@kps/data/finances';

export const adminSettingsRoutes: Routes = [
  {
    path: 'finances',
    children: [
      {
        path: 'paymentMethods',

        loadChildren: () =>
          import('@kps/finances/payment-methods').then(
            (m) => m.paymentMethodsRoutes
          ),
        providers: [importProvidersFrom(PaymentMethodDataModule)],
      },
      { path: '**', redirectTo: 'paymentMethods', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'finances', pathMatch: 'full' },
];
