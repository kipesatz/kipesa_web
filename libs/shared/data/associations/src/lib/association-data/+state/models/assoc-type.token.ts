import { InjectionToken } from '@angular/core';

export interface AssociationType {
  name: string;
  value: string;
  icon: string;
}

export const ASSOCIATION_TYPE_OPTIONS = new InjectionToken<AssociationType[]>(
  'Returns an array of association types',
  {
    factory: () => [
      { name: 'FAMILY', value: 'Family', icon: 'family_restroom' },
      { name: 'VICOBA', value: 'VICOBA', icon: 'groups' },
    ],
  }
);
