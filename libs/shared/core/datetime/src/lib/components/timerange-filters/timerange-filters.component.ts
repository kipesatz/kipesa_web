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
import { ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { TimeRangeFormService } from '../../services';
import { TIME_RANGE_CHOICES, TimeRange, TimeRangeChoice } from '../../types';
import { DateRangeFormComponent } from '../date-range-form.component';

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
  extends DateRangeFormComponent
  implements OnInit, OnDestroy
{
  timeRangeChoices: TimeRangeChoice[] = inject(TIME_RANGE_CHOICES);
  private timeRangeFormService = inject(TimeRangeFormService);

  applyFiltersChange = output<TimeRange>();

  getFormGroup = () => this.timeRangeFormService.timeRangeForm();

  ngOnInit(): void {
    this.setupDateRangeControls(this.getFormGroup());
  }

  applyFilters(): void {
    if (this.getFormGroup().valid) {
      const formattedValues = this.getFormattedDateRangeValues<TimeRange>();
      if (formattedValues) this.applyFiltersChange.emit(formattedValues);
    }
  }
}
