import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Collateral, CollateralPayload } from '../models/collateral.model';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const collateralActions = createActionGroup({
  source: 'Collateral/API',
  events: {
    'Load Collaterals': props<{ loanId: string; queryParams?: HttpParams }>(),
    'Load Collaterals success': props<{
      queryset: Queryset<Collateral>;
    }>(),
    'Load Collaterals failure': props<{ error: HttpErrorResponse }>(),
    'Load Collateral': props<{ loanId: string; id: string }>(),
    'Load Collateral success': props<{ collateral: Collateral }>(),
    'Load Collateral failure': props<{ error: HttpErrorResponse }>(),
    'Add Collateral': props<{ payload: CollateralPayload }>(),
    'Add Collateral success': props<{ collateral: Collateral }>(),
    'Add Collateral failure': props<{ error: HttpErrorResponse }>(),
    'Update Collateral': props<{ id: string; updates: CollateralPayload }>(),
    'Update Collateral success': props<{ updates: Update<Collateral> }>(),
    'Update Collateral failure': props<{ error: HttpErrorResponse }>(),
    'Delete Collateral': props<{ id: string }>(),
    'Delete Collateral Success': emptyProps(),
    'Delete Collateral Failure': props<{ error: HttpErrorResponse }>(),
  },
});
