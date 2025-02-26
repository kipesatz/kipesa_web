import { Route } from '@angular/router';
import { AssociationEnrollPageComponent } from './association-enroll-page/association-enroll-page.component';
import { importProvidersFrom } from '@angular/core';
import {
  AssociationDataModule,
  MembershipDataModule,
} from '@kps/data/associations';

export const associationsRoutes: Route[] = [
  {
    path: '',
    providers: [importProvidersFrom(AssociationDataModule)],
    children: [
      {
        path: 'enroll',
        component: AssociationEnrollPageComponent,
        title: 'Enroll',
        providers: [importProvidersFrom(MembershipDataModule)],
      },
      {
        path: ':associationId',
        loadChildren: () =>
          import('@kps/associations/current-assoc').then(
            (lib) => lib.currAssocRoutes
          ),
      },
      { path: '', redirectTo: 'enroll', pathMatch: 'full' },
      { path: '**', redirectTo: 'enroll', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
