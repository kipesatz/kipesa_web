import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EffectBase } from '@kps/data/core';
import { createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { LoanProductDataService } from '../../services';
import { loanProductActions } from '../actions';

@Injectable()
export class AddLoanProductEffects extends EffectBase {
  private apiService = inject(LoanProductDataService);

  createOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loanProductActions.createLoanProduct),
      switchMap(({ payload }) =>
        this.apiService.addLoanProduct(payload).pipe(
          map((loanProduct) =>
            loanProductActions.createLoanProductSuccess({ loanProduct })
          ),
          catchError((error) =>
            of(
              loanProductActions.createLoanProductFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  createOneFail$ = this.notify(
    loanProductActions.createLoanProductFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failure to add a Loan Product: ${error.error.detail}`
  );

  createOneSuccess$ = this.notify(
    loanProductActions.createLoanProductSuccess,
    () => `Loan Product is successfully added`
  );
}
