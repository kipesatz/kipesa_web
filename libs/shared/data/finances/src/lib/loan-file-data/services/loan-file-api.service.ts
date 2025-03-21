import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Queryset } from '@kps/data/core';
import { Observable } from 'rxjs';
import { LoanFile } from '../+state';
import { BaseAssocFinancesApiFactoryService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class LoanFileApiService extends BaseAssocFinancesApiFactoryService {
  constructor() {
    super();
    super.configure(`/loans`);
  }

  /**
   * @usageNotes
   * Uploads the loan file along side the attached metadata like title, description, etc
   * @param payload FormData
   * @returns
   */
  uploadLoanFile(loanId: string, payload: FormData): Observable<LoanFile> {
    return this.post<LoanFile, FormData>(`/${loanId}/loanFiles/add/`, payload);
  }

  /**
   * Returns loanFiles for a given loan
   * @param qParams HttpParams
   * @returns
   */
  getLoanLoanFiles(
    loanId: string,
    qParams?: HttpParams
  ): Observable<Queryset<LoanFile>> {
    return this.get<Queryset<LoanFile>>(`/${loanId}/loanFiles/`, qParams);
  }

  /**
   * @usageNotes
   * Returns a single loanFile but still requires to pass the loanId
   * @param loanId string
   * @param id string
   * @returns Observalbe<LoanFile>
   */
  getOne(loanId: string, id: string): Observable<LoanFile> {
    return this.get<LoanFile>(`/${loanId}/loanFiles/${id}/details`);
  }
}
