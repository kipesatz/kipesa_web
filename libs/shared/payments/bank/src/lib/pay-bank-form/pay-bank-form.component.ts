import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { BaseFormComponent } from '@kps/forms';
import { InputFieldComponent } from '@kps/forms/fields';

/**
 * Contains basic fields for bank payments
 * 
 * @usageNotes
 * You must specify a formGroup with the following fields:
 * - cardNumber
 * - cardHolder
 * - cardExpiryYear
 * - cardExpiryMonth
 * - cardCvv
 */
@Component({
  selector: 'kps-pay-bank-form',
  imports: [InputFieldComponent, MatSuffix,MatIcon],
  templateUrl: './pay-bank-form.component.html',
  styleUrl: './pay-bank-form.component.scss',
})
export class PayBankFormComponent extends BaseFormComponent {
  formGroup = input.required<FormGroup>();
  getFormGroup = () => this.formGroup();
}
