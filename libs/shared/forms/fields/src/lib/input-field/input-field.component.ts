import { Component, input } from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';
import { HTML_INPUT_TYPE } from '../types';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from '../field-error/field-error.component';

@Component({
  selector: 'kps-input-field',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    MatError,
    ReactiveFormsModule,
    FieldErrorComponent,
    MatPrefix,
    MatSuffix,
  ],
  templateUrl: './input-field.component.html',
  styles: [],
})
export class InputFieldComponent extends FormFieldComponent {
  /** The type of input for the `input` field defaults to `text` */
  inputType = input<HTML_INPUT_TYPE>('text');
}
