import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromLogin, loginActions, LoginPayload } from '../+state';

@Injectable({ providedIn: 'root' })
export class LoginFacadeService {
  private store = inject(Store);

  loading = this.store.selectSignal(fromLogin.selectLoading);
  error = this.store.selectSignal(fromLogin.selectError);

  dispatchLogin(loginPayload: LoginPayload) {
    this.store.dispatch(loginActions.login({ payload: loginPayload }));
  }
}
