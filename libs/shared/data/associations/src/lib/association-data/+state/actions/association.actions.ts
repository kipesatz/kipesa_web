import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Association, AssociationPayload } from '../models/association.model';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const associationActions = createActionGroup({
  source: 'Association/API',
  events: {
    'Load Associations': props<{ queryParams?: HttpParams }>(),
    'Load Associations success': props<{
      queryset: Queryset<Association>;
    }>(),
    'Load Associations failure': props<{ error: HttpErrorResponse }>(),
    'Load Association': props<{ associationId: string }>(),
    'Load Association success': props<{ association: Association }>(),
    'Load Association failure': props<{ error: HttpErrorResponse }>(),
    'Load Memberships': emptyProps(),
    'Load Memberships success': props<{ association: Association }>(),
    'Load Memberships failure': props<{ error: HttpErrorResponse }>(),
    'Create Association': props<{ payload: AssociationPayload }>(),
    'Create Association success': props<{ association: Association }>(),
    'Create Association failure': props<{ error: HttpErrorResponse }>(),
    'Update Association': props<{
      associationId: string;
      updates: AssociationPayload;
    }>(),
    'Update Association success': props<{ updates: Update<Association> }>(),
    'Update Association failure': props<{ error: HttpErrorResponse }>(),
    'Delete Association': props<{ associationId: string }>(),
    'Delete Association Success': emptyProps(),
    'Delete Association Failure': props<{ error: HttpErrorResponse }>(),
  },
});
