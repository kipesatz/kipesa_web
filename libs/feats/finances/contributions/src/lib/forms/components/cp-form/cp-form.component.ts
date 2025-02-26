import { Component, input } from '@angular/core';
import { BaseFormComponent } from '@kps/forms';
import {
  InputFieldComponent,
  TextareaComponent,
  DatepickerComponent,
} from '@kps/forms/fields';
import { CpFormGroup } from '../../services';
import { MatHint } from '@angular/material/form-field';

@Component({
  selector: 'kps-cp-form',
  imports: [
    InputFieldComponent,
    TextareaComponent,
    DatepickerComponent,
    MatHint,
  ],
  templateUrl: './cp-form.component.html',
  styles: ``,
})
export class CpFormComponent extends BaseFormComponent {
  formGroup = input.required<CpFormGroup>();

  getFormGroup = (): CpFormGroup => this.formGroup();
}
