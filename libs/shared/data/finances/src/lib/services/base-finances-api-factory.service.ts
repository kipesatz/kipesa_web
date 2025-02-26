import { Injectable } from '@angular/core';
import { ApiFactoryService } from '@kps/data/core';

@Injectable({
  providedIn: 'root',
})
export class BaseFinancesApiFactoryService extends ApiFactoryService {
  constructor() {
    super();
    super.configure('', super.getBaseUrl() + `/finances/v1`);
  }
}
