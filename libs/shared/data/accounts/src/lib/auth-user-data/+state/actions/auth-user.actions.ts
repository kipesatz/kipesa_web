import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AuthUser, AuthUserPayload } from '../models/auth-user.model';
import { HttpErrorResponse } from '@angular/common/http';

export const authUserActions = createActionGroup({
  source: 'AuthUser/API',
  events: {
    'Load AuthUser': emptyProps(),
    'Load AuthUser success': props<{ authUser: AuthUser }>(),
    'Load AuthUser failure': props<{ error: HttpErrorResponse }>(),
    'Update AuthUser': props<{ updates: AuthUserPayload }>(),
    'Update AuthUser success': props<{ authUser: AuthUser }>(),
    'Update AuthUser failure': props<{ error: HttpErrorResponse }>(),
  },
});
