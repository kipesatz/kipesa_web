import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LogoutResponse } from './logout-response.model';
import { HttpErrorResponse } from '@angular/common/http';

export const LogoutActions = createActionGroup({
  source: 'Logout/API',
  events: {
    Logout: emptyProps(),
    'Logout Success': props<{ response: LogoutResponse }>(),
    'Logout Failure': props<{ error: HttpErrorResponse }>(),
  },
});
