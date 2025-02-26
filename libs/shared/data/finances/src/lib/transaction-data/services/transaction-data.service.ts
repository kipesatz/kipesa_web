import { Injectable } from '@angular/core';
import { Transaction } from '../+state';
import { BaseAssocFinancesApiFactoryService } from '../../services';
import { HttpParams } from '@angular/common/http';
import { Queryset } from '@kps/data/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionDataService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/transactions/`);
  }

  getMany(queryParams?: HttpParams): Observable<Queryset<Transaction>> {
    return this.get<Queryset<Transaction>>('', queryParams);
  }

  getOne(id: string) {
    return this.get<Transaction>(id);
  }

  deleteOne(transactionId: string) {
    return this.delete<void>(transactionId);
  }
}
