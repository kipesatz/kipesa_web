import { Routes } from '@angular/router';
import { AssocDashboardComponent } from './assoc-dashboard/assoc-dashboard.component';
import { importProvidersFrom } from '@angular/core';
import {
  MembershipDataModule,
  MembershipStatsDataModule,
} from '@kps/data/associations';
import { WalletDataModule } from '@kps/data/finances';
import { MembershipsContainerComponent } from './memberships';

export const currAssocRoutes: Routes = [
  {
    path: 'dashboard',
    component: AssocDashboardComponent,
    providers: [
      importProvidersFrom([MembershipStatsDataModule, WalletDataModule]),
    ],
  },
  {
    path: 'memberships',
    title: 'Memberships',
    component: MembershipsContainerComponent,
    async loadChildren() {
      return import('./memberships/memberships.routes').then(
        (m) => m.membershipsRoutes
      );
    },
    providers: [importProvidersFrom(MembershipDataModule)],
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
