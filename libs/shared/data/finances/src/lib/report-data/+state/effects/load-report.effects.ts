import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ReportDataService } from '../../services';
import { reportActions } from '../actions';

@Injectable()
export class LoadReportEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ReportDataService);

  readonly loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(reportActions.loadReports),
      switchMap(({ queryParams }) =>
        this.apiService.getMany(queryParams).pipe(
          map((queryset) => reportActions.loadReportsSuccess({ queryset })),
          catchError((error) => of(reportActions.loadReportsFailure({ error })))
        )
      )
    );
  });

  readonly loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(reportActions.loadReport),
      switchMap(({ id }) =>
        this.apiService.getOne(id).pipe(
          map((report) => reportActions.loadReportSuccess({ report })),
          catchError((error) => of(reportActions.loadReportFailure({ error })))
        )
      )
    );
  });
}
