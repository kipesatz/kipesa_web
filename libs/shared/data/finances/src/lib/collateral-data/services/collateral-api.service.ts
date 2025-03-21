import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Queryset } from '@kps/data/core';
import { Observable } from 'rxjs';
import { CollateralPayload, Collateral } from '../+state';
import { BaseAssocFinancesApiFactoryService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class CollateralApiService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/loans`);
  }

  /**
   * @usageNotes
   * Doesn't require passing the `loanId` as it is determined from the `payload`
   * @param payload CollateralPayload
   * @returns 
   */
  addCollateral(payload: CollateralPayload): Observable<Collateral> {
    return this.post<Collateral, CollateralPayload>(
      `${payload.loan}/collateral/add/`,
      payload
    );
  }

  /**
   * Returns collaterals for a given loan
   * @param qParams HttpParams
   * @returns
   */
  getLoanCollaterals(
    loanId: string,
    qParams?: HttpParams
  ): Observable<Queryset<Collateral>> {
    return this.get<Queryset<Collateral>>(`/${loanId}/collaterals/`, qParams);
  }

  /**
   * @usageNotes
   * Returns a single collateral but still requires to pass the loanId
   * @param loanId string
   * @param id string
   * @returns Observalbe<Collateral>
   */
  getOne(loanId: string, id: string): Observable<Collateral> {
    return this.get<Collateral>(`/${loanId}/collaterals/${id}/details`);
  }
}
