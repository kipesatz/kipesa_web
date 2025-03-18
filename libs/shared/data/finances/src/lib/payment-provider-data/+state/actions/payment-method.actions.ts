import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';
import { PaymentProvider } from '../models';

export const paymentProviderActions = createActionGroup({
  source: 'PaymentProvider/API',
  events: {
    'Load PaymentProviders': props<{ queryParams?: HttpParams }>(),
    'Load PaymentProviders success': props<{
      queryset: Queryset<PaymentProvider>;
    }>(),
    'Load PaymentProviders failure': props<{ error: HttpErrorResponse }>(),
    'Load PaymentProvider': props<{ id: string }>(),
    'Load PaymentProvider success': props<{ paymentProvider: PaymentProvider }>(),
    'Load PaymentProvider failure': props<{ error: HttpErrorResponse }>(),
    'Add PaymentProvider': props<{ payload: FormData }>(),
    'Add PaymentProvider success': props<{ paymentProvider: PaymentProvider }>(),
    'Add PaymentProvider failure': props<{ error: HttpErrorResponse }>(),
    'Update PaymentProvider': props<{ id: string; updates: FormData }>(),
    'Update PaymentProvider success': props<{ updates: Update<PaymentProvider> }>(),
    'Update PaymentProvider failure': props<{ error: HttpErrorResponse }>(),
    'Delete PaymentProvider': props<{ id: string }>(),
    'Delete PaymentProvider Success': emptyProps(),
    'Delete PaymentProvider Failure': props<{ error: HttpErrorResponse }>(),
  },
});
