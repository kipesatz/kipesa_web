import { Injectable, inject } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { AuthUser } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, catchError, of } from 'rxjs';
import { AuthUserDataService } from '../../services';
import { authUserActions } from '../actions';
import { EffectBase } from '@kps/data/core';

@Injectable()
export class UpdateAuthUserEffects extends EffectBase {
  private apiService = inject(AuthUserDataService);

  readonly updateOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authUserActions.updateAuthUser),
      switchMap(({ updates }) =>
        this.apiService.updateAuthUser(updates).pipe(
          map((authUser: AuthUser) =>
            authUserActions.updateAuthUserSuccess({ authUser })
          ),
          catchError((error) =>
            of(authUserActions.updateAuthUserFailure({ error }))
          )
        )
      )
    );
  });

  readonly notifyUpdateOneSuccess$ = this.notify(
    authUserActions.updateAuthUserSuccess,
    ({ authUser }: { authUser: AuthUser }) =>
      `Hi, ${authUser.fullName}, your details was sucessfully updated`
  );

  readonly notifyUpdateOneFail$ = this.notify(
    authUserActions.updateAuthUserFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Fail to update your details with an error: ${error.message}`
  );
}
