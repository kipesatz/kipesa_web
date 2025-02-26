import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FincReportGenPayload, fromReport, reportActions } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class ReportFacadeService {
  private store = inject(Store);

  readonly reports = this.store.selectSignal(fromReport.selectAll);
  readonly loading = this.store.selectSignal(fromReport.selectLoading);
  readonly reportsCount = this.store.selectSignal(fromReport.selectCount);
  readonly totalReports = this.store.selectSignal(fromReport.selectTotal);
  readonly error = this.store.selectSignal(fromReport.selectError)

  fetchAll(queryParams?: HttpParams) {
    this.store.dispatch(reportActions.loadReports({ queryParams }));
  }

  deleteReport(id: string) {
    this.store.dispatch(reportActions.deleteReport({ id }));
  }

  generateReport(payload: FincReportGenPayload): void {
    this.store.dispatch(reportActions.generateReport({ payload }));
  }
}
