import { inject, Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { LogoutActions } from './logout.actions';
import { Router } from '@angular/router';
import { EffectBase } from '@kps/data/core';
import { JWT_AUTH_TOKEN_KEY, StorageService } from '@kps/data/storage';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { LogoutDataService } from '../services';
import { LogoutResponse } from './logout-response.model';
import { CURRENT_ASSOC_TOKEN } from '@kps/data/associations';

@Injectable()
export class LogoutEffects extends EffectBase {
  private logoutApiService = inject(LogoutDataService);
  private router = inject(Router);
  private jwtTokenKey = inject(JWT_AUTH_TOKEN_KEY);
  private curAssocToken = inject(CURRENT_ASSOC_TOKEN);
  private storageService = inject(StorageService<string>);

  readonly logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogoutActions.logout),
      exhaustMap(() =>
        this.logoutApiService.logout().pipe(
          map((response) => LogoutActions.logoutSuccess({ response })),
          catchError((error) =>
            of(LogoutActions.logoutFailure({ error: error.message }))
          )
        )
      )
    )
  );

  private readonly cleanLsDataAndNavigate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LogoutActions.logoutSuccess),
        tap(() => {
          // remove necessary data
          this.storageService.removeItem(this.jwtTokenKey);
          this.storageService.removeItem(this.curAssocToken.idKey);
          this.storageService.removeItem(this.curAssocToken.nameKey);

          // navigate to login
          this.router.navigate(['/accounts', 'auth', 'login']);
        })
      );
    },
    { dispatch: false }
  );

  private readonly notifySuccess$ = this.notify(
    LogoutActions.logoutSuccess,
    ({ response }: { response: LogoutResponse }) => `${response.message}`
  );
  private readonly notifyFailure$ = this.notify(
    LogoutActions.logoutFailure,
    () => 'Failure to log you out, please try again later.'
  );
}
