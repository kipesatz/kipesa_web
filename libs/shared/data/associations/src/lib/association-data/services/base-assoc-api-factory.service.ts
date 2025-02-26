import { inject, Injectable } from '@angular/core';
import { ApiFactoryService } from '@kps/data/core';
import { ActivatedAssociationService } from './activated-association.service';

/**
 * @usageNOtes
 * Configures the base url for all apis involving a specific association
 *
 * @publicApi
 */
@Injectable({
  providedIn: 'root',
})
export class BaseAssocApiFactoryService extends ApiFactoryService {
  activatedAssocService = inject(ActivatedAssociationService);
  constructor() {
    super();
    super.configure(
      '',
      super.getBaseUrl() +
        `/associations/v1/associations/${this.activatedAssocService.getId()}`
    );
  }
}
