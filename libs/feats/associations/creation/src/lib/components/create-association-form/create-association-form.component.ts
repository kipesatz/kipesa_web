import { Component, inject, output } from '@angular/core';
import { AssociationPayload } from '@kps/data/associations';
import { BaseFormComponent } from '@kps/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateAssociationFormService } from '../../services';
import {
  InputFieldComponent,
  TextareaComponent,
} from '@kps/forms/fields';
import { ButtonComponent, FantasyButtonComponent } from '@kps/material/button';
import {
  StepContentDirective,
  StepFooterDirective,
  StepperComponent,
  StepperNextDirective,
  StepperPrevDirective,
  StepperStepComponent,
} from '@kps/material/stepper';
import { MatHint } from '@angular/material/form-field';
import { CardRadioGroupComponent, CardRadioItemComponent } from '@kps/material/radio';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-create-association-form',
  imports: [
    InputFieldComponent,
    TextareaComponent,
    ButtonComponent,
    ReactiveFormsModule,

    StepperComponent,
    StepperStepComponent,
    StepperNextDirective,
    StepperPrevDirective,
    StepContentDirective,
    MatHint,
    FantasyButtonComponent,
    StepFooterDirective,
    CardRadioGroupComponent,
    CardRadioItemComponent,
    MatIcon,
  ],
  templateUrl: './create-association-form.component.html',
  styleUrl: './create-association-form.component.scss',
})
export class CreateAssociationFormComponent extends BaseFormComponent {
  formService = inject(CreateAssociationFormService);

  createFormSubmitted = output<AssociationPayload>();
  groupTypeOpts = [
    { name: 'family', value: 'Family' },
    { name: 'vicoba', value: 'VICOBA' },
  ];

  override getFormGroup(): FormGroup {
    return this.formService.associationForm();
  }

  displayGroupTypeFn(
    groupType: string | { name: string; value: string }
  ): string {
    if (typeof groupType === 'string') {
      return groupType;
    } else {
      return groupType.value;
    }
  }

  notifySubmit(): void {
    if (this.getFormGroup().valid) {
      this.createFormSubmitted.emit(this.getFormGroup().value);
    }
  }
}
