import { Injectable, inject } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { PasswordDataService } from '../../services';
import { passwordActions } from '../actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { EffectBase } from '@kps/data/core';

@Injectable()
export class ChangePasswordEffects extends EffectBase {
  private apiService = inject(PasswordDataService);

  readonly changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(passwordActions.changePassword),
      switchMap(({ payload }) =>
        this.apiService.changePassword(payload).pipe(
          map((response) =>
            passwordActions.changePasswordSuccess({ response: response })
          ),
          catchError((error) =>
            of(passwordActions.changePasswordFailure({ error }))
          )
        )
      )
    );
  });

  readonly notifyChangeSuccess$ = this.notify(
    passwordActions.changePasswordSuccess,
    ({ response }: { response: { detail: string } }) => `${response.detail}`
  );

  readonly notifyChangeFailure$ = this.notify(
    passwordActions.changePasswordFailure,
    () => `Unable to change your password`
  );
}
