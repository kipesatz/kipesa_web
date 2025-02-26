import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MembershipStats } from '../+state';
import { BaseAssocApiFactoryService } from '../../association-data';

@Injectable({ providedIn: 'root' })
export class MembershipStatsApiService extends BaseAssocApiFactoryService {
  constructor() {
    super();
    this.configure('/memberships/stats');
  }

  getMembershipStats(queryParams?: HttpParams): Observable<MembershipStats> {
    return this.get<MembershipStats>('', queryParams);
  }
}
