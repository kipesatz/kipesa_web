import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Queryset } from '@kps/data/core';
import { Observable } from 'rxjs';
import { Loan, LoanPayload } from '../+state';
import { BaseAssocFinancesApiFactoryService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class LoanDataService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/loans`);
  }

  getAssocLoans(queryParams?: HttpParams): Observable<Queryset<Loan>> {
    return this.get<Queryset<Loan>>('', queryParams);
  }

  applyForLoan(payload: LoanPayload): Observable<Loan> {
    return this.post<Loan, LoanPayload>('/apply/', payload);
  }

  getOne(id: string) {
    return this.get<Loan>(`/${id}`);
  }

  deleteOne(loanId: string) {
    return this.delete<void>(loanId);
  }
}
