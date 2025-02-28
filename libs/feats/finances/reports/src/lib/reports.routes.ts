import { Routes } from '@angular/router';
import {
  ReportsContainerComponent,
  ReportsOverviewComponent,
  ReportsPageComponent,
} from './pages';
import { importProvidersFrom } from '@angular/core';
import { FincStatsDataModule } from '@kps/data/finances';

export const reportsRoutes: Routes = [
  {
    path: '',
    component: ReportsContainerComponent,
    children: [
      {
        path: 'overview',
        component: ReportsOverviewComponent,
        providers: [importProvidersFrom(FincStatsDataModule)]
      },
      {
        path: 'saved',
        component: ReportsPageComponent,
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];
