import { inject, Injectable, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PayMethodPayload } from '@kps/data/finances';
import { BaseFormService } from '@kps/forms';

export type PayMethodFg = FormGroup<{
  [K in keyof PayMethodPayload]: FormControl<PayMethodPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class PayMethodFormService extends BaseFormService<PayMethodPayload> {
  private builder = inject(FormBuilder);
  paymentMethodForm = signal<PayMethodFg>(this.buildForm());

  public override buildForm(): PayMethodFg {
    return this.builder.group({
      name: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      provider: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      description: this.builder.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(15000)],
      }),
      providerLogo: this.builder.control<string | null>(null, {
        validators: [Validators.maxLength(255)],
      }),
      isActive: this.builder.nonNullable.control<boolean>(false),
    });
  }
}
