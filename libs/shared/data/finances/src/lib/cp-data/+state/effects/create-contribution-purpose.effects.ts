import { inject, Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { ContributionPurposeActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';
import { EffectBase } from '@kps/data/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { CpDataService } from '../../services';

@Injectable()
export class CreateContributionPurposeEffects extends EffectBase {
  private apiService = inject(CpDataService);

  createOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionPurposeActions.createContributionPurpose),
      switchMap(({ payload }) =>
        this.apiService.createOne(payload).pipe(
          map((cp) =>
            ContributionPurposeActions.createContributionPurposeSuccess({
              contributionPurpose: cp,
            })
          ),
          catchError((error) =>
            of(
              ContributionPurposeActions.createContributionPurposeFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  createOneFail$ = this.notify(
    ContributionPurposeActions.createContributionPurposeFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failure to create contribution purpose: ${error.error.detail}`
  );

  createOneSuccess$ = this.notify(
    ContributionPurposeActions.createContributionPurposeSuccess,
    () => `Contribution purpose is created successfully.`
  );
}
