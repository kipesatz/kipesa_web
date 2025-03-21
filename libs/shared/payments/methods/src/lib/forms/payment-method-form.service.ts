import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { PaymentMethodPayload } from '@kps/data/payments';
import { BaseFormService } from '@kps/forms';

export type PaymentMethodFg = FormGroup<{
  [K in keyof PaymentMethodPayload]: FormControl<PaymentMethodPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodFormService extends BaseFormService<PaymentMethodPayload> {
  private fb = inject(FormBuilder);
  formGroup = signal(this.buildForm());

  buildForm(): PaymentMethodFg {
    return this.fb.group({
      provider: this.fb.nonNullable.control(''),
      methodType: this.fb.nonNullable.control('MOBILE'),
      isDefault: this.fb.nonNullable.control(false),
      isActive: this.fb.nonNullable.control(true),
      nickname: this.fb.control(''),
      cardExpiryYear: this.fb.control<number | null>(null),
      cardExpiryMonth: this.fb.control<number | null>(null),
      cardNumber: this.fb.control<string | null>(null),
      cardCvv: this.fb.control<number | null>(null),
      cardHoldersName: this.fb.control<string | null>(null),
      phoneNumber: this.fb.control<string | null>(null),
    });
  }
}
