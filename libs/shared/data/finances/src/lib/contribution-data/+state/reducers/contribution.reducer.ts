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
import { Contribution } from '../models';
import { contributionActions } from '../actions';

export const contributionsFeatureKey = 'contributions';

export const adapter = createEntityAdapter<Contribution>();

const initialState: KipesaEntityState<Contribution> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(contributionActions.loadContributions, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(contributionActions.loadContributionsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(contributionActions.loadContributionsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(contributionActions.loadSelfContributions, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(contributionActions.loadSelfContributionsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(contributionActions.loadSelfContributionsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(contributionActions.createContribution, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(contributionActions.createContributionSuccess, (state, { contribution }) =>
    mutateAddOne('success', state, adapter, contribution)
  ),
  on(contributionActions.createContributionFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(contributionActions.approveContribution, (state) =>
    mutateUpdateOne('dispatch', state, adapter)
  ),
  on(contributionActions.approveContributionSuccess, (state, { updates }) =>
    mutateUpdateOne('success', state, adapter, updates)
  ),
  on(contributionActions.approveContributionFailure, (state, { error }) =>
    mutateUpdateOne('failure', state, adapter, undefined, error)
  ),
  on(contributionActions.loadContribution, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(contributionActions.loadContributionSuccess, (state, { contribution }) =>
    mutateLoadOne('success', state, adapter, contribution)
  ),
  on(contributionActions.loadContributionFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(contributionActions.deleteContribution, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.contributionId)
  ),
  on(contributionActions.deleteContributionSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(contributionActions.deleteContributionFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const contributionFeature = createFeature({
  name: contributionsFeatureKey,
  reducer,
  extraSelectors: ({
    selectContributionsState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectContributionsState),
    selectOne: (id: string) =>
      createSelector(
        selectEntities,
        (entities) => entities[id] as Contribution
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
} = contributionFeature;
