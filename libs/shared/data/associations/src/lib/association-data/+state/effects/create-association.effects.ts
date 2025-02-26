import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { AssociationDataService } from '../../services';
import { switchMap, map, catchError, of } from 'rxjs';
import { associationActions } from '../actions';
import { EffectBase } from '@kps/data/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Association } from '../models';

@Injectable()
export class CreateAssociationEffects extends EffectBase {
  constructor(private associationService: AssociationDataService) {
    super();
  }

  createOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(associationActions.createAssociation),
      switchMap(({ payload }) =>
        this.associationService.createOne(payload).pipe(
          map((association) =>
            associationActions.createAssociationSuccess({ association })
          ),
          catchError((error) =>
            of(associationActions.createAssociationFailure({ error }))
          )
        )
      )
    )
  );

  createOneFail$ = this.notify(
    associationActions.createAssociationFailure,
    ({ error }: { error: HttpErrorResponse }) =>
      `Failure: ${error.error.detail}`
  );

  createOneSuccess$ = this.notify(
    associationActions.createAssociationSuccess,
    ({ association }: { association: Association }) =>
      `An Association ${association.name} is created successfully.`
  );
}
