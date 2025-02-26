import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../+state';
import { BaseAssocFinancesApiFactoryService } from '../../services';

@Injectable({ providedIn: 'root' })
export class WalletApiService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    this.configure('/wallet');
  }

  getWallet(queryParams?: HttpParams): Observable<Wallet> {
    return this.get<Wallet>('', queryParams);
  }
}
