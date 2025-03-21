import { inject, Injectable } from '@angular/core';
import { LocalStorageService, JWT_AUTH_TOKEN_KEY } from '@kps/data/storage';
import { AuthTokens } from '../login-data';

@Injectable({
  providedIn: 'root',
})
export class AuthCheckService {
  private storageService = inject(LocalStorageService);
  private jwtTokenKey = inject(JWT_AUTH_TOKEN_KEY);

  isAuthenticated(): boolean {
    // check if authenticated
    const authTokens: AuthTokens | null = this.storageService.getItem(
      this.jwtTokenKey
    );
    return authTokens !== null;
  }

  isAnonymous(): boolean {
    return !this.isAuthenticated();
  }
}
