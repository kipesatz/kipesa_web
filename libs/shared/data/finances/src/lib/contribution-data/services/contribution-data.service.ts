import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Queryset } from '@kps/data/core';
import { Observable } from 'rxjs';
import { BaseAssocFinancesApiFactoryService } from '../../services';
import { Contribution, ContributionPayload } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class ContributionDataService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/contributions`);
  }

  addContribution(payload: ContributionPayload): Observable<Contribution> {
    return this.post<Contribution, ContributionPayload>('/', payload);
  }

  getAllContributions(
    qParams?: HttpParams
  ): Observable<Queryset<Contribution>> {
    return this.get<Queryset<Contribution>>('', qParams);
  }

  getSelfContributions(
    qParams?: HttpParams
  ): Observable<Queryset<Contribution>> {
    return this.get<Queryset<Contribution>>('/self/', qParams);
  }

  getOne(id: string) {
    return this.get<Contribution>(id);
  }

  approveOne(id: string) {
    return this.put<Contribution, unknown>(`/${id}/approve/`, {});
  }

  deleteOne(cpId: string) {
    return this.delete<void>(cpId);
  }
}
