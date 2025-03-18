import { inject, Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { PaymentProviderApiService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { EffectBase } from '@kps/data/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { paymentProviderActions } from '../actions';
import { PaymentProvider } from '../models';

@Injectable()
export class AddPaymentProviderEffects extends EffectBase {
  private apiService = inject(PaymentProviderApiService);

  addOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentProviderActions.addPaymentProvider),
      switchMap(({ payload }) =>
        this.apiService.addPaymentProvider(payload).pipe(
          map((paymentProvider) =>
            paymentProviderActions.addPaymentProviderSuccess({ paymentProvider })
          ),
          catchError((error) =>
            of(paymentProviderActions.addPaymentProviderFailure({ error }))
          )
        )
      )
    )
  );

  addOneFail$ = this.notify(
    paymentProviderActions.addPaymentProviderFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failure: ${error.error.detail}`
  );

  addOneSuccess$ = this.notify(
    paymentProviderActions.addPaymentProviderSuccess,
    ({ paymentProvider }: { paymentProvider: PaymentProvider }) =>
      `Payment method: ${paymentProvider.name} is created successfully.`
  );
}
