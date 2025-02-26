import { NgModule } from '@angular/core';
import { fromWallet, WalletEffects } from './+state';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

@NgModule({
  providers: [
    provideState(fromWallet.walletFeature),
    provideEffects([WalletEffects]),
  ],
})
export class WalletDataModule {}
