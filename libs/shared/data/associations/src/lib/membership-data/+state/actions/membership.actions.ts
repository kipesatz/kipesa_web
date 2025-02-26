import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import {
  Membership,
  MembershipPayload,
  ReqMembershipPayload,
} from '../models/membership.model';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const MembershipActions = createActionGroup({
  source: 'Membership/API',
  events: {
    'Load MyMemberships': props<{ queryParams?: HttpParams }>(),
    'Load MyMemberships Success': props<{ queryset: Queryset<Membership> }>(),
    'Load MyMemberships Failure': props<{ error: HttpErrorResponse }>(),
    'Load Memberships': props<{ queryParams?: HttpParams }>(),
    'Load Memberships success': props<{
      queryset: Queryset<Membership>;
    }>(),
    'Load Memberships failure': props<{ error: HttpErrorResponse }>(),
    'Load Membership': props<{ membershipId: string }>(),
    'Load Membership success': props<{ membership: Membership }>(),
    'Load Membership failure': props<{ error: HttpErrorResponse }>(),
    'Load MembershipRequests': props<{ queryParams?: HttpParams }>(),
    'Load MembershipRequests success': props<{
      queryset: Queryset<Membership>;
    }>(),
    'Load MembershipRequests failure': props<{ error: HttpErrorResponse }>(),
    'Request Membership': props<{ payload: ReqMembershipPayload }>(),
    'Request Membership success': props<{ membership: Membership }>(),
    'Request Membership failure': props<{ error: HttpErrorResponse }>(),
    'Update Membership': props<{
      membershipId: string;
      updates: MembershipPayload;
    }>(),
    'Update Membership success': props<{ updates: Update<Membership> }>(),
    'Update Membership failure': props<{ error: HttpErrorResponse }>(),
    'Approve Membership': props<{
      membershipId: string;
      payload: { status: string };
    }>(),
    'Approve Membership success': props<{ updates: Update<Membership> }>(),
    'Approve Membership failure': props<{ error: HttpErrorResponse }>(),
    'Delete Membership': props<{ membershipId: string }>(),
    'Delete Membership Success': emptyProps(),
    'Delete Membership Failure': props<{ error: HttpErrorResponse }>(),
  },
});
