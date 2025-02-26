import { inject, Injectable } from '@angular/core';
import { fromLogout, LogoutActions } from '../+state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class LogoutFacadeService {
  private store = inject(Store);

  loading = this.store.selectSignal(fromLogout.selectLoading);
  error = this.store.selectSignal(fromLogout.selectError);

  dispatchLogout() {
    this.store.dispatch(LogoutActions.logout());
  }
}
