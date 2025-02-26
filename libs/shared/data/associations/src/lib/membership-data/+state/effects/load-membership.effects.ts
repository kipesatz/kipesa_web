import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MembershipActions } from '../actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { MembershipDataService, MyMembershipDataService } from '../../services';

@Injectable()
export class LoadMembershipEffects {
  private actions$ = inject(Actions);
  private apiService = inject(MembershipDataService);
  private myMembershipApiService = inject(MyMembershipDataService);

  readonly loadMemberships$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MembershipActions.loadMemberships),
      switchMap(({ queryParams }) =>
        this.apiService.getMemberships(queryParams).pipe(
          map((queryset) =>
            MembershipActions.loadMembershipsSuccess({ queryset })
          ),
          catchError((error) =>
            of(MembershipActions.loadMembershipsFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadMembershipRequests$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MembershipActions.loadMembershipRequests),
      switchMap(({ queryParams }) =>
        this.apiService.getMembershipRequests(queryParams).pipe(
          map((queryset) =>
            MembershipActions.loadMembershipRequestsSuccess({ queryset })
          ),
          catchError((error) =>
            of(MembershipActions.loadMembershipRequestsFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadOneMembership$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MembershipActions.loadMembership),
      switchMap(({ membershipId }) =>
        this.apiService.getOne(membershipId).pipe(
          map((membership) =>
            MembershipActions.loadMembershipSuccess({ membership })
          ),
          catchError((error) =>
            of(MembershipActions.loadMembershipFailure({ error }))
          )
        )
      )
    );
  });

  loadMyMemberships$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MembershipActions.loadMyMemberships),
      switchMap(({ queryParams }) =>
        this.myMembershipApiService.getAll(queryParams).pipe(
          map((queryset) =>
            MembershipActions.loadMyMembershipsSuccess({ queryset })
          ),
          catchError((error) =>
            of(MembershipActions.loadMyMembershipsFailure({ error }))
          )
        )
      )
    );
  });
}
