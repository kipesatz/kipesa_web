import { Injectable } from '@angular/core';
import { ApiFactoryService } from '@kps/data/core';
import { Observable } from 'rxjs';
import { AuthTokens, LoginPayload } from '../+state/models';

@Injectable({
  providedIn: 'root',
})
export class LoginDataService extends ApiFactoryService {
  constructor() {
    super();
    super.configure('/accounts/v1/auth');
  }

  login(payload: LoginPayload): Observable<AuthTokens> {
    return this.post<AuthTokens, LoginPayload>('/login/', payload);
  }
}
