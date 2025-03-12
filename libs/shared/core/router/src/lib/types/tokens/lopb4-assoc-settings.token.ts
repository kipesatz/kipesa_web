import { InjectionToken } from '@angular/core';

/**
 * Provides a session storage key for the last opened page before association settings dialog.
 * @usageNotes
 * Use this token to acess session storage to know the last opened page so that when the association settings dialog is closed,
 * the user is redirected to the last opened page.
 * */
export const LOPB4_ASSOC_SETTINGS = new InjectionToken(
  'Last opened page before association settings dialog',
  { providedIn: 'root', factory: () => 'LOPB4_ASSOC_SETTINGS' }
);
