import { Injectable } from '@angular/core';
import { Queryset } from '@kps/data/core';
import { BaseAssocApiFactoryService } from '../../association-data';
import {
  Membership,
  MembershipPayload,
  ReqMembershipPayload,
} from '../+state/models';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembershipDataService extends BaseAssocApiFactoryService {
  constructor() {
    super();
    super.configure(`/memberships`);
  }

  requestMembership(payload: ReqMembershipPayload): Observable<Membership> {
    return this.post<Membership, ReqMembershipPayload>('/', payload);
  }

  approveRequest(id: string, payload: { status: string }) {
    return this.put<Membership, { status: string }>(
      `/requests/${id}/approve/`,
      payload
    );
  }

  getMemberships(queryParams?: HttpParams): Observable<Queryset<Membership>> {
    return this.get<Queryset<Membership>>('/', queryParams);
  }

  getMembershipRequests(
    queryParams?: HttpParams
  ): Observable<Queryset<Membership>> {
    return this.get<Queryset<Membership>>('/requests/', queryParams);
  }

  getOne(id: string) {
    return this.get<Membership>(`/${id}/`);
  }

  updateOne(membershipId: string, payload: MembershipPayload) {
    return this.put<Membership, MembershipPayload>(membershipId, payload);
  }

  deleteOne(membershipId: string) {
    return this.delete<void>(membershipId);
  }
}
