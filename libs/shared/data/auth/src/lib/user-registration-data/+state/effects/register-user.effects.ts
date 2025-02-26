import { inject, Injectable } from '@angular/core';
import { EffectBase } from '@kps/data/core';
import { createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { registerUserActions } from '../actions';
import { RegisterUserDataService } from '../../services';
import { Router } from '@angular/router';
import { RegistrationResponse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RegisterUserEffects extends EffectBase {
  private regUserApiService = inject(RegisterUserDataService);
  private router = inject(Router);

  private readonly register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUserActions.registerUser),
      exhaustMap(({ payload }) =>
        this.regUserApiService.register(payload).pipe(
          map((response) =>
            registerUserActions.registerUserSuccess({ response })
          ),
          catchError((error) =>
            of(
              registerUserActions.registerUserFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  private readonly redirectToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerUserActions.registerUserSuccess),
        tap(() => {
          this.router.navigate(['/accounts/auth/login']);
        })
      ),
    { dispatch: false }
  );

  private readonly notifySuccess$ = this.notify(
    registerUserActions.registerUserSuccess,
    ({ response }: { response: RegistrationResponse }) =>
      `Congratulations ${response.firstName} ${response.lastName}! Your account has been created. Please login to continue.`
  );

  private readonly notifyFailure$ = this.notify(
    registerUserActions.registerUserFailure,
    ({ error }: { error: HttpErrorResponse }) => {
      if (typeof error == 'string') {
        return error;
      } else {
        return error.error.message;
      }
    }
  );
}
