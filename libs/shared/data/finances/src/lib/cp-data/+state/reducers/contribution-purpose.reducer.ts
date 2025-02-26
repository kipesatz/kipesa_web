import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import {
  KipesaEntityState,
  initEntityState,
  mutateLoadMany,
  mutateAddOne,
  mutateUpdateOne,
  mutateLoadOne,
  mutateDeleteOne,
} from '@kps/data/core';
import { ContributionPurpose } from '../models';
import { ContributionPurposeActions } from '../actions';

export const cpsFeatureKey = 'contributionPurposes';

export const adapter = createEntityAdapter<ContributionPurpose>();

const initialState: KipesaEntityState<ContributionPurpose> =
  initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(ContributionPurposeActions.loadContributionPurposes, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(
    ContributionPurposeActions.loadContributionPurposesSuccess,
    (state, { queryset }) => mutateLoadMany('success', state, adapter, queryset)
  ),
  on(
    ContributionPurposeActions.loadContributionPurposesFailure,
    (state, { error }) =>
      mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(ContributionPurposeActions.createContributionPurpose, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(
    ContributionPurposeActions.createContributionPurposeSuccess,
    (state, { contributionPurpose }) =>
      mutateAddOne('success', state, adapter, contributionPurpose)
  ),
  on(
    ContributionPurposeActions.createContributionPurposeFailure,
    (state, { error }) =>
      mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(ContributionPurposeActions.updateContributionPurpose, (state) =>
    mutateUpdateOne('dispatch', state, adapter)
  ),
  on(
    ContributionPurposeActions.updateContributionPurposeSuccess,
    (state, { updates }) => mutateUpdateOne('success', state, adapter, updates)
  ),
  on(
    ContributionPurposeActions.updateContributionPurposeFailure,
    (state, { error }) =>
      mutateUpdateOne('failure', state, adapter, undefined, error)
  ),
  on(ContributionPurposeActions.loadContributionPurpose, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(
    ContributionPurposeActions.loadContributionPurposeSuccess,
    (state, { contributionPurpose }) =>
      mutateLoadOne('success', state, adapter, contributionPurpose)
  ),
  on(
    ContributionPurposeActions.loadContributionPurposeFailure,
    (state, { error }) =>
      mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(ContributionPurposeActions.deleteContributionPurpose, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.cpId)
  ),
  on(ContributionPurposeActions.deleteContributionPurposeSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(
    ContributionPurposeActions.deleteContributionPurposeFailure,
    (state, { error }) =>
      mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const cpsFeature = createFeature({
  name: cpsFeatureKey,
  reducer,
  extraSelectors: ({
    selectContributionPurposesState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectContributionPurposesState),
    selectOne: (id: string) =>
      createSelector(
        selectEntities,
        (entities) => entities[id] as ContributionPurpose
      ),
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
} = cpsFeature;
