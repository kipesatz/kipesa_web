import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ChangePasswordPayload,
  fromPassword,
  passwordActions,
} from '../../+state';

@Injectable({
  providedIn: 'root',
})
export class PasswordFacadeService {
  private store: Store = inject(Store);

  response$ = this.store.select(fromPassword.selectResponse);
  error$ = this.store.select(fromPassword.selectError);
  loading$ = this.store.select(fromPassword.selectLoading);

  dispatchChangePassword(payload: ChangePasswordPayload): void {
    this.store.dispatch(passwordActions.changePassword({ payload }));
  }
}
