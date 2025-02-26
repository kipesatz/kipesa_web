import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MembershipStatsApiService } from '../services/membership-stats-api.service';
import { membershipStatsActions } from './membership-stats.actions';

@Injectable()
export class MembershipStatsEffects {
  private actions$ = inject(Actions);
  private membershipStatsApi = inject(MembershipStatsApiService);

  loadMembershipStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(membershipStatsActions.loadMembershipStats),
      switchMap(({ queryParams }) =>
        this.membershipStatsApi.getMembershipStats(queryParams).pipe(
          map((membershipStats) =>
            membershipStatsActions.loadMembershipStatsSuccess({
              membershipStats,
            })
          ),
          catchError((error) =>
            of(membershipStatsActions.loadMembershipStatsFailure({ error }))
          )
        )
      )
    )
  );
}
