import { createActionGroup, props } from '@ngrx/store';
import { ChangePasswordPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const passwordActions = createActionGroup({
  source: 'Password',
  events: {
    'Change Password': props<{ payload: ChangePasswordPayload }>(),
    'Change Password Success': props<{ response: { detail: string } }>(),
    'Change Password Failure': props<{ error: HttpErrorResponse }>(),
  },
});
