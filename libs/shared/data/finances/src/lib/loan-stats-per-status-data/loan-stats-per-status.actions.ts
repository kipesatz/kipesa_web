import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoanStatsPerStatus } from './loan-stats-per-status.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const loanStatsPerStatusActions = createActionGroup({
  source: 'LoanStatsPerStatus',
  events: {
    'Load LoanStatsPerStatus': emptyProps(),
    'Load LoanStatsPerStatus Success': props<{
      queryset: Queryset<LoanStatsPerStatus>;
    }>(),
    'Load LoanStatsPerStatus Failure': props<{ error: HttpErrorResponse }>(),
  },
});
