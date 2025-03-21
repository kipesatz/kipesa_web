import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoanPerformanceStats } from './loan-performance-stats.model';
import { HttpErrorResponse } from '@angular/common/http';

export const loanPerformanceStatsActions = createActionGroup({
  source: 'LoanPerformanceStats',
  events: {
    'Load LoanPerformanceStats': emptyProps(),
    'Load LoanPerformanceStats Success': props<{
      data: LoanPerformanceStats;
    }>(),
    'Load LoanPerformanceStats Failure': props<{ error: HttpErrorResponse }>(),
  },
});
