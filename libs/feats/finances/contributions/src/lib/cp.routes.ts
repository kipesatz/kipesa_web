import { Routes } from '@angular/router';
import {
  CpsPageComponent,
  ContributionsPageComponent,
  CpDetailsContainerComponent,
  CpContributionsComponent,
  CpDetailsComponent,
} from './pages';
import { importProvidersFrom } from '@angular/core';
import {
  ContributionDataModule,
  CpDataModule,
  PaymentMethodDataModule,
} from '@kps/data/finances';
import { MembershipDataModule } from '@kps/data/associations';

export const cpRoutes: Routes = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        CpDataModule,
        PaymentMethodDataModule,
        MembershipDataModule,
        ContributionDataModule
      ),
    ],
    children: [
      {
        path: 'contributions',
        component: ContributionsPageComponent,
      },
      {
        path: ':cpId',
        component: CpDetailsContainerComponent,
        children: [
          {
            path: 'details',
            component: CpDetailsComponent,
          },
          {
            path: 'contributions',
            component: CpContributionsComponent,
          },
          { path: '', redirectTo: 'details', pathMatch: 'full' },
        ],
      },
      {
        path: '',
        component: CpsPageComponent,
        title: 'Purposes',
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];
