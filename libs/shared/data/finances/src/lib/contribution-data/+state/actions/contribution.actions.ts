import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import {
  Contribution,
  ContributionPayload,
} from '../models/contribution.model';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const contributionActions = createActionGroup({
  source: 'Contribution/API',
  events: {
    'Load Contributions': props<{ queryParams?: HttpParams }>(),
    'Load Contributions success': props<{
      queryset: Queryset<Contribution>;
    }>(),
    'Load Contributions failure': props<{ error: HttpErrorResponse }>(),
    'Load Self Contributions': props<{ queryParams?: HttpParams }>(),
    'Load Self Contributions success': props<{
      queryset: Queryset<Contribution>;
    }>(),
    'Load Self Contributions failure': props<{ error: HttpErrorResponse }>(),
    'Load Contribution': props<{ contributionId: string }>(),
    'Load Contribution success': props<{
      contribution: Contribution;
    }>(),
    'Load Contribution failure': props<{ error: HttpErrorResponse }>(),
    'Create Contribution': props<{ payload: ContributionPayload }>(),
    'Create Contribution success': props<{
      contribution: Contribution;
    }>(),
    'Create Contribution failure': props<{
      error: HttpErrorResponse;
    }>(),
    'Approve Contribution': props<{ contributionId: string }>(),
    'Approve Contribution success': props<{ updates: Update<Contribution> }>(),
    'Approve Contribution failure': props<{ error: HttpErrorResponse }>(),
    'Delete Contribution': props<{ contributionId: string }>(),
    'Delete Contribution Success': emptyProps(),
    'Delete Contribution Failure': props<{ error: HttpErrorResponse }>(),
  },
});
