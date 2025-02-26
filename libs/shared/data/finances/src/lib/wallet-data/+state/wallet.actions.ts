import { createActionGroup, props } from '@ngrx/store';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Wallet } from './wallet.model';

export const walletActions = createActionGroup({
  source: 'API/Wallet',
  events: {
    'Load Wallet': props<{ queryParams?: HttpParams }>(),
    'Load Wallet Success': props<{ wallet: Wallet }>(),
    'Load Wallet Failure': props<{ error: HttpErrorResponse }>(),
  },
});
