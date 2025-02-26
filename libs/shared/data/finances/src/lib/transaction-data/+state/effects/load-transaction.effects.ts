import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { transactionActions } from '../actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { TransactionDataService } from '../../services';

@Injectable()
export class LoadTransactionEffects {
  private actions$ = inject(Actions);
  private apiService = inject(TransactionDataService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(transactionActions.loadTransactions),
      switchMap(({ queryParams }) =>
        this.apiService.getMany(queryParams).pipe(
          map((queryset) =>
            transactionActions.loadTransactionsSuccess({ queryset })
          ),
          catchError((error) =>
            of(transactionActions.loadTransactionsFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(transactionActions.loadTransaction),
      switchMap(({ id }) =>
        this.apiService.getOne(id).pipe(
          map((transaction) =>
            transactionActions.loadTransactionSuccess({ transaction })
          ),
          catchError((error) =>
            of(transactionActions.loadTransactionFailure({ error }))
          )
        )
      )
    );
  });
}
