import { inject, Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { LogoutActions } from './logout.actions';
import { Router } from '@angular/router';
import { EffectBase } from '@kps/data/core';
import {
  JWT_AUTH_TOKEN_KEY,
  LocalStorageService,
  SessionStorageService,
} from '@kps/data/storage';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { LogoutDataService } from '../services';
import { LogoutResponse } from './logout-response.model';
import {
  ACTIVE_MEMBERSHIPS_IDS_ACCESS_KEY,
  CURRENT_ASSOC_TOKEN,
} from '@kps/data/associations';

@Injectable()
export class LogoutEffects extends EffectBase {
  private logoutApiService = inject(LogoutDataService);
  private router = inject(Router);
  private jwtTokenKey = inject(JWT_AUTH_TOKEN_KEY);
  private curAssocToken = inject(CURRENT_ASSOC_TOKEN);
  private activeMembershipsToken = inject(ACTIVE_MEMBERSHIPS_IDS_ACCESS_KEY);
  private lsService = inject(LocalStorageService);
  private sessionService = inject(SessionStorageService);

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

  readonly cleanLsDataAndNavigate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LogoutActions.logoutSuccess),
        tap(() => {
          // remove necessary data
          this.lsService.removeItem(this.jwtTokenKey);
          this.sessionService.removeItem(this.curAssocToken.idKey);
          this.sessionService.removeItem(this.curAssocToken.nameKey);
          this.sessionService.removeItem(this.activeMembershipsToken);

          // navigate to login
          this.router.navigate(['/accounts', 'auth', 'login']);
        })
      );
    },
    { dispatch: false }
  );

  readonly notifySuccess$ = this.notify(
    LogoutActions.logoutSuccess,
    ({ response }: { response: LogoutResponse }) => `${response.message}`
  );
  readonly notifyFailure$ = this.notify(
    LogoutActions.logoutFailure,
    () => 'Failure to log you out, please try again later.'
  );
}
