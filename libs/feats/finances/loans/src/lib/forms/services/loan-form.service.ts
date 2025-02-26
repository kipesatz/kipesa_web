import { inject, Injectable, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Loan, LoanPayload } from '@kps/data/finances';
import { BaseFormService } from '@kps/forms';

export type LoanFg = FormGroup<{
  [K in keyof LoanPayload]: FormControl<LoanPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class ContributionFormService implements BaseFormService<LoanPayload> {
  private fb = inject(FormBuilder);

  loanForm = signal<LoanFg>(this.buildForm());

  public buildForm(): LoanFg {
    return this.fb.group({
      borrower: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      closureDate: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      totalAmountDue: this.fb.nonNullable.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      disbursedAmount: this.fb.nonNullable.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalInterest: this.fb.nonNullable.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      interestRate: this.fb.nonNullable.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      lastRepaymentAmount: this.fb.nonNullable.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      nextRepaymentAmount: this.fb.nonNullable.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      loanFee: this.fb.nonNullable.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      remainingBalance: this.fb.nonNullable.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      repaymentFrequency: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      loanPurpose: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      loanStatus: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      loanType: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      defaultDate: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      lastRepaymentDate: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      nextRepaymentDate: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      dueDate: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      issueDate: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      notes: this.fb.control<string | null>(null, {
        validators: [Validators.maxLength(15000)],
      }),
    });
  }

  public patchForm(loan?: Loan): void {
    if (loan) {
      this.loanForm().patchValue({
        ...loan,
        borrower: loan.borrower.id,
      });
    }
  }
}
