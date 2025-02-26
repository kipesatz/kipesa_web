import { Injectable } from '@angular/core';
import { ApiFactoryService } from '@kps/data/core';
import { Membership, ReqMembershipPayload } from '../+state/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestMembershipDataService extends ApiFactoryService {
  constructor() {
    super();
    super.configure(`/associations/v1/requestMembership/`);
  }

  requestMembership(payload: ReqMembershipPayload): Observable<Membership> {
    return this.post<Membership, ReqMembershipPayload>('', payload);
  }
}
