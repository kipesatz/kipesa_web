import { Injectable } from '@angular/core';
import { ApiFactoryService, Queryset } from '@kps/data/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Membership } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class MyMembershipDataService extends ApiFactoryService {
  constructor() {
    super();
    super.configure('/associations/v1/associations/myMemberships/');
  }

  getAll(queryParams?: HttpParams): Observable<Queryset<Membership>> {
    return this.get<Queryset<Membership>>('', queryParams);
  }
}
