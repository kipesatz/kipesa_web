import { inject, Injectable } from '@angular/core';
import { EffectBase } from '@kps/data/core';
import { createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { JWT_AUTH_TOKEN_KEY, StorageService } from '@kps/data/storage';
import { AuthTokens } from '../models';
import { LoginDataService } from '../../services';
import { loginActions } from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects extends EffectBase {
  private loginApiService = inject(LoginDataService);
  private tokenKey = inject(JWT_AUTH_TOKEN_KEY);
  private storageService = inject(StorageService<AuthTokens>);
  private router = inject(Router);

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
          this.router.navigateByUrl('/dashboards/myDashboard'); // to login
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
