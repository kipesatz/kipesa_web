import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';
import { PaymentMethod } from '../models';

export const paymentMethodActions = createActionGroup({
  source: 'PaymentMethod/API',
  events: {
    'Load PaymentMethods': props<{ queryParams?: HttpParams }>(),
    'Load PaymentMethods success': props<{
      queryset: Queryset<PaymentMethod>;
    }>(),
    'Load PaymentMethods failure': props<{ error: HttpErrorResponse }>(),
    'Load PaymentMethod': props<{ id: string }>(),
    'Load PaymentMethod success': props<{ paymentMethod: PaymentMethod }>(),
    'Load PaymentMethod failure': props<{ error: HttpErrorResponse }>(),
    'Add PaymentMethod': props<{ payload: FormData }>(),
    'Add PaymentMethod success': props<{ paymentMethod: PaymentMethod }>(),
    'Add PaymentMethod failure': props<{ error: HttpErrorResponse }>(),
    'Update PaymentMethod': props<{ id: string; updates: FormData }>(),
    'Update PaymentMethod success': props<{ updates: Update<PaymentMethod> }>(),
    'Update PaymentMethod failure': props<{ error: HttpErrorResponse }>(),
    'Delete PaymentMethod': props<{ id: string }>(),
    'Delete PaymentMethod Success': emptyProps(),
    'Delete PaymentMethod Failure': props<{ error: HttpErrorResponse }>(),
  },
});
