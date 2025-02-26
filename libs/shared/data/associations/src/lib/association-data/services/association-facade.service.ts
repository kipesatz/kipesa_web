import { inject, Injectable } from '@angular/core';
import { associationActions, AssociationPayload, fromAssociation } from '../+state';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AssociationFacadeService {
  private store = inject(Store);

  readonly associations = this.store.selectSignal(fromAssociation.selectAll);
  readonly loading = this.store.selectSignal(fromAssociation.selectLoading);

  dispatchLoadMany(queryParams?: HttpParams) {
    this.store.dispatch(associationActions.loadAssociations({ queryParams }));
  }

  dispatchCreateOne(payload: AssociationPayload) {
    this.store.dispatch(associationActions.createAssociation({ payload }));
  }
}
