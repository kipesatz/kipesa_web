import { InjectionToken } from '@angular/core';

export interface CurrentAssocTokenMap {
  idKey: string;
  nameKey: string;
}

export const CURRENT_ASSOC_TOKEN = new InjectionToken<CurrentAssocTokenMap>(
  'Current Association ID and Name',
  {
    providedIn: 'root',
    factory() {
      return {
        idKey: 'CUR_ASSOC_ID',
        nameKey: 'CUR_ASSOC_NAME',
      };
    },
  }
);
