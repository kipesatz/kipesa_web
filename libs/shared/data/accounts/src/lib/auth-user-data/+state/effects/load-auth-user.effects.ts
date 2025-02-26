import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { AuthUserDataService } from '../../services';
import { authUserActions } from '../actions';
import { EffectBase } from '@kps/data/core';

@Injectable()
export class LoadAuthUserEffects extends EffectBase {
  private apiService = inject(AuthUserDataService);

  readonly loadAuthUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authUserActions.loadAuthUser),
      switchMap(() =>
        this.apiService.getAuthUser().pipe(
          map((authUser) => authUserActions.loadAuthUserSuccess({ authUser })),
          catchError((error) =>
            of(authUserActions.loadAuthUserFailure({ error }))
          )
        )
      )
    );
  });

  readonly notifyLoadOneFail$ = this.notify(
    authUserActions.loadAuthUserFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Unable to fetch your details with error: ${error.message}`
  );
}
