import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSuffix,
} from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { BaseFormComponent } from '@kps/forms';
import { TimeRangeFormService } from '../../services';
import { TIME_RANGE_CHOICES, TimeRange, TimeRangeChoice } from '../../types';
import { Subscription } from 'rxjs';

dayjs.extend(isSameOrAfter);

@Component({
  selector: 'kps-timerange-filters',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,

    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatInput,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatButton,
    MatSuffix,
  ],
  templateUrl: './timerange-filters.component.html',
  styleUrl: './timerange-filters.component.scss',
})
export class TimerangeFiltersComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy
{
  timeRangeChoices: TimeRangeChoice[] = inject(TIME_RANGE_CHOICES);
  private timeRangeFormService = inject(TimeRangeFormService);

  applyFiltersChange = output<TimeRange>();
  private subscriptions = new Subscription();

  getFormGroup = () => this.timeRangeFormService.timeRangeForm();

  ngOnInit(): void {
    // Listen to timeRange changes to enable/disable date fields
    this.subscriptions.add(
      this.getFormGroup()
        .get('timeRange')
        ?.valueChanges.subscribe((value) => {
          if (value === 'CUSTOM') {
            this.getFormGroup().controls.startDate?.enable();
            this.getFormGroup().controls.endDate?.enable();
            this.getFormGroup()
              .get('startDate')
              ?.setValidators([Validators.required]);
            this.getFormGroup().controls.endDate?.setValidators([
              Validators.required,
            ]);
          } else {
            this.getFormGroup().controls.startDate?.disable();
            this.getFormGroup().controls.endDate?.disable();
            this.getFormGroup().controls.startDate?.clearValidators();
            this.getFormGroup().controls.endDate?.clearValidators();
          }
          this.getFormGroup().controls.startDate?.updateValueAndValidity();
          this.getFormGroup().controls.endDate?.updateValueAndValidity();
        })
    );

    // Add listener for start date changes
    this.subscriptions.add(
      this.getFormGroup().controls.startDate?.valueChanges.subscribe(
        (startDate) => {
          const endDateControl = this.getFormGroup().get('endDate');
          if (startDate && endDateControl?.value) {
            // If end date is earlier than start date, clear it
            if (dayjs(endDateControl.value).isBefore(dayjs(startDate))) {
              endDateControl.setValue(null);
            }
          }
        }
      )
    );
  }

  // Method to filter out dates before start date
  filterEndDate = (date: Date | null): boolean => {
    const startDate = this.getFormGroup().controls.startDate?.value;
    if (!startDate || !date) {
      return true;
    }
    return dayjs(date).isSameOrAfter(dayjs(startDate), 'day');
  };

  applyFilters(): void {
    if (this.getFormGroup().valid) {
      const formValue = this.getFormGroup().getRawValue();

      // Format dates if they exist
      if (formValue.startDate) {
        formValue.startDate = dayjs(formValue.startDate).format('YYYY-MM-DD');
      }
      if (formValue.endDate) {
        formValue.endDate = dayjs(formValue.endDate).format('YYYY-MM-DD');
      }

      this.applyFiltersChange.emit(formValue);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
