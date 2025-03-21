import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { PaymentProviderDataModule } from '@kps/data/finances';

export const adminSettingsRoutes: Routes = [
  {
    path: 'finances',
    children: [
      {
        path: 'paymentProviders',

        loadChildren: () =>
          import('@kps/finances/payment-providers').then(
            (m) => m.paymentProviderssRoutes
          ),
        providers: [importProvidersFrom(PaymentProviderDataModule)],
      },
      { path: '**', redirectTo: 'paymentProviders', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'finances', pathMatch: 'full' },
];
