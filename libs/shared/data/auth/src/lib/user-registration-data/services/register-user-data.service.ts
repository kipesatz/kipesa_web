import { Injectable } from '@angular/core';
import { ApiFactoryService } from '@kps/data/core';
import { Observable } from 'rxjs';
import { RegistrationPayload, RegistrationResponse } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserDataService extends ApiFactoryService {
  constructor() {
    super();
    super.configure('/accounts/v1/auth');
  }

  register(payload: RegistrationPayload): Observable<RegistrationResponse> {
    return this.post<RegistrationResponse, RegistrationPayload>(
      '/register/',
      payload
    );
  }
}
