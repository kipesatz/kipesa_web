import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ContributionPurpose, CpPayload } from '../models';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const ContributionPurposeActions = createActionGroup({
  source: 'ContributionPurpose/API',
  events: {
    'Load ContributionPurposes': props<{ queryParams?: HttpParams }>(),
    'Load ContributionPurposes success': props<{
      queryset: Queryset<ContributionPurpose>;
    }>(),
    'Load ContributionPurposes failure': props<{ error: HttpErrorResponse }>(),
    'Load ContributionPurpose': props<{ cpId: string }>(),
    'Load ContributionPurpose success': props<{
      contributionPurpose: ContributionPurpose;
    }>(),
    'Load ContributionPurpose failure': props<{ error: HttpErrorResponse }>(),
    'Create ContributionPurpose': props<{ payload: CpPayload }>(),
    'Create ContributionPurpose success': props<{
      contributionPurpose: ContributionPurpose;
    }>(),
    'Create ContributionPurpose failure': props<{
      error: HttpErrorResponse;
    }>(),
    'Update ContributionPurpose': props<{
      cpId: string;
      updates: CpPayload;
    }>(),
    'Update ContributionPurpose success': props<{
      updates: Update<ContributionPurpose>;
    }>(),
    'Update ContributionPurpose failure': props<{ error: HttpErrorResponse }>(),
    'Delete ContributionPurpose': props<{ cpId: string }>(),
    'Delete ContributionPurpose Success': emptyProps(),
    'Delete ContributionPurpose Failure': props<{ error: HttpErrorResponse }>(),
  },
});
