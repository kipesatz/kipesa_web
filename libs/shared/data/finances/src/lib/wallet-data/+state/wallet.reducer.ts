import {
  createFeature,
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';
import { walletActions } from './wallet.actions';
import { Wallet } from './wallet.model';
import { HttpErrorResponse } from '@angular/common/http';

export const walletFeatureKey = 'wallet';

export interface WalletState {
  wallet: Wallet | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

const initialState: WalletState = {
  wallet: null,
  loading: false,
  error: null,
};

export const walletReducer = createReducer(
  initialState,
  on(walletActions.loadWallet, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(walletActions.loadWalletSuccess, (state, { wallet }) => ({
    ...state,
    wallet: wallet,
    loading: false,
  })),
  on(walletActions.loadWalletFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const walletFeatureSelector =
  createFeatureSelector<WalletState>(walletFeatureKey);

export const walletFeature = createFeature({
  name: walletFeatureKey,
  reducer: walletReducer,
});

export const { selectError, selectLoading, selectWallet } = walletFeature;
