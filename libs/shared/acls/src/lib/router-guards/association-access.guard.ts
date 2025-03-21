import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {
  ActivatedAssociationService,
  MembershipStorageService,
} from '@kps/data/associations';

export const associationAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const membershipStorage = inject(MembershipStorageService);
  const activeAssoc = inject(ActivatedAssociationService);

  // Check if current association ID and name are set in session storage
  const curAssocId = activeAssoc.getId();
  const curAssocName = activeAssoc.getName();

  // If both ID and name are set, allow access
  if (curAssocId && curAssocName) {
    return true;
  }

  // Check if user has any active memberships
  const activeMembershipIds = membershipStorage.getStoredActiveMembershipIds();

  if (activeMembershipIds.length > 0) {
    // User has memberships but hasn't selected one, redirect to switch page
    return router.navigate(['/assocSettings/enroll'], {
      queryParams: { switch: true },
    });
  } else {
    // User has no memberships, redirect to enrollment page
    return router.navigate(['/assocSettings/enroll']);
  }
};
