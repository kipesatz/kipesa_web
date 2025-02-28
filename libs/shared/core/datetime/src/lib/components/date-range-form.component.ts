import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '@kps/forms';
import dayjs from 'dayjs';
import { Subscription } from 'rxjs';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

@Component({
  selector: 'kps-date-range-form',
  imports: [],
  template: ``,
  styles: ``,
})
export abstract class DateRangeFormComponent
  extends BaseFormComponent
  implements OnDestroy
{
  protected subscriptions = new Subscription();

  /**
   * @usageNotes
   * Handles the setup and management of date range controls in a form group.
   * This includes enabling/disabling the controls based on the selected time range,
   * validating the start and end dates, and formatting the date range values.
   */
  protected setupDateRangeControls(formGroup: FormGroup): void {
    const startDateControl = formGroup.get('startDate');
    const endDateControl = formGroup.get('endDate');

    this.subscriptions.add(
      formGroup.get('timeRange')?.valueChanges.subscribe((value) => {
        if (value === 'CUSTOM') {
          startDateControl?.enable();
          endDateControl?.enable();
          startDateControl?.setValidators([Validators.required]);
          endDateControl?.setValidators([Validators.required]);
        } else {
          startDateControl?.disable();
          endDateControl?.disable();
          startDateControl?.clearValidators();
          endDateControl?.clearValidators();
        }

        startDateControl?.updateValueAndValidity();
        endDateControl?.updateValueAndValidity();
      })
    );

    this.subscriptions.add(
      startDateControl?.valueChanges.subscribe((startDate) => {
        if (startDate && endDateControl?.value) {
          if (dayjs(endDateControl.value).isBefore(dayjs(startDate))) {
            endDateControl.setValue(null);
          }
        }
      })
    );
  }

  /**
   * Filters the end date based on the start date value.
   * If the start date is not set or the provided date is null, returns true.
   * Otherwise, returns true if the provided date is the same or after the start date.
   *
   * @param date The date to filter.
   * @returns True if the date is the same or after the start date, false otherwise.
   */
  filterEndDate = (date: Date | null): boolean => {
    const startDate = this.getFormGroup().get('startDate')?.value;
    return !startDate || !date
      ? true
      : dayjs(date).isSameOrAfter(dayjs(startDate), 'day');
  };

  /**
   * @usageNotes
   * Retrieves the formatted date range values from the form group.
   * If the form group is valid, it formats the `startDate` and `endDate` values
   * as 'YYYY-MM-DD' strings and returns the form value. If the form group is
   * invalid, it returns `null`.
   *
   * @returns The formatted date range values, or `null` if the form is invalid.
   */
  protected getFormattedDateRangeValues<T>(): T | null {
    if (this.getFormGroup().valid) {
      const formValue = this.getFormGroup().getRawValue();

      if (formValue.startDate) {
        formValue.startDate = dayjs(formValue.startDate).format('YYYY-MM-DD');
      }
      if (formValue.endDate) {
        formValue.endDate = dayjs(formValue.endDate).format('YYYY-MM-DD');
      }

      return formValue;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
