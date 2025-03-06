import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFormComponent } from '@kps/forms';
import { PinfoEditFg } from '../../services';
import { DatepickerComponent, InputFieldComponent } from '@kps/forms/fields';

@Component({
  selector: 'kps-pinfo-edit-form',
  imports: [InputFieldComponent, DatepickerComponent],
  templateUrl: './pinfo-edit-form.component.html',
  styleUrl: './pinfo-edit-form.component.scss',
})
export class PinfoEditFormComponent extends BaseFormComponent {
  formGroup = input.required<PinfoEditFg>();
  getFormGroup = () => this.formGroup();
}
