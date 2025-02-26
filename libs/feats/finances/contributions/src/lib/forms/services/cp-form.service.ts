import { inject, Injectable, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CpPayload } from '@kps/data/finances';

export type CpFormGroup = FormGroup<{
  [K in keyof CpPayload]: FormControl<CpPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class CpFormService {
  private builder = inject(NonNullableFormBuilder);

  // form with initial value
  cpForm = signal<CpFormGroup>(this.buildForm());

  buildForm(): CpFormGroup {
    return this.builder.group(
      {
        title: this.builder.control('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255),
          ],
        }),
        description: this.builder.control('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15000),
          ],
        }),
        targetAmount: this.builder.control(0.0, {
          validators: [Validators.required, Validators.min(0)],
        }),
        minAmount: this.builder.control(0.0, {
          validators: [Validators.required, Validators.min(0)],
        }),
        startDate: this.builder.control(new Date().toLocaleDateString(), {
          validators: [Validators.required],
        }),
        endDate: this.builder.control(new Date().toLocaleDateString(), {
          validators: [Validators.required],
        }),
      },
      {
        validators: [
          // comparisonValidator('targetAmount', 'minAmount', 'greater'),
          // comparisonValidator('endDate', 'startDate', 'greater'),
        ],
      }
    );
  }
}
