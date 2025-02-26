import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Transaction } from '../models/transaction.model';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const transactionActions = createActionGroup({
  source: 'Transaction/API',
  events: {
    'Load Transactions': props<{ queryParams?: HttpParams }>(),
    'Load Transactions success': props<{
      queryset: Queryset<Transaction>;
    }>(),
    'Load Transactions failure': props<{ error: HttpErrorResponse }>(),
    'Load Transaction': props<{ id: string }>(),
    'Load Transaction success': props<{ transaction: Transaction }>(),
    'Load Transaction failure': props<{ error: HttpErrorResponse }>(),
    'Update Transaction': props<{ id: string; updates: FormData }>(),
    'Update Transaction success': props<{ updates: Update<Transaction> }>(),
    'Update Transaction failure': props<{ error: HttpErrorResponse }>(),
    'Delete Transaction': props<{ id: string }>(),
    'Delete Transaction Success': emptyProps(),
    'Delete Transaction Failure': props<{ error: HttpErrorResponse }>(),
  },
});
