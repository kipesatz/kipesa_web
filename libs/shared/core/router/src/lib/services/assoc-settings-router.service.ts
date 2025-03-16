import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOPB4_ASSOC_SETTINGS } from '../types/tokens';

@Injectable({
  providedIn: 'root',
})
export class AssocSettingsRouterService {
  private router = inject(Router);
  private lastPageToken = inject(LOPB4_ASSOC_SETTINGS);

  /**
   * Stores the current route in session storage before navigating to the association settings page.
   * This allows the user to return to the previous page after leaving the association settings.
   * @returns A Promise that resolves with the current URL.
   */
  storeCurrentRouteBeforeSettings(): Promise<string> {
    return new Promise((resolve) => {
      const currentUrl = this.router.url;
      sessionStorage.setItem(this.lastPageToken, currentUrl);
      resolve(currentUrl);
    });
  }

  getStoredRouteAndNavigate(): Promise<boolean> {
    const lastRoute = sessionStorage.getItem(this.lastPageToken) || '/';
    return this.router.navigate([lastRoute], { skipLocationChange: true });
  }
}
