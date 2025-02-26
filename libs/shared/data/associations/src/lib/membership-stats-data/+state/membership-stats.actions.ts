import { createActionGroup, props } from '@ngrx/store';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MembershipStats } from './membership-stats.model';

export const membershipStatsActions = createActionGroup({
  source: 'API/MembershipStats',
  events: {
    'Load MembershipStats': props<{ queryParams?: HttpParams }>(),
    'Load MembershipStats Success': props<{
      membershipStats: MembershipStats;
    }>(),
    'Load MembershipStats Failure': props<{ error: HttpErrorResponse }>(),
  },
});
