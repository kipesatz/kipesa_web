import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FincStats } from '../+state';
import { BaseAssocFinancesApiFactoryService } from '../../services';

@Injectable({ providedIn: 'root' })
export class FincStatsApiService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    this.configure('/fincStats');
  }

  getFincStats(queryParams?: HttpParams): Observable<FincStats> {
    return this.get<FincStats>('',queryParams);
  }
}
