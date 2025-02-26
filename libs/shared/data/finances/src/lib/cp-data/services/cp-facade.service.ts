import { inject, Injectable } from '@angular/core';
import { ContributionPurposeActions, CpPayload, fromCps } from '../+state';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class CpFacadeService {
  private store = inject(Store);

  readonly allCps = this.store.selectSignal(fromCps.selectAll);
  readonly cpsLoading = this.store.selectSignal(fromCps.selectLoading);
  readonly cpsCount = this.store.selectSignal(fromCps.selectCount);
  readonly totalCps = this.store.selectSignal(fromCps.selectTotal);
  readonly cpError = this.store.selectSignal(fromCps.selectError);
  readonly selectOne = (cpId: string) =>
    this.store.selectSignal(fromCps.selectOne(cpId));

  dispatchFetchAll(queryParams?: HttpParams) {
    this.store.dispatch(
      ContributionPurposeActions.loadContributionPurposes({ queryParams })
    );
  }

  dispatchFetchOne(cpId: string) {
    this.store.dispatch(
      ContributionPurposeActions.loadContributionPurpose({ cpId })
    );
  }

  dispatchCreateOne(payload: CpPayload) {
    this.store.dispatch(
      ContributionPurposeActions.createContributionPurpose({ payload })
    );
  }

  dispatchUpdateOne(cpId: string, updates: CpPayload) {
    this.store.dispatch(
      ContributionPurposeActions.updateContributionPurpose({ cpId, updates })
    );
  }

  dispatchDelete(cpId: string) {
    this.store.dispatch(
      ContributionPurposeActions.deleteContributionPurpose({ cpId })
    );
  }
}
