import { inject, Injectable, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PaymentProviderPayload } from '@kps/data/finances';
import { BaseFormService } from '@kps/forms';

export type PayMethodFg = FormGroup<{
  [K in keyof PaymentProviderPayload]: FormControl<PaymentProviderPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class PaymentProviderFormService extends BaseFormService<PaymentProviderPayload> {
  private builder = inject(FormBuilder);
  paymentProviderForm = signal<PayMethodFg>(this.buildForm());

  public override buildForm(): PayMethodFg {
    return this.builder.group({
      name: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      internalName: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      description: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(15000)],
      }),
      logo: this.builder.control<string | null>(null, {
        validators: [Validators.maxLength(255)],
      }),
      isActive: this.builder.nonNullable.control<boolean>(false),
    });
  }
}
