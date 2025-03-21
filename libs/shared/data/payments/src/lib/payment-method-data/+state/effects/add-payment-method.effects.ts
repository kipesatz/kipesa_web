import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EffectBase } from '@kps/data/core';
import { createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { PaymentMethodApiService } from '../../services';
import { paymentMethodActions } from '../actions';

@Injectable()
export class AddPaymentMethodEffects extends EffectBase {
  private apiService = inject(PaymentMethodApiService);

  addOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentMethodActions.addPaymentMethod),
      switchMap(({ payload }) =>
        this.apiService.addPaymentMethod(payload).pipe(
          map((paymentMethod) =>
            paymentMethodActions.addPaymentMethodSuccess({
              paymentMethod,
            })
          ),
          catchError((error) =>
            of(paymentMethodActions.addPaymentMethodFailure({ error }))
          )
        )
      )
    )
  );

  addOneFail$ = this.notify(
    paymentMethodActions.addPaymentMethodFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failure: ${error.error.detail}`
  );

  addOneSuccess$ = this.notify(
    paymentMethodActions.addPaymentMethodSuccess,
    () => `A payment method is successfully added to your account`
  );
}
