import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import {
  AssociationDataModule,
  MembershipDataModule,
} from '@kps/data/associations';
import { AssociationEnrollPageComponent } from './association-enroll-page/association-enroll-page.component';

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
        component: AssociationEnrollPageComponent,
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
