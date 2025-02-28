import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import {
  KipesaEntityState,
  initEntityState,
  mutateLoadMany,
  mutateLoadOne,
  mutateDeleteOne,
  mutateAddOne,
} from '@kps/data/core';
import { reportActions } from '../actions';
import { FinancialReport } from '../models';

export const reportsFeatureKey = 'reports';

export const adapter = createEntityAdapter<FinancialReport>();

const initialState: KipesaEntityState<FinancialReport> =
  initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(reportActions.loadReports, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(reportActions.loadReportsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(reportActions.loadReportsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(reportActions.generateReport, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(reportActions.generateReportSuccess, (state, { reportData }) =>
    mutateAddOne('success', state, adapter, reportData)
  ),
  on(reportActions.generateReportFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(reportActions.loadReport, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(reportActions.loadReportSuccess, (state, { report }) =>
    mutateLoadOne('success', state, adapter, report)
  ),
  on(reportActions.loadReportFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(reportActions.deleteReport, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.id)
  ),
  on(reportActions.deleteReportSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(reportActions.deleteReportFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const reportFeature = createFeature({
  name: reportsFeatureKey,
  reducer,
  extraSelectors: ({ selectReportsState, selectEntities, selectQueryset }) => ({
    ...adapter.getSelectors(selectReportsState),
    selectOne: (id: string) =>
      createSelector(selectEntities, (entities) => entities[id]),
    selectCount: () =>
      createSelector(selectQueryset, (qs) => qs?.count as number),
  }),
});

export const {
  selectAll,
  selectError,
  selectOne,
  selectTotal,
  selectLoading,
  selectCount,
} = reportFeature;
