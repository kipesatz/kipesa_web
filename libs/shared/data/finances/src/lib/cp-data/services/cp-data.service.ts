import { Injectable } from '@angular/core';
import { ContributionPurpose, CpPayload } from '../+state';
import { HttpParams } from '@angular/common/http';
import { Queryset } from '@kps/data/core';
import { Observable } from 'rxjs';
import { BaseAssocFinancesApiFactoryService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class CpDataService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/contributionPurposes/`);
  }

  createOne(payload: CpPayload): Observable<ContributionPurpose> {
    return this.post<ContributionPurpose, CpPayload>('', payload);
  }

  getMany(qParams?: HttpParams): Observable<Queryset<ContributionPurpose>> {
    return this.get<Queryset<ContributionPurpose>>('', qParams);
  }

  getOne(id: string) {
    return this.get<ContributionPurpose>(`${id}`);
  }

  updateOne(cpId: string, payload: CpPayload) {
    return this.put<ContributionPurpose, CpPayload>(cpId, payload);
  }

  deleteOne(cpId: string) {
    return this.delete<void>(cpId);
  }
}
