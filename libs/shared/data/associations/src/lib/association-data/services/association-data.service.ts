import { Injectable } from '@angular/core';
import { ApiFactoryService, Queryset } from '@kps/data/core';
import { Association, AssociationPayload } from '../+state/models';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AssociationDataService extends ApiFactoryService {
  constructor() {
    super();
    this.configure('/associations/v1/associations/');
  }

  createOne(payload: AssociationPayload) {
    return this.post<Association, AssociationPayload>('', payload);
  }

  getMany(qParams?: HttpParams) {
    return this.get<Queryset<Association>>('', qParams);
  }

  getOne(id: string) {
    return this.get<Association>(id);
  }

  updateAssociation(id: string, payload: AssociationPayload) {
    return this.put<Association, AssociationPayload>(id, payload);
  }

  deleteAssociation(id: string) {
    return this.delete<void>(id);
  }
}
