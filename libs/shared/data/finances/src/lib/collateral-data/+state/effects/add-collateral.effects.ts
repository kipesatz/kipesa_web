import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EffectBase } from '@kps/data/core';
import { createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { CollateralApiService } from '../../services';
import { collateralActions } from '../actions';

@Injectable()
export class AddCollateralEffects extends EffectBase {
  private apiService = inject(CollateralApiService);

  createOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(collateralActions.addCollateral),
      switchMap(({ payload }) =>
        this.apiService.addCollateral(payload).pipe(
          map((collateral) =>
            collateralActions.addCollateralSuccess({ collateral })
          ),
          catchError((error) =>
            of(
              collateralActions.addCollateralFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  createOneFail$ = this.notify(
    collateralActions.addCollateralFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failed to add collateral for this loan ${error.error.detail}`
  );

  createOneSuccess$ = this.notify(
    collateralActions.addCollateralSuccess,
    () => `Collateral is addded successfully`
  );
}
