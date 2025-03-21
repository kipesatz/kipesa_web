import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fromCollateral,
  collateralActions,
  CollateralPayload,
} from '../+state';

@Injectable({
  providedIn: 'root',
})
export class CollateralFacadeService {
  private store = inject(Store);

  readonly allCollaterals = this.store.selectSignal(fromCollateral.selectAll);
  readonly loading = this.store.selectSignal(fromCollateral.selectLoading);
  readonly count = this.store.selectSignal(fromCollateral.selectCount);

  dispatchFetchLoanCollaterals(loanId: string, queryParams?: HttpParams) {
    this.store.dispatch(
      collateralActions.loadCollaterals({ loanId, queryParams })
    );
  }

  dispatchAddOne(payload: CollateralPayload) {
    this.store.dispatch(collateralActions.addCollateral({ payload }));
  }

  dispatchDelete(id: string) {
    this.store.dispatch(collateralActions.deleteCollateral({ id }));
  }
}
