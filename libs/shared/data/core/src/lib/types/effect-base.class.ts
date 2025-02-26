import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionType } from '@ngrx/store';
import { KpsSnackBarService } from '@kps/material/snack-bar';
import { map, tap } from 'rxjs';

export class EffectBase {
  protected actions$: Actions = inject(Actions);
  protected snackBarService: KpsSnackBarService = inject(KpsSnackBarService);

  /**
   * @description
   * Refactoring for showing snackBar messages in effects
   * @param actionType ActionType<any>
   * @param msgFn A fn that take arg returned from actionType and return a string
   * @returns Observable<string> & CreateEffectMetadata
   */
  protected notify = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionType: ActionType<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    msgFn: (action?: any) => string
  ) =>
    createEffect(
      () => {
        return this.actions$.pipe(
          ofType(actionType),
          map((action) => msgFn(action)),
          tap((message) =>
            this.snackBarService.openSnackBar({
              data: `${message}`,
            })
          )
        );
      },
      { dispatch: false }
    );
}
