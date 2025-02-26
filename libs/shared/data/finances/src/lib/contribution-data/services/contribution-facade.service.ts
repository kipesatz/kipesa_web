import { inject, Injectable } from '@angular/core';
import {
  ContributionPayload,
  fromContribution,
  contributionActions,
} from '../+state';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ContributionFacadeService {
  private store = inject(Store);

  readonly allContributions = this.store.selectSignal(
    fromContribution.selectAll
  );
  readonly loading = this.store.selectSignal(fromContribution.selectLoading);
  readonly count = this.store.selectSignal(fromContribution.selectCount);
  readonly total = this.store.selectSignal(fromContribution.selectTotal);

  fetchAll(queryParams?: HttpParams) {
    this.store.dispatch(contributionActions.loadContributions({ queryParams }));
  }

  fetchSelfContributions(queryParams?: HttpParams) {
    this.store.dispatch(
      contributionActions.loadSelfContributions({ queryParams })
    );
  }

  addOne(payload: ContributionPayload) {
    this.store.dispatch(contributionActions.createContribution({ payload }));
  }

  dispatchApprove(id: string) {
    this.store.dispatch(
      contributionActions.approveContribution({ contributionId: id })
    );
  }

  dispatchDelete(id: string) {
    this.store.dispatch(
      contributionActions.deleteContribution({ contributionId: id })
    );
  }
}
