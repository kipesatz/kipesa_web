import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { LoanDataService } from '../../services';
import { loanActions } from '../actions';

@Injectable()
export class LoadLoanEffects {
  private actions$ = inject(Actions);
  private apiService = inject(LoanDataService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loanActions.loadLoans),
      switchMap(({ queryParams }) =>
        this.apiService.getAssocLoans(queryParams).pipe(
          map((queryset) => loanActions.loadLoansSuccess({ queryset })),
          catchError((error) => of(loanActions.loadLoansFailure({ error })))
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loanActions.loadLoan),
      switchMap(({ id }) =>
        this.apiService.getOne(id).pipe(
          map((loan) => loanActions.loadLoanSuccess({ loan })),
          catchError((error) => of(loanActions.loadLoanFailure({ error })))
        )
      )
    );
  });
}
