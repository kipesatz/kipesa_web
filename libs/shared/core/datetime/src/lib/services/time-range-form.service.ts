import { inject, Injectable, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormService } from '@kps/forms';
import { TimeRange } from '../types';

export type TimeRangeFg = FormGroup<{
  [K in keyof TimeRange]: FormControl<TimeRange[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class TimeRangeFormService extends BaseFormService<TimeRange> {
  private fb = inject(FormBuilder);

  timeRangeForm = signal(this.buildForm());

  buildForm(): TimeRangeFg {
    return this.fb.group({
      timeRange: this.fb.nonNullable.control('MONTHLY', [Validators.required]),
      startDate: this.fb.control<string | null>({
        value: null,
        disabled: true,
      }),
      endDate: this.fb.control<string | null>({ value: null, disabled: true }),
    });
  }
}
