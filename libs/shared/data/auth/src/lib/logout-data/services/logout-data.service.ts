import { Injectable } from '@angular/core';
import { ApiFactoryService } from '@kps/data/core';
import { Observable } from 'rxjs';
import { LogoutResponse } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class LogoutDataService extends ApiFactoryService {
  constructor() {
    super();
    super.configure('/accounts/v1/auth');
  }

  logout(): Observable<LogoutResponse> {
    return this.post<LogoutResponse, unknown>('/logout/', {});
  }
}
