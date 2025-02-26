import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser, AuthUserPayload } from '../../+state';
import { ApiFactoryService } from '@kps/data/core';

@Injectable({
  providedIn: 'root',
})
export class AuthUserDataService extends ApiFactoryService {
  constructor() {
    super();
    super.configure('/accounts/v1/auth/user');
  }

  getAuthUser(): Observable<AuthUser> {
    return this.get<AuthUser>(`/`);
  }

  updateAuthUser(updates: AuthUserPayload): Observable<AuthUser> {
    return this.put<AuthUser, AuthUserPayload>(`/`, updates);
  }
}
