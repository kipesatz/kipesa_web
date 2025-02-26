import { createActionGroup, props } from '@ngrx/store';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FincStats } from './finc-stats.model';

export const fincStatsActions = createActionGroup({
  source: 'API/FincStats',
  events: {
    'Load FincStats': props<{ queryParams?: HttpParams }>(),
    'Load FincStats Success': props<{ fincStats: FincStats }>(),
    'Load FincStats Failure': props<{ error: HttpErrorResponse }>(),
  },
});
