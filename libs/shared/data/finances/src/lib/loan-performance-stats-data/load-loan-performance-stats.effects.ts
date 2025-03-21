import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoanPerformanceApiService } from './loan-performance-api.service';
import { loanPerformanceStatsActions } from './loan-performance-stats.actions';
import { switchMap, map, catchError, of } from 'rxjs';

@Injectable()
export class LoadLoanPerformanceStatsEffects {
  private actions$ = inject(Actions);
  private loansPerformanceStatssApi = inject(LoanPerformanceApiService);

  loadLoanPerformanceStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loanPerformanceStatsActions.loadLoanPerformanceStats),
      switchMap(() =>
        this.loansPerformanceStatssApi.getPerformanceStats().pipe(
          map((data) =>
            loanPerformanceStatsActions.loadLoanPerformanceStatsSuccess({
              data,
            })
          ),
          catchError((error) =>
            of(
              loanPerformanceStatsActions.loadLoanPerformanceStatsFailure({
                error,
              })
            )
          )
        )
      )
    )
  );
}
