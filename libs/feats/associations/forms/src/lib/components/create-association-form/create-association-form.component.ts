import { Component, inject, output } from '@angular/core';
import { AssociationPayload } from '@kps/data/associations';
import { BaseFormComponent } from '@kps/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateAssociationFormService } from '../../services';
import { InputFieldComponent, TextareaComponent } from '@kps/forms/fields';
import { ButtonComponent } from '@kps/material/button';
import { ValidityProgressCheckerComponent } from '@kps/material/progress';

@Component({
  selector: 'kps-create-association-form',
  imports: [
    InputFieldComponent,
    TextareaComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ValidityProgressCheckerComponent,
  ],
  templateUrl: './create-association-form.component.html',
  styleUrl: './create-association-form.component.scss',
})
export class CreateAssociationFormComponent extends BaseFormComponent {
  formService = inject(CreateAssociationFormService);

  createFormSubmitted = output<AssociationPayload>();

  override getFormGroup(): FormGroup {
    return this.formService.associationForm();
  }

  notifySubmit(): void {
    if (this.getFormGroup().valid) {
      this.createFormSubmitted.emit(this.getFormGroup().value);
    }
  }
}
