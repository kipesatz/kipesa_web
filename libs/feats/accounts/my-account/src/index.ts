import { Routes } from '@angular/router';
import { MyAccountContainerComponent } from './lib/my-account-container/my-account-container.component';
import { importProvidersFrom } from '@angular/core';
import { AuthUserDataModule } from '@kps/data/accounts';
import { ContributionDataModule } from '@kps/data/finances';

export const myAccountRoutes: Routes = [
  {
    path: '',
    component: MyAccountContainerComponent,
    children: [
      {
        path: 'personalInfo',
        loadComponent: () =>
          import('./lib/personal-info/personal-info.component').then(
            (cmp) => cmp.PersonalInfoComponent
          ),
        title: 'Personal Info',
        providers: [importProvidersFrom(AuthUserDataModule)],
      },
      {
        path: 'enrollments',
        loadComponent: () =>
          import(
            './lib/my-assoc-enrollments/my-assoc-enrollments.component'
          ).then((cmp) => cmp.MyAssocEnrollmentsComponent),
        title: 'My Enrollments',
      },
      {
        path: 'contributions',
        loadComponent: () =>
          import('./lib/my-contributions/my-contributions.component').then(
            (cmp) => cmp.MyContributionsComponent
          ),
        title: 'My Contributions',
        providers: [importProvidersFrom(ContributionDataModule)],
      },
      {
        path: 'depts',
        loadComponent: () =>
          import('./lib/my-loans/my-loans.component').then(
            (cmp) => cmp.MyLoansComponent
          ),
        title: 'My Loans',
      },
      { path: '', redirectTo: 'personalInfo', pathMatch: 'full' },
      { path: '**', redirectTo: 'personalInfo', pathMatch: 'full' },
    ],
  },
];
