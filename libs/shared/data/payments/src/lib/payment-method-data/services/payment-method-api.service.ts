import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiFactoryService, Queryset } from '@kps/data/core';
import { Observable } from 'rxjs';
import { PaymentMethod, PaymentMethodPayload } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodApiService extends ApiFactoryService {
  constructor() {
    super();
    super.configure(`/finances/v1/paymentMethods`);
  }

  addPaymentMethod(payload: PaymentMethodPayload): Observable<PaymentMethod> {
    return this.post<PaymentMethod, PaymentMethodPayload>('/', payload);
  }

  getPaymentMethods(qParams?: HttpParams): Observable<Queryset<PaymentMethod>> {
    return this.get<Queryset<PaymentMethod>>('', qParams);
  }

  getPaymentMethod(id: string) {
    return this.get<PaymentMethod>(id);
  }

  updatePaymentMethod(id: string, payload: PaymentMethodPayload) {
    return this.put<PaymentMethod, PaymentMethodPayload>(id, payload);
  }
}
