import { Injectable } from '@angular/core';
import { LoanPerformanceStats } from './loan-performance-stats.model';
import { Observable } from 'rxjs';
import { BaseAssocFinancesApiFactoryService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class LoanPerformanceApiService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    this.configure('/loans/performanceStats/');
  }

  getPerformanceStats(): Observable<LoanPerformanceStats> {
    return this.get<LoanPerformanceStats>('');
  }
}
