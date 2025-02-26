import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Queryset } from '@kps/data/core';
import { Observable } from 'rxjs';
import { BaseAssocFinancesApiFactoryService } from '../../services';
import { FinancialReport, FincReportGenPayload } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class ReportDataService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/reports`);
  }

  getMany(queryParams?: HttpParams): Observable<Queryset<FinancialReport>> {
    return this.get<Queryset<FinancialReport>>('', queryParams);
  }

  getOne(id: string) {
    return this.get<FinancialReport>(id);
  }

  getLatestStats(
    queryParams?: HttpParams
  ): Observable<Queryset<FinancialReport>> {
    return this.get<Queryset<FinancialReport>>('/latest/stats', queryParams);
  }

  generateReport(payload: FincReportGenPayload): Observable<FinancialReport> {
    return this.post<FinancialReport, FincReportGenPayload>(
      '/generate',
      payload
    );
  }

  deleteOne(id: string) {
    return this.delete<void>(id);
  }
}
