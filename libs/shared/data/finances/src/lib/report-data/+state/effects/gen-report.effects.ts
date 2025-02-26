import { inject, Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { reportActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';
import { EffectBase } from '@kps/data/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { ReportDataService } from '../../services';

@Injectable()
export class GenerateReportEffects extends EffectBase {
  private apiService = inject(ReportDataService);

  createOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reportActions.generateReport),
      switchMap(({ payload }) =>
        this.apiService.generateReport(payload).pipe(
          map((report) => reportActions.generateReportSuccess({ report })),
          catchError((error) =>
            of(
              reportActions.generateReportFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  createOneFail$ = this.notify(
    reportActions.generateReportFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failed to generate report: ${error.error.detail}`
  );

  createOneSuccess$ = this.notify(
    reportActions.generateReportSuccess,
    () => `Report generated successfully.`
  );
}
