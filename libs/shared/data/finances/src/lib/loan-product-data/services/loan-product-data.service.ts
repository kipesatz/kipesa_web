import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Queryset } from '@kps/data/core';
import { Observable } from 'rxjs';
import { LoanProductPayload, LoanProduct } from '../+state';
import { BaseAssocFinancesApiFactoryService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class LoanProductDataService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/loanProducts`);
  }

  addLoanProduct(payload: LoanProductPayload): Observable<LoanProduct> {
    return this.post<LoanProduct, LoanProductPayload>('/', payload);
  }

  getAssocLoanProducts(
    qParams?: HttpParams
  ): Observable<Queryset<LoanProduct>> {
    return this.get<Queryset<LoanProduct>>('', qParams);
  }

  getOne(id: string) {
    return this.get<LoanProduct>(id);
  }
}
