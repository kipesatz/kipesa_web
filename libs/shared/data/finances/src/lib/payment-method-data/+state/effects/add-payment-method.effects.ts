import { inject, Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { PaymentMethodDataService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { EffectBase } from '@kps/data/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { paymentMethodActions } from '../actions';
import { PaymentMethod } from '../models';

@Injectable()
export class AddPaymentMethodEffects extends EffectBase {
  private apiService = inject(PaymentMethodDataService);

  addOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentMethodActions.addPaymentMethod),
      switchMap(({ payload }) =>
        this.apiService.addPaymentMethod(payload).pipe(
          map((paymentMethod) =>
            paymentMethodActions.addPaymentMethodSuccess({ paymentMethod })
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
    ({ paymentMethod }: { paymentMethod: PaymentMethod }) =>
      `Payment method: ${paymentMethod.name} is created successfully.`
  );
}
