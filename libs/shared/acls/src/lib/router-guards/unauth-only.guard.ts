import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCheckService } from '@kps/data/auth';

export const unauthOnlyGuard: CanActivateFn = () => {
  const authCheck = inject(AuthCheckService);
  const router = inject(Router);
  if (authCheck.isAuthenticated()) {
    return router.navigate(['/myAccount/dashboard']);
  }
  return true;
};
