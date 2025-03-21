import { Component, output, input, inject } from '@angular/core';
import {
  FileInputComponent,
  InputFieldComponent,
  TextareaComponent,
} from '@kps/forms/fields';
import { PaymentProviderFg } from '../../services';
import { BaseFormComponent } from '@kps/forms';
import { MatHint } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatStep,
  MatStepContent,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { PAYMENT_CHANNEL_OPTIONS } from '@kps/data/payments';
import {
  CardRadioGroupComponent,
  CardRadioItemComponent,
} from '@kps/material/radio';
import { StepFooterDirective } from '@kps/material/stepper';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'kps-payment-provider-form',
  imports: [
    InputFieldComponent,
    TextareaComponent,
    FileInputComponent,
    MatHint,
    MatCheckbox,
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatStepContent,
    MatStepperNext,
    MatStepperPrevious,
    MatStepLabel,
    MatButton,
    MatIcon,
    CardRadioGroupComponent,
    CardRadioItemComponent,
    StepFooterDirective,
  ],
  templateUrl: './payment-provider-form.component.html',
  styleUrl: './payment-provider-form.component.scss',
})
export class PaymentProviderFormComponent extends BaseFormComponent {
  providerChannelOptions = inject(PAYMENT_CHANNEL_OPTIONS);

  logoChange = output<File | null>();
  formGroup = input.required<PaymentProviderFg>();
  getFormGroup = () => this.formGroup();
}
