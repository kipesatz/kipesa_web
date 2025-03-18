import { Injectable } from '@angular/core';
import { PaymentProvider } from '../+state';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseFinancesApiFactoryService } from '../../services';
import { Queryset } from '@kps/data/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentProviderApiService extends BaseFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/paymentProviders/`);
  }

  addPaymentProvider(payload: FormData): Observable<PaymentProvider> {
    return this.post<PaymentProvider, FormData>('', payload);
  }

  getPaymentProviders(qParams?: HttpParams): Observable<Queryset<PaymentProvider>> {
    return this.get<Queryset<PaymentProvider>>('', qParams);
  }

  getPaymentProvider(id: string) {
    return this.get<PaymentProvider>(id);
  }

  updatePaymentProvider(id: string, payload: FormData) {
    return this.put<PaymentProvider, FormData>(id, payload);
  }

  deletePaymentProvider(id: string) {
    return this.delete<void>(id);
  }
}
