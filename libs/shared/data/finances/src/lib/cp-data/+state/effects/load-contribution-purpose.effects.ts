import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContributionPurposeActions } from '../actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { CpDataService } from '../../services';

@Injectable()
export class LoadContributionPurposeEffects {
  private actions$ = inject(Actions);
  private apiService = inject(CpDataService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContributionPurposeActions.loadContributionPurposes),
      switchMap(({ queryParams }) =>
        this.apiService.getMany(queryParams).pipe(
          map((queryset) =>
            ContributionPurposeActions.loadContributionPurposesSuccess({
              queryset,
            })
          ),
          catchError((error) =>
            of(
              ContributionPurposeActions.loadContributionPurposesFailure({
                error,
              })
            )
          )
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContributionPurposeActions.loadContributionPurpose),
      switchMap(({ cpId }) =>
        this.apiService.getOne(cpId).pipe(
          map((contributionPurpose) =>
            ContributionPurposeActions.loadContributionPurposeSuccess({
              contributionPurpose,
            })
          ),
          catchError((error) =>
            of(
              ContributionPurposeActions.loadContributionPurposeFailure({
                error,
              })
            )
          )
        )
      )
    );
  });
}
