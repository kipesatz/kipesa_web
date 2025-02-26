import { inject, Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { MembershipActions } from '../actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { RequestMembershipDataService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { EffectBase } from '@kps/data/core';

@Injectable()
export class RequestMembershipEffects extends EffectBase {
  private reqMembershipApiService = inject(RequestMembershipDataService);

  requestMembership$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembershipActions.requestMembership),
      switchMap(({ payload }) =>
        this.reqMembershipApiService.requestMembership(payload).pipe(
          map((membership) =>
            MembershipActions.requestMembershipSuccess({ membership })
          ),
          catchError((error) =>
            of(MembershipActions.requestMembershipFailure({ error }))
          )
        )
      )
    )
  );

  reqFail$ = this.notify(
    MembershipActions.requestMembershipFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Membershp request Failure: ${error.error.detail}`
  );

  reqSuccess$ = this.notify(
    MembershipActions.requestMembershipSuccess,
    () => `A membership request sent successfully.`
  );
}
