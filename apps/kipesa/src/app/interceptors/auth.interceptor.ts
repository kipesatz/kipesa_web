import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokens } from '@kps/data/auth';
import { JWT_AUTH_TOKEN_KEY, LocalStorageService } from '@kps/data/storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtTokenKey = inject(JWT_AUTH_TOKEN_KEY);
  const storageService = inject(LocalStorageService);

  const tokens: AuthTokens | null = storageService.getItem(jwtTokenKey);
  if (!tokens?.accessToken) {
    return next(req);
  }

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${tokens.accessToken}`),
  });

  return next(authReq);
};
