import {
  createFeature,
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';
import { fincStatsActions } from './finc-stats.actions';
import { FincStats } from './finc-stats.model';
import { HttpErrorResponse } from '@angular/common/http';

export const fincStatsFeatureKey = 'fincStats';

export interface FincStatsState {
  fincStats: FincStats | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

const initialState: FincStatsState = {
  fincStats: null,
  loading: false,
  error: null,
};

export const fincStatsReducer = createReducer(
  initialState,
  on(fincStatsActions.loadFincStats, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fincStatsActions.loadFincStatsSuccess, (state, { fincStats }) => ({
    ...state,
    fincStats: fincStats,
    loading: false,
  })),
  on(fincStatsActions.loadFincStatsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const fincStatsFeatureSelector =
  createFeatureSelector<FincStatsState>(fincStatsFeatureKey);

export const fincStatsFeature = createFeature({
  name: fincStatsFeatureKey,
  reducer: fincStatsReducer,
});

export const { selectError, selectLoading, selectFincStats } = fincStatsFeature;
