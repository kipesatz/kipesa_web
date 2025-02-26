import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidityProgressCheckerComponent } from '@kps/material/progress';
import { BaseFormComponent } from '@kps/forms';
import { LoanFg } from '../../services';
import {
  DatepickerComponent,
  InputFieldComponent,
  SelectFieldComponent,
  TextareaComponent,
} from '@kps/forms/fields';
import { EditorComponent } from '@kps/forms/editor';
import { MatOption } from '@angular/material/core';
import { MatStep, MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'kps-loan-form',
  imports: [
    ValidityProgressCheckerComponent,
    SelectFieldComponent,
    InputFieldComponent,
    EditorComponent,
    DatepickerComponent,
    MatOption,
    MatStepper,
    MatStep,
  ],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.scss',
})
export class LoanFormComponent extends BaseFormComponent {
  loanFg = input.required<LoanFg>();

  getFormGroup = () => this.loanFg();
}
