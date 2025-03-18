import { Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import {
  AssociationDataModule,
} from '@kps/data/associations';

export const associationsRoutes: Route[] = [
  {
    path: '',
    providers: [importProvidersFrom(AssociationDataModule)],
    children: [
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
