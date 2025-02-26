import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { Queryset } from './queryset.interface';

export interface KipesaEntityState<T> extends EntityState<T> {
  loading: boolean;
  error: HttpErrorResponse | null;
  /** queryset information. `results` of the queryset should stay in `entities` */
  queryset: Omit<Queryset<T>, 'results'> | null;
}
