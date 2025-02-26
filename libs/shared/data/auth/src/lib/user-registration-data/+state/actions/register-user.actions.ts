import { createActionGroup, props } from '@ngrx/store';
import { RegistrationPayload, RegistrationResponse } from '../models';

export const registerUserActions = createActionGroup({
  source: 'API/RegisterUser',
  events: {
    'Register User': props<{ payload: RegistrationPayload }>(),
    'Register User Success': props<{ response: RegistrationResponse }>(),
    'Register User Failure': props<{ error: string }>(),
  },
});
