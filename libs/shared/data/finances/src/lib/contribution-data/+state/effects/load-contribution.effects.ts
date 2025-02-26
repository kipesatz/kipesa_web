import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ContributionDataService } from '../../services';
import { contributionActions } from '../actions';

@Injectable()
export class LoadContributionEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ContributionDataService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contributionActions.loadContributions),
      switchMap(({ queryParams }) =>
        this.apiService.getAllContributions(queryParams).pipe(
          map((queryset) =>
            contributionActions.loadContributionsSuccess({ queryset })
          ),
          catchError((error) =>
            of(contributionActions.loadContributionsFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadSelfContributions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contributionActions.loadSelfContributions),
      switchMap(({ queryParams }) =>
        this.apiService.getSelfContributions(queryParams).pipe(
          map((queryset) =>
            contributionActions.loadSelfContributionsSuccess({ queryset })
          ),
          catchError((error) =>
            of(contributionActions.loadSelfContributionsFailure({ error }))
          )
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contributionActions.loadContribution),
      switchMap(({ contributionId }) =>
        this.apiService.getOne(contributionId).pipe(
          map((contribution) =>
            contributionActions.loadContributionSuccess({ contribution })
          ),
          catchError((error) =>
            of(contributionActions.loadContributionFailure({ error }))
          )
        )
      )
    );
  });
}
