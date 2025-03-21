import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EffectBase } from '@kps/data/core';
import { createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { LoanFileApiService } from '../../services';
import { loanFileActions } from '../actions';

@Injectable()
export class UploadLoanFileEffects extends EffectBase {
  private apiService = inject(LoanFileApiService);

  uploadLoanFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loanFileActions.uploadLoanFile),
      switchMap(({ loanId, payload }) =>
        this.apiService.uploadLoanFile(loanId, payload).pipe(
          map((loanFile) =>
            loanFileActions.uploadLoanFileSuccess({ loanFile })
          ),
          catchError((error) =>
            of(
              loanFileActions.uploadLoanFileFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  uploadLoanFileFail$ = this.notify(
    loanFileActions.uploadLoanFileFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failed to upload a Loan file: ${error.error.detail}`
  );

  uploadLoanFileSuccess$ = this.notify(
    loanFileActions.uploadLoanFileSuccess,
    () => `Loan File is successfully uploaded`
  );
}
