import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';
import { membershipStatsActions, fromMembershipStats } from '../+state';

@Injectable({ providedIn: 'root' })
export class MembershipStatsFacadeService {
  private store = inject(Store);

  membershipStats = this.store.selectSignal(
    fromMembershipStats.selectMembershipStats
  );
  loading = this.store.selectSignal(fromMembershipStats.selectLoading);
  error = this.store.selectSignal(fromMembershipStats.selectError);

  loadMembershipStats(queryParams?: HttpParams): void {
    this.store.dispatch(
      membershipStatsActions.loadMembershipStats({ queryParams })
    );
  }
}
