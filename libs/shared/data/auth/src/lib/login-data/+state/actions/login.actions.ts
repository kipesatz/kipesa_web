import { createActionGroup, props } from '@ngrx/store';
import { AuthTokens, LoginPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const loginActions = createActionGroup({
  source: 'API/Login',
  events: {
    Login: props<{ payload: LoginPayload }>(),
    'Login Success': props<{ tokens: AuthTokens }>(),
    'Login Failure': props<{ error: HttpErrorResponse }>(),
  },
});
