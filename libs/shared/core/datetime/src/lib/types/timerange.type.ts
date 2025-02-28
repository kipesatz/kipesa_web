import { InjectionToken } from '@angular/core';

export interface TimeRangeChoice {
  value: string;
  label: string;
}

export interface TimeRange {
  timeRange: string;
  startDate: string | null;
  endDate: string | null;
}

export const TIME_RANGE_CHOICES = new InjectionToken<Array<TimeRangeChoice>>(
  'Time range injection token',
  {
    providedIn: 'root',
    factory: () => {
      return [
        { value: 'ANNUAL', label: 'Annual' },
        { value: 'SEMI_ANNUAL', label: 'Previous Six Months' },
        { value: 'QUARTERLY', label: 'Previous Three Months' },
        { value: 'MONTHLY', label: 'Last 1 Month' },
        { value: 'WEEKLY', label: 'Last One Week' },
        { value: 'CUSTOM', label: 'Custom Range' },
      ];
    },
  }
);
