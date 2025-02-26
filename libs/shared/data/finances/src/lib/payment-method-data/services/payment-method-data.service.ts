import { Injectable } from '@angular/core';
import { PaymentMethod } from '../+state';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseFinancesApiFactoryService } from '../../services';
import { Queryset } from '@kps/data/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodDataService extends BaseFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/paymentMethods/`);
  }

  addPaymentMethod(payload: FormData): Observable<PaymentMethod> {
    return this.post<PaymentMethod, FormData>('', payload);
  }

  getPaymentMethods(qParams?: HttpParams): Observable<Queryset<PaymentMethod>> {
    return this.get<Queryset<PaymentMethod>>('', qParams);
  }

  getPaymentMethod(id: string) {
    return this.get<PaymentMethod>(id);
  }

  updatePaymentMethod(id: string, payload: FormData) {
    return this.put<PaymentMethod, FormData>(id, payload);
  }

  deletePaymentMethod(id: string) {
    return this.delete<void>(id);
  }
}
