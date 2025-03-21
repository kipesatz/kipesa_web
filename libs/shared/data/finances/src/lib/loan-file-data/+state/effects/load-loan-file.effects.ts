import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { LoanFileApiService } from '../../services';
import { loanFileActions } from '../actions';

@Injectable()
export class LoadLoanFileEffects {
  private actions$ = inject(Actions);
  private apiService = inject(LoanFileApiService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loanFileActions.loadLoanFiles),
      switchMap(({ loanId, queryParams }) =>
        this.apiService.getLoanLoanFiles(loanId, queryParams).pipe(
          map((queryset) => loanFileActions.loadLoanFilesSuccess({ queryset })),
          catchError((error) =>
            of(loanFileActions.loadLoanFilesFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loanFileActions.loadLoanFile),
      switchMap(({ loanId, fileId }) =>
        this.apiService.getOne(loanId, fileId).pipe(
          map((loanFile) => loanFileActions.loadLoanFileSuccess({ loanFile })),
          catchError((error) =>
            of(loanFileActions.loadLoanFileFailure({ error }))
          )
        )
      )
    );
  });
}
