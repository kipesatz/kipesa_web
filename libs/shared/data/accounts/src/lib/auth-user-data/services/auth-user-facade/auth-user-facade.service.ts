import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthUserPayload, authUserActions, fromAuthUser } from '../../+state';

@Injectable({
  providedIn: 'root',
})
export class AuthUserFacadeService {
  private store: Store = inject(Store);

  authUser$ = this.store.selectSignal(fromAuthUser.selectAuthUser);
  error$ = this.store.selectSignal(fromAuthUser.selectError);
  loading$ = this.store.selectSignal(fromAuthUser.selectLoading);

  dispatchLoadAuthUser(): void {
    this.store.dispatch(authUserActions.loadAuthUser());
  }

  dispatchUpdateAuthUser(updates: AuthUserPayload): void {
    this.store.dispatch(authUserActions.updateAuthUser({ updates }));
  }
}
