import { inject, Injectable, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PaymentProviderPayload } from '@kps/data/finances';
import { BaseFormService } from '@kps/forms';

export type PaymentProviderFg = FormGroup<{
  [K in keyof PaymentProviderPayload]: FormControl<PaymentProviderPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class PaymentProviderFormService extends BaseFormService<PaymentProviderPayload> {
  private builder = inject(FormBuilder);
  paymentProviderForm = signal<PaymentProviderFg>(this.buildForm());

  public override buildForm(): PaymentProviderFg {
    return this.builder.group({
      name: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      channel: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(6)],
      }),
      internalName: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      description: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(15000)],
      }),
      logo: this.builder.nonNullable.control('', {
        validators: [Validators.maxLength(255)],
      }),
      apiKey: this.builder.control<string | null>(null, {
        validators: [Validators.maxLength(255)],
      }),
      apiSecret: this.builder.control<string | null>(null, {
        validators: [Validators.maxLength(255)],
      }),
      swiftCode: this.builder.control<string | null>(null, {
        validators: [Validators.maxLength(11)],
      }),
      routingNumber: this.builder.control<string | null>(null, {
        validators: [Validators.maxLength(50)],
      }),
      isActive: this.builder.nonNullable.control<boolean>(false),
    });
  }
}
