import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loanStatsPerStatusActions } from './loan-stats-per-status.actions';
import { LoanStatsPerStatusApiService } from './loan-stats-per-status-api.service';
import { switchMap, map, catchError, of } from 'rxjs';

@Injectable()
export class LoanStatsPerStatusEffects {
  private actions$ = inject(Actions);
  private apiService = inject(LoanStatsPerStatusApiService);

  loadLoanStatsPerStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loanStatsPerStatusActions.loadLoanStatsPerStatus),
      switchMap(() =>
        this.apiService.getStats().pipe(
          map((queryset) =>
            loanStatsPerStatusActions.loadLoanStatsPerStatusSuccess({
              queryset,
            })
          ),
          catchError((error) =>
            of(
              loanStatsPerStatusActions.loadLoanStatsPerStatusFailure({
                error,
              })
            )
          )
        )
      )
    )
  );
}
