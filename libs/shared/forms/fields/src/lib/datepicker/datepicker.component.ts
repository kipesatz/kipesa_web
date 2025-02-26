import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatError,
  MatLabel,
  MatHint,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { FieldErrorComponent } from '../field-error/field-error.component';

@Component({
  selector: 'kps-datepicker',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
    MatSuffix,
    MatHint,
    ReactiveFormsModule,
    FieldErrorComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
  ],
  templateUrl: './datepicker.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent extends FormFieldComponent {}
