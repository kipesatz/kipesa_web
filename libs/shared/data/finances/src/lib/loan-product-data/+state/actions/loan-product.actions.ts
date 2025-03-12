import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LoanProduct, LoanProductPayload } from '../models';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const loanProductActions = createActionGroup({
  source: 'LoanProduct/API',
  events: {
    'Load LoanProducts': props<{ queryParams?: HttpParams }>(),
    'Load LoanProducts success': props<{
      queryset: Queryset<LoanProduct>;
    }>(),
    'Load LoanProducts failure': props<{ error: HttpErrorResponse }>(),
    'Load Self LoanProducts': props<{ queryParams?: HttpParams }>(),
    'Load Self LoanProducts success': props<{
      queryset: Queryset<LoanProduct>;
    }>(),
    'Load Self LoanProducts failure': props<{ error: HttpErrorResponse }>(),
    'Load LoanProduct': props<{ id: string }>(),
    'Load LoanProduct success': props<{
      loanProduct: LoanProduct;
    }>(),
    'Load LoanProduct failure': props<{ error: HttpErrorResponse }>(),
    'Create LoanProduct': props<{ payload: LoanProductPayload }>(),
    'Create LoanProduct success': props<{
      loanProduct: LoanProduct;
    }>(),
    'Create LoanProduct failure': props<{
      error: HttpErrorResponse;
    }>(),
    'Approve LoanProduct': props<{ id: string }>(),
    'Approve LoanProduct success': props<{ updates: Update<LoanProduct> }>(),
    'Approve LoanProduct failure': props<{ error: HttpErrorResponse }>(),
    'Delete LoanProduct': props<{ id: string }>(),
    'Delete LoanProduct Success': emptyProps(),
    'Delete LoanProduct Failure': props<{ error: HttpErrorResponse }>(),
  },
});
