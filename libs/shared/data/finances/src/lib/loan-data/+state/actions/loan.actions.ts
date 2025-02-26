import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Loan, LoanPayload } from '../models/loan.model';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const loanActions = createActionGroup({
  source: 'Loan/API',
  events: {
    'Load Loans': props<{ queryParams?: HttpParams }>(),
    'Load Loans success': props<{
      queryset: Queryset<Loan>;
    }>(),
    'Load Loans failure': props<{ error: HttpErrorResponse }>(),
    'Load Loan': props<{ id: string }>(),
    'Load Loan success': props<{ loan: Loan }>(),
    'Load Loan failure': props<{ error: HttpErrorResponse }>(),
    'Create Loan': props<{ payload: LoanPayload }>(),
    'Create Loan success': props<{ loan: Loan }>(),
    'Create Loan failure': props<{ error: HttpErrorResponse }>(),
    'Update Loan': props<{ id: string; updates: LoanPayload }>(),
    'Update Loan success': props<{ updates: Update<Loan> }>(),
    'Update Loan failure': props<{ error: HttpErrorResponse }>(),
    'Delete Loan': props<{ id: string }>(),
    'Delete Loan Success': emptyProps(),
    'Delete Loan Failure': props<{ error: HttpErrorResponse }>(),
  },
});
