import { createActionGroup, props } from '@ngrx/store';

import { LoanPayment, LoanPaymentPayload } from '../models';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const loanPaymentActions = createActionGroup({
  source: 'LoanPayment/API',
  events: {
    'Load LoanPayments': props<{ queryParams?: HttpParams }>(),
    'Load LoanPayments success': props<{
      queryset: Queryset<LoanPayment>;
    }>(),
    'Load LoanPayments failure': props<{ error: HttpErrorResponse }>(),
    'Load LoanPayment': props<{ id: string }>(),
    'Load LoanPayment success': props<{ loanPayment: LoanPayment }>(),
    'Load LoanPayment failure': props<{ error: HttpErrorResponse }>(),
    'Add LoanPayment': props<{ payload: LoanPaymentPayload }>(),
    'Add LoanPayment success': props<{ loanPayment: LoanPayment }>(),
    'Add LoanPayment failure': props<{ error: HttpErrorResponse }>(),
  },
});
