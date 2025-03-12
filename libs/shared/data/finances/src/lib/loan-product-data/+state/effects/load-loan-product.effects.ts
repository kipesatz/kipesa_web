import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { LoanProductDataService } from '../../services';
import { loanProductActions } from '../actions';

@Injectable()
export class LoadLoanProductEffects {
  private actions$ = inject(Actions);
  private apiService = inject(LoanProductDataService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loanProductActions.loadLoanProducts),
      switchMap(({ queryParams }) =>
        this.apiService.getAssocLoanProducts(queryParams).pipe(
          map((queryset) =>
            loanProductActions.loadLoanProductsSuccess({ queryset })
          ),
          catchError((error) =>
            of(loanProductActions.loadLoanProductsFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loanProductActions.loadLoanProduct),
      switchMap(({ id }) =>
        this.apiService.getOne(id).pipe(
          map((loanProduct) =>
            loanProductActions.loadLoanProductSuccess({ loanProduct })
          ),
          catchError((error) =>
            of(loanProductActions.loadLoanProductFailure({ error }))
          )
        )
      )
    );
  });
}
