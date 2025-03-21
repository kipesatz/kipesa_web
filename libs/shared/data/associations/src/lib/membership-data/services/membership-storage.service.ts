import { inject, Injectable, InjectionToken } from '@angular/core';

export const ACTIVE_MEMBERSHIPS_IDS_ACCESS_KEY = new InjectionToken<string>(
  'Provides a key to access session storage that will return the current user active memberships',
  { factory: () => 'ACTIVE_MEMBERSHIPS_IDS', providedIn: 'root' }
);

@Injectable({
  providedIn: 'root',
})
export class MembershipStorageService {
  private active_memberships_key = inject(ACTIVE_MEMBERSHIPS_IDS_ACCESS_KEY);

  storeActiveMembershipsIds(ids: string[]): void {
    // remove any existing
    sessionStorage.removeItem(this.active_memberships_key);

    // add new ids
    sessionStorage.setItem(this.active_memberships_key, JSON.stringify(ids));
  }

  getStoredActiveMembershipIds(): string[] {
    const ids = sessionStorage.getItem(this.active_memberships_key);
    return ids ? JSON.parse(ids) : [];
  }
}
