import { Component, output, input } from '@angular/core';
import {
  FileInputComponent,
  InputFieldComponent,
  TextareaComponent,
} from '@kps/forms/fields';
import { PayMethodFg } from '../../services';
import { BaseFormComponent } from '@kps/forms';
import { MatHint } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'kps-payment-provider-form',
  imports: [
    InputFieldComponent,
    TextareaComponent,
    FileInputComponent,
    MatHint,
    MatCheckbox,
    ReactiveFormsModule,
  ],
  templateUrl: './payment-provider-form.component.html',
  styleUrl: './payment-provider-form.component.scss',
})
export class PaymentProviderFormComponent extends BaseFormComponent {
  logoChange = output<File | null>();

  formGroup = input.required<PayMethodFg>();
  getFormGroup = () => this.formGroup();
}
