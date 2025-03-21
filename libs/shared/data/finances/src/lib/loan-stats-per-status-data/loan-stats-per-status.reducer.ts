import { createFeature, createReducer, on } from '@ngrx/store';
import { LoanStatsPerStatus } from './loan-stats-per-status.model';
import { loanStatsPerStatusActions } from './loan-stats-per-status.actions';
import {
  KipesaEntityState,
  initEntityState,
  mutateLoadMany,
} from '@kps/data/core';
import { createEntityAdapter } from '@ngrx/entity';

export const loanStatsPerStatusFeatureKey = 'loanStatsPerStatus';

export const adapter = createEntityAdapter<LoanStatsPerStatus>({
  selectId: (statItem: LoanStatsPerStatus) => statItem.name,
});

const initialState: KipesaEntityState<LoanStatsPerStatus> =
  initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(loanStatsPerStatusActions.loadLoanStatsPerStatus, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(
    loanStatsPerStatusActions.loadLoanStatsPerStatusSuccess,
    (state, { queryset }) => mutateLoadMany('success', state, adapter, queryset)
  ),
  on(
    loanStatsPerStatusActions.loadLoanStatsPerStatusFailure,
    (state, { error }) =>
      mutateLoadMany('failure', state, adapter, undefined, error)
  )
);

export const loanStatsPerStatusFeature = createFeature({
  name: loanStatsPerStatusFeatureKey,
  reducer: reducer,
  extraSelectors: ({ selectLoanStatsPerStatusState }) => ({
    ...adapter.getSelectors(selectLoanStatsPerStatusState),
  }),
});

export const { selectAll, selectError, selectLoading } =
  loanStatsPerStatusFeature;
