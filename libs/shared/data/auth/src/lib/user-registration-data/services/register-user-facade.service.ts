import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  RegistrationPayload,
  registerUserActions,
  fromUserRegistration,
} from '../+state';

@Injectable({ providedIn: 'root' })
export class RegisterUserFacadeService {
  private store = inject(Store);

  loading = this.store.selectSignal(fromUserRegistration.selectLoading);
  error = this.store.selectSignal(fromUserRegistration.selectError);
  response = this.store.selectSignal(fromUserRegistration.selectResponse);

  dispatchRegister(payload: RegistrationPayload) {
    this.store.dispatch(registerUserActions.registerUser({ payload }));
  }
}
