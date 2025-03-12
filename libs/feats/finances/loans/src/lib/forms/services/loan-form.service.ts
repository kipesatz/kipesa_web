import { inject, Injectable, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Loan, LoanPayload } from '@kps/data/finances';
import { BaseFormService } from '@kps/forms';

export type LoanFg = FormGroup<{
  [K in keyof LoanPayload]: FormControl<LoanPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class LoanFormService implements BaseFormService<LoanPayload> {
  private nfb = inject(NonNullableFormBuilder);

  loanForm = signal<LoanFg>(this.buildForm());

  public buildForm(): LoanFg {
    return this.nfb.group({
      member: this.nfb.control('', {
        validators: [Validators.required],
      }),
      loanProduct: this.nfb.control('', {
        validators: [Validators.required],
      }),
      loanAmount: this.nfb.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      loanPurpose: this.nfb.control('', {
        validators: [Validators.required, Validators.maxLength(300)],
      }),
      currency: this.nfb.control('', {
        validators: [Validators.required, Validators.maxLength(300)],
      }),
      notes: this.nfb.control('', {
        validators: [Validators.required],
      }),
      loanTermYears: this.nfb.control(1, {
        validators: [Validators.required, Validators.min(0)],
      }),
      loanTermMonths: this.nfb.control(1, {
        validators: [Validators.required, Validators.min(0)],
      }),
      paymentFrequency: this.nfb.control('', {
        validators: [Validators.required, Validators.maxLength(300)],
      }),
    });
  }

  public patchForm(loan?: Loan): void {
    if (loan) {
      this.loanForm().patchValue({
        ...loan,
        member: loan.member.id,
        loanProduct: loan.loanProduct.id,
      });
    }
  }
}
