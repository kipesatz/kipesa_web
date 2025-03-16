import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import {
  AssociationDataModule,
  MembershipDataModule,
} from '@kps/data/associations';
import { MembershipEnrollPageComponent } from './membership-enroll-page/membership-enroll-page.component';

export const assocSettingsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./assoc-settings-dialog/assoc-settings-dialog.component').then(
        (m) => m.AssocSettingsDialogComponent
      ),
    children: [
      {
        path: 'enroll',
        component: MembershipEnrollPageComponent,
        title: 'Enroll',
        providers: [
          importProvidersFrom([MembershipDataModule, AssociationDataModule]),
        ],
      },
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
