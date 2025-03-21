import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { CollateralApiService } from '../../services';
import { collateralActions } from '../actions';

@Injectable()
export class LoadCollateralEffects {
  private actions$ = inject(Actions);
  private apiService = inject(CollateralApiService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(collateralActions.loadCollaterals),
      switchMap(({ loanId, queryParams }) =>
        this.apiService.getLoanCollaterals(loanId, queryParams).pipe(
          map((queryset) =>
            collateralActions.loadCollateralsSuccess({ queryset })
          ),
          catchError((error) =>
            of(collateralActions.loadCollateralsFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(collateralActions.loadCollateral),
      switchMap(({ loanId, id }) =>
        this.apiService.getOne(loanId, id).pipe(
          map((collateral) =>
            collateralActions.loadCollateralSuccess({ collateral })
          ),
          catchError((error) =>
            of(collateralActions.loadCollateralFailure({ error }))
          )
        )
      )
    );
  });
}
