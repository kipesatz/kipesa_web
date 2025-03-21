import { Injectable } from '@angular/core';
import { LoanStatsPerStatus } from './loan-stats-per-status.model';
import { Observable } from 'rxjs';
import { BaseAssocFinancesApiFactoryService } from '../services';
import { Queryset } from '@kps/data/core';

@Injectable({
  providedIn: 'root',
})
export class LoanStatsPerStatusApiService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    this.configure('/loans/statsByStatus/');
  }

  getStats(): Observable<Queryset<LoanStatsPerStatus>> {
    return this.get<Queryset<LoanStatsPerStatus>>('');
  }
}
