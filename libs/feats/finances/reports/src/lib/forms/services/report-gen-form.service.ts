import { inject, Injectable, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BaseFormService } from '@kps/forms';
import { ReportGenPayload } from '@kps/data/finances';

export type ReportGenFg = FormGroup<{
  [K in keyof ReportGenPayload]: FormControl<ReportGenPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class ReportGenFormService extends BaseFormService<ReportGenPayload> {
  private fb = inject(FormBuilder);

  reportGenForm = signal(this.buildForm());

  buildForm(): ReportGenFg {
    return this.fb.group({
      timeRange: this.fb.nonNullable.control('MONTHLY', [Validators.required]),
      startDate: this.fb.control<string | null>({
        value: null,
        disabled: true,
      }),
      endDate: this.fb.control<string | null>({ value: null, disabled: true }),
      save: this.fb.nonNullable.control<boolean>(false),
    });
  }
}
