import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EffectBase } from '@kps/data/core';
import { createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ContributionDataService } from '../../services';
import { contributionActions } from '../actions';
import { Contribution } from '../models';

@Injectable()
export class UpdateContributionEffects extends EffectBase {
  private apiService = inject(ContributionDataService);

  approveOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contributionActions.approveContribution),
      switchMap(({ contributionId }) =>
        this.apiService.approveOne(contributionId).pipe(
          map((updates) =>
            contributionActions.approveContributionSuccess({
              updates: { id: updates.id, changes: updates },
            })
          ),
          catchError((error) =>
            of(
              contributionActions.approveContributionFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  approveOneFail$ = this.notify(
    contributionActions.approveContributionFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failed to approve contribution: ${error.error.detail}`
  );

  approveOneSuccess$ = this.notify(
    contributionActions.approveContributionSuccess,
    ({ contribution }: { contribution: Contribution }) =>
      `Contribution for ${contribution.member.fullName} is approved successfully.`
  );
}
