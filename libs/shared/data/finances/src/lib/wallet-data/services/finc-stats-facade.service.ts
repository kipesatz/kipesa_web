import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';
import { walletActions, fromWallet } from '../+state';

@Injectable({ providedIn: 'root' })
export class WalletFacadeService {
  private store = inject(Store);

  wallet = this.store.selectSignal(fromWallet.selectWallet);
  loading = this.store.selectSignal(fromWallet.selectLoading);
  error = this.store.selectSignal(fromWallet.selectError);

  loadWallet(queryParams?: HttpParams): void {
    this.store.dispatch(walletActions.loadWallet({ queryParams }));
  }
}
