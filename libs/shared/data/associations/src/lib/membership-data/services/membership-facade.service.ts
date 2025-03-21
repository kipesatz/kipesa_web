import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fromMembership,
  MembershipActions,
  MembershipPayload,
  ReqMembershipPayload,
} from '../+state';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MembershipFacadeService {
  private store = inject(Store);

  readonly memberships = this.store.selectSignal(fromMembership.selectAll);
  readonly membershipIds = this.store.selectSignal(fromMembership.selectIds);
  readonly loading = this.store.selectSignal(fromMembership.selectLoading);
  readonly error = this.store.selectSignal(fromMembership.selectError);
  readonly membershipsCount = this.store.selectSignal(
    fromMembership.selectCount
  );
  readonly totalMemberships = this.store.selectSignal(
    fromMembership.selectTotal
  );

  selectOne = (memberId: string) =>
    this.store.selectSignal(fromMembership.selectOne(memberId));

  dispatchFetchAll(queryParams?: HttpParams) {
    this.store.dispatch(MembershipActions.loadMemberships({ queryParams }));
  }

  dispatchFetchRequests(queryParams?: HttpParams) {
    this.store.dispatch(
      MembershipActions.loadMembershipRequests({ queryParams })
    );
  }

  dispatchApproveRequest(
    membershipId: string,
    payload: { status: string }
  ): void {
    this.store.dispatch(
      MembershipActions.approveMembership({ membershipId, payload })
    );
  }

  reqMembership(payload: ReqMembershipPayload) {
    this.store.dispatch(MembershipActions.requestMembership({ payload }));
  }

  dispatchUpdateOne(membershipId: string, updates: MembershipPayload) {
    this.store.dispatch(
      MembershipActions.updateMembership({ membershipId, updates })
    );
  }

  dispatchFetchOne(membershipId: string) {
    this.store.dispatch(MembershipActions.loadMembership({ membershipId }));
  }

  deleteMembership(membershipId: string) {
    this.store.dispatch(MembershipActions.deleteMembership({ membershipId }));
  }

  fetchMyMemberships(queryParams?: HttpParams) {
    this.store.dispatch(MembershipActions.loadMyMemberships({ queryParams }));
  }
}
