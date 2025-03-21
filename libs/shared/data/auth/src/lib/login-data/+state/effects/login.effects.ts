import { inject, Injectable } from '@angular/core';
import { EffectBase } from '@kps/data/core';
import { createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { JWT_AUTH_TOKEN_KEY, LocalStorageService } from '@kps/data/storage';
import { LoginDataService } from '../../services';
import { loginActions } from '../actions';

@Injectable()
export class LoginEffects extends EffectBase {
  private loginApiService = inject(LoginDataService);
  private tokenKey = inject(JWT_AUTH_TOKEN_KEY);
  private storageService = inject(LocalStorageService);

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.login),
      exhaustMap(({ payload }) =>
        this.loginApiService.login(payload).pipe(
          map((tokens) => loginActions.loginSuccess({ tokens })),
          catchError((error) =>
            of(loginActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  readonly storeAuthTokensAndNavigateToDashboard$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginActions.loginSuccess),
        tap(({ tokens }) => {
          this.storageService.setItem(this.tokenKey, tokens); // store authToken

          // TODO: Ensure that users are taken to a proper place after login
          // this.assocAccessService.handleAssociationAccess();
        })
      );
    },
    { dispatch: false }
  );

  readonly notifySuccess$ = this.notify(
    loginActions.loginSuccess,
    () => 'Authentication successful!'
  );
  readonly notifyFailure$ = this.notify(
    loginActions.loginFailure,
    ({ error }: { error: string }) => error
  );
}
