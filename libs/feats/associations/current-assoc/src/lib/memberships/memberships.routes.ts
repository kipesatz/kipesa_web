import { Routes } from '@angular/router';
import {
  MemberDetailsPageComponent,
  MembershipRequestsComponent,
  MembershipsPageComponent,
} from './pages';

export const membershipsRoutes: Routes = [
  { path: 'approved', component: MembershipsPageComponent, title: 'Active' },
  {
    path: 'requests',
    component: MembershipRequestsComponent,
    title: 'Requests',
  },
  { path: ':memberId', component: MemberDetailsPageComponent },
  { path: '', redirectTo: 'approved', pathMatch: 'full' },
];
