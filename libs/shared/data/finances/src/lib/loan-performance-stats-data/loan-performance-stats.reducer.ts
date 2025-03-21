import { createFeature, createReducer, on } from '@ngrx/store';
import { loanPerformanceStatsActions } from './loan-performance-stats.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { LoanPerformanceStats } from './loan-performance-stats.model';

export const loansPerformanceStatsFeatureKey = 'loansPerformanceStats';

export interface LoansPerformanceStatsState {
  loading: boolean;
  error: HttpErrorResponse | null;
  stats: LoanPerformanceStats | null;
}

export const initialState: LoansPerformanceStatsState = {
  loading: false,
  error: null,
  stats: null,
};

export const reducer = createReducer(
  initialState,
  on(loanPerformanceStatsActions.loadLoanPerformanceStats, (state) => {
    return {
      ...state,
      loading: true,
      stats: null,
      error: null,
    };
  }),
  on(
    loanPerformanceStatsActions.loadLoanPerformanceStatsSuccess,
    (state, { data }) => {
      return {
        ...state,
        loading: false,
        stats: data,
        error: null,
      };
    }
  ),
  on(
    loanPerformanceStatsActions.loadLoanPerformanceStatsFailure,
    (state, { error }) => {
      return {
        ...state,
        loading: false,
        error: error,
      };
    }
  )
);

export const loansPerformanceStatsFeature = createFeature({
  name: loansPerformanceStatsFeatureKey,
  reducer: reducer,
});

export const { selectStats, selectError, selectLoading } =
  loansPerformanceStatsFeature;
