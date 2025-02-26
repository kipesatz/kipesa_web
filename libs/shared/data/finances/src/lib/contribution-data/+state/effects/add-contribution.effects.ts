import { inject, Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { ContributionDataService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { EffectBase } from '@kps/data/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { contributionActions } from '../actions';

@Injectable()
export class AddContributionEffects extends EffectBase {
  private apiService = inject(ContributionDataService);

  createOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contributionActions.createContribution),
      switchMap(({ payload }) =>
        this.apiService.addContribution(payload).pipe(
          map((contribution) =>
            contributionActions.createContributionSuccess({ contribution })
          ),
          catchError((error) =>
            of(
              contributionActions.createContributionFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  createOneFail$ = this.notify(
    contributionActions.createContributionFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failure to add contribution: ${error.error.detail}`
  );

  createOneSuccess$ = this.notify(
    contributionActions.createContributionSuccess,
    () => `Contribution added successfully.`
  );
}
