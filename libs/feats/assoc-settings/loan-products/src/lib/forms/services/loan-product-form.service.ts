import { inject, Injectable, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { LoanProductPayload } from '@kps/data/finances';
import { BaseFormService } from '@kps/forms';

export type LoanProductFg = FormGroup<{
  [K in keyof LoanProductPayload]: FormControl<LoanProductPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class LoanProductFormService extends BaseFormService<LoanProductPayload> {
  private builder = inject(NonNullableFormBuilder);
  loanProductFg = signal<LoanProductFg>(this.buildForm());

  public override buildForm(): LoanProductFg {
    return this.builder.group({
      name: this.builder.control('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      description: this.builder.control('', [Validators.required]),
      minAmount: this.builder.control(0, [Validators.required]),
      maxAmount: this.builder.control(0, [Validators.required]),
      minTermMonths: this.builder.control(1, [Validators.required]),
      maxTermMonths: this.builder.control(12, [Validators.required]),
      interestRate: this.builder.control(12, [Validators.required]),
      paymentFrequency: this.builder.control('', [Validators.required]),
      latePaymentFee: this.builder.control(0, [Validators.required]),
      earlyPaymentFee: this.builder.control(0, [Validators.required]),
      earlyPaymentPenalty: this.builder.control(0, [Validators.required]),
      requiredCreditScore: this.builder.control(0, [Validators.required]),
      earlyPaymentAllowed: this.builder.control<boolean>(false),
      isActive: this.builder.control<boolean>(false),
    });
  }
}
