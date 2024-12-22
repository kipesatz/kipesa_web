import { Component, Input } from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatHint, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FieldErrorComponent } from '../field-error/field-error.component';

@Component({
  selector: 'kps-textarea',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatHint,
    MatError,
    MatLabel,
    ReactiveFormsModule,
    FieldErrorComponent,
  ],
  templateUrl: './textarea.component.html',
  styles: [],
})
export class TextareaComponent extends FormFieldComponent {
  @Input() height = 5;

  getFormControl = () => this.formControl
}
