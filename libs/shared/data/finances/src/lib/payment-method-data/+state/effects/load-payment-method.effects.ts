import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { PaymentMethodDataService } from '../../services';
import { paymentMethodActions } from '../actions';

@Injectable()
export class LoadPaymentMethodEffects {
  private actions$ = inject(Actions);
  private apiService = inject(PaymentMethodDataService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(paymentMethodActions.loadPaymentMethods),
      switchMap(({ queryParams }) =>
        this.apiService.getPaymentMethods(queryParams).pipe(
          map((queryset) =>
            paymentMethodActions.loadPaymentMethodsSuccess({ queryset })
          ),
          catchError((error) =>
            of(paymentMethodActions.loadPaymentMethodsFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(paymentMethodActions.loadPaymentMethod),
      switchMap(({ id }) =>
        this.apiService.getPaymentMethod(id).pipe(
          map((paymentMethod) =>
            paymentMethodActions.loadPaymentMethodSuccess({ paymentMethod })
          ),
          catchError((error) =>
            of(paymentMethodActions.loadPaymentMethodFailure({ error }))
          )
        )
      )
    );
  });
}
