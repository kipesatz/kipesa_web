import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FincStatsApiService } from '../services/finc-stats-api.service';
import { fincStatsActions } from './finc-stats.actions';

@Injectable()
export class FincStatsEffects {
  private actions$ = inject(Actions);
  private fincStatsApi = inject(FincStatsApiService);

  loadFincStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fincStatsActions.loadFincStats),
      switchMap(({ queryParams }) =>
        this.fincStatsApi.getFincStats(queryParams).pipe(
          map((fincStats) => fincStatsActions.loadFincStatsSuccess({ fincStats })),
          catchError((error) =>
            of(fincStatsActions.loadFincStatsFailure({ error }))
          )
        )
      )
    )
  );
}
