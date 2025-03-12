import { Component, inject, input } from '@angular/core';
import { BaseFormComponent } from '@kps/forms';
import { LoanProductFg } from '../../services';
import {
  StepFooterDirective,
  StepperComponent,
  StepperNextDirective,
  StepperPrevDirective,
  StepperStepComponent,
} from '@kps/material/stepper';
import {
  CheckboxRowComponent,
  InputFieldComponent,
  SelectFieldComponent,
  TextareaComponent,
} from '@kps/forms/fields';
import { FantasyButtonComponent } from '@kps/material/button';
import { MatOption } from '@angular/material/core';
import { PAYMENT_FREQ_CHOICES } from '@kps/data/finances';

@Component({
  selector: 'kps-loan-product-form',
  imports: [
    StepperComponent,
    StepperStepComponent,
    StepperNextDirective,
    StepperPrevDirective,
    StepFooterDirective,
    InputFieldComponent,
    SelectFieldComponent,
    TextareaComponent,
    FantasyButtonComponent,
    MatOption,
    CheckboxRowComponent,
  ],
  templateUrl: './loan-product-form.component.html',
  styleUrl: './loan-product-form.component.scss',
})
export class LoanProductFormComponent extends BaseFormComponent {
  public payFreqChoices = inject(PAYMENT_FREQ_CHOICES);

  loanProductFg = input.required<LoanProductFg>();
  getFormGroup = () => this.loanProductFg();
}
