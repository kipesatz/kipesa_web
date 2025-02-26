import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { associationActions } from '../actions';
import { AssociationDataService } from '../../services';

@Injectable()
export class LoadAssociationEffects {
  private actions$ = inject(Actions);
  private apiService = inject(AssociationDataService);

  loadMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(associationActions.loadAssociations),
      switchMap(({ queryParams }) =>
        this.apiService.getMany(queryParams).pipe(
          map((queryset) =>
            associationActions.loadAssociationsSuccess({ queryset })
          ),
          catchError((error) =>
            of(associationActions.loadAssociationsFailure({ error }))
          )
        )
      )
    );
  });

  loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(associationActions.loadAssociation),
      switchMap(({ associationId }) =>
        this.apiService.getOne(associationId).pipe(
          map((association) =>
            associationActions.loadAssociationSuccess({ association })
          ),
          catchError((error) =>
            of(associationActions.loadAssociationFailure({ error }))
          )
        )
      )
    );
  });
}
