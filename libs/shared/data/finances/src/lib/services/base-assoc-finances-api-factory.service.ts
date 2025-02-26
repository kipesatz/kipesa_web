import { inject, Injectable } from '@angular/core';
import { ActivatedAssociationService } from '@kps/data/associations';
import { ApiFactoryService } from '@kps/data/core';

@Injectable({
  providedIn: 'root',
})
export class BaseAssocFinancesApiFactoryService extends ApiFactoryService {
  activatedAssocService = inject(ActivatedAssociationService);
  constructor() {
    super();
    super.configure(
      '',
      super.getBaseUrl() + `/finances/v1/${this.activatedAssocService.getId()}`
    );
  }
}
