import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { PaymentProviderApiService } from '../../services';
import { paymentProviderActions } from '../actions';

@Injectable()
export class LoadPaymentProviderEffects {
  private actions$ = inject(Actions);
  private apiService = inject(PaymentProviderApiService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(paymentProviderActions.loadPaymentProviders),
      switchMap(({ queryParams }) =>
        this.apiService.getPaymentProviders(queryParams).pipe(
          map((queryset) =>
            paymentProviderActions.loadPaymentProvidersSuccess({ queryset })
          ),
          catchError((error) =>
            of(paymentProviderActions.loadPaymentProvidersFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(paymentProviderActions.loadPaymentProvider),
      switchMap(({ id }) =>
        this.apiService.getPaymentProvider(id).pipe(
          map((paymentProvider) =>
            paymentProviderActions.loadPaymentProviderSuccess({
              paymentProvider,
            })
          ),
          catchError((error) =>
            of(paymentProviderActions.loadPaymentProviderFailure({ error }))
          )
        )
      )
    );
  });
}
