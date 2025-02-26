import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordPayload } from '../../+state';
import { ApiFactoryService } from '@kps/data/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordDataService extends ApiFactoryService {
  constructor() {
    super();
    super.configure('/accounts/v1/auth/changePassword');
  }

  changePassword(
    payload: ChangePasswordPayload
  ): Observable<{ detail: string }> {
    return this.put<{ detail: string }, ChangePasswordPayload>(`/`, payload);
  }
}
