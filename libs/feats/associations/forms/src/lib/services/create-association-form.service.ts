import { inject, Injectable, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { AssociationPayload } from '@kps/data/associations';
import { BaseFormService } from '@kps/forms';

export type AssociationFormGroup = FormGroup<{
  [K in keyof AssociationPayload]: FormControl<AssociationPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class CreateAssociationFormService extends BaseFormService<AssociationPayload> {
  private builder = inject(NonNullableFormBuilder);
  associationForm = signal(this.buildForm());

  public override buildForm(): AssociationFormGroup {
    return this.builder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(15000)]],
    });
  }
}
