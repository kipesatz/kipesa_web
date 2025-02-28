import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FinancialReport, ReportGenPayload } from '../models';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const reportActions = createActionGroup({
  source: 'Report/API',
  events: {
    'Load Reports': props<{ queryParams?: HttpParams }>(),
    'Load Reports success': props<{
      queryset: Queryset<FinancialReport>;
    }>(),
    'Load Reports failure': props<{ error: HttpErrorResponse }>(),
    'Load Report': props<{ id: string }>(),
    'Load Report success': props<{ report: FinancialReport }>(),
    'Load Report failure': props<{ error: HttpErrorResponse }>(),
    'Generate Report': props<{ payload: ReportGenPayload }>(),
    'Generate Report success': props<{ reportData: FinancialReport }>(),
    'Generate Report failure': props<{ error: HttpErrorResponse }>(),
    'Delete Report': props<{ id: string }>(),
    'Delete Report Success': emptyProps(),
    'Delete Report Failure': props<{ error: HttpErrorResponse }>(),
  },
});
