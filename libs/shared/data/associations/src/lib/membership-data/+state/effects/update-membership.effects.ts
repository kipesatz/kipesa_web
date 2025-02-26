import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EffectBase } from '@kps/data/core';
import { createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { MembershipDataService } from '../../services';
import { MembershipActions } from '../actions';
import { Membership } from '../models';

@Injectable()
export class UpdateMembershipEffects extends EffectBase {
  private membershipService = inject(MembershipDataService);

  updateMembership$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembershipActions.updateMembership),
      switchMap(({ membershipId, updates }) =>
        this.membershipService.updateOne(membershipId, updates).pipe(
          map((membership) =>
            MembershipActions.updateMembershipSuccess({
              updates: { id: membership.id, changes: membership },
            })
          ),
          catchError((error) =>
            of(MembershipActions.updateMembershipFailure({ error }))
          )
        )
      )
    )
  );

  updateFail$ = this.notify(
    MembershipActions.updateMembershipFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failure to update Membership: ${error.error.detail}`
  );

  reqSuccess$ = this.notify(
    MembershipActions.updateMembershipSuccess,
    ({ membership }: { membership: Membership }) => {
      return `Successfully updated membership of ${membership.user.fullName}`;
    }
  );

  approveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembershipActions.approveMembership),
      switchMap(({ membershipId, payload }) =>
        this.membershipService.approveRequest(membershipId, payload).pipe(
          map((membership) =>
            MembershipActions.approveMembershipSuccess({
              updates: { id: membership.id, changes: membership },
            })
          ),
          catchError((error) =>
            of(MembershipActions.approveMembershipFailure({ error }))
          )
        )
      )
    )
  );

  approveFail$ = this.notify(
    MembershipActions.approveMembershipFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Fail to approve membership request: ${error.error.detail}`
  );

  approveSuccess$ = this.notify(
    MembershipActions.approveMembershipSuccess,
    () => `Congratulations, a membership request is approved`
  );
}
