import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';
import { fincStatsActions, fromFincStats } from '../+state';

@Injectable({ providedIn: 'root' })
export class FincStatsFacadeService {
  private store = inject(Store);

  fincStats = this.store.selectSignal(fromFincStats.selectFincStats);
  loading = this.store.selectSignal(fromFincStats.selectLoading);
  error = this.store.selectSignal(fromFincStats.selectError);

  loadFincStats(queryParams?: HttpParams): void {
    this.store.dispatch(fincStatsActions.loadFincStats({ queryParams }));
  }
}
