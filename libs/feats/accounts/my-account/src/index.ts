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
        path: 'dashboard',
        title: 'My Dashboard',
        providers: [importProvidersFrom(ContributionDataModule)],
        loadComponent: () =>
          import('./lib/my-dashboard/my-dashboard.component').then(
            (cmp) => cmp.MyDashboardComponent
          ),
      },
      {
        path: 'personalInfo',
        title: 'Personal Info',
        providers: [importProvidersFrom(AuthUserDataModule)],
        loadComponent: () =>
          import('./lib/personal-info/personal-info.component').then(
            (cmp) => cmp.PersonalInfoComponent
          ),
      },
      {
        path: 'enrollments',
        title: 'My Enrollments',
        loadComponent: () =>
          import(
            './lib/my-assoc-enrollments/my-assoc-enrollments.component'
          ).then((cmp) => cmp.MyAssocEnrollmentsComponent),
      },
      {
        path: 'contributions',
        title: 'My Contributions',
        providers: [importProvidersFrom(ContributionDataModule)],
        loadComponent: () =>
          import('./lib/my-contributions/my-contributions.component').then(
            (cmp) => cmp.MyContributionsComponent
          ),
      },
      {
        path: 'depts',
        title: 'My Loans',
        loadComponent: () =>
          import('./lib/my-loans/my-loans.component').then(
            (cmp) => cmp.MyLoansComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
