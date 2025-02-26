import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WalletApiService } from '../services/finc-stats-api.service';
import { walletActions } from './wallet.actions';

@Injectable()
export class WalletEffects {
  private actions$ = inject(Actions);
  private walletApi = inject(WalletApiService);

  loadWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(walletActions.loadWallet),
      switchMap(({ queryParams }) =>
        this.walletApi.getWallet(queryParams).pipe(
          map((wallet) => walletActions.loadWalletSuccess({ wallet })),
          catchError((error) => of(walletActions.loadWalletFailure({ error })))
        )
      )
    )
  );
}
