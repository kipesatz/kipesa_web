import { inject, Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { LoanDataService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { EffectBase } from '@kps/data/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { loanActions } from '../actions';

@Injectable()
export class AddLoanEffects extends EffectBase {
  private apiService = inject(LoanDataService);

  createOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loanActions.createLoan),
      switchMap(({ payload }) =>
        this.apiService.applyForLoan(payload).pipe(
          map((loan) => loanActions.createLoanSuccess({ loan })),
          catchError((error) =>
            of(
              loanActions.createLoanFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  createOneFail$ = this.notify(
    loanActions.createLoanFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `The application for Loan failed: ${error.error.detail}`
  );

  createOneSuccess$ = this.notify(
    loanActions.createLoanSuccess,
    () => `Congratulations! A loan request is successfully submitted`
  );
}
