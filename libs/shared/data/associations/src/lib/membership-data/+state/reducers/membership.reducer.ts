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
import { Membership } from '../models';
import { MembershipActions } from '../actions';

export const membershipsFeatureKey = 'memberships';

export const adapter = createEntityAdapter<Membership>();

const initialState: KipesaEntityState<Membership> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(MembershipActions.loadMyMemberships, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(MembershipActions.loadMyMembershipsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(MembershipActions.loadMyMembershipsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(MembershipActions.loadMemberships, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(MembershipActions.loadMembershipsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(MembershipActions.loadMembershipsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(MembershipActions.loadMembershipRequests, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(MembershipActions.loadMembershipRequestsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(MembershipActions.loadMembershipRequestsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(MembershipActions.requestMembership, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(MembershipActions.requestMembershipSuccess, (state, { membership }) =>
    mutateAddOne('success', state, adapter, membership)
  ),
  on(MembershipActions.requestMembershipFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(MembershipActions.updateMembership, (state) =>
    mutateUpdateOne('dispatch', state, adapter)
  ),
  on(MembershipActions.updateMembershipSuccess, (state, { updates }) =>
    mutateUpdateOne('success', state, adapter, updates)
  ),
  on(MembershipActions.updateMembershipFailure, (state, { error }) =>
    mutateUpdateOne('failure', state, adapter, undefined, error)
  ),
  on(MembershipActions.loadMembership, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(MembershipActions.loadMembershipSuccess, (state, { membership }) =>
    mutateLoadOne('success', state, adapter, membership)
  ),
  on(MembershipActions.loadMembershipFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(MembershipActions.deleteMembership, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.membershipId)
  ),
  on(MembershipActions.deleteMembershipSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(MembershipActions.deleteMembershipFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const membershipsFeature = createFeature({
  name: membershipsFeatureKey,
  reducer,
  extraSelectors: ({
    selectMembershipsState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectMembershipsState),
    selectOne: (id: string) =>
      createSelector(selectEntities, (entities) => entities[id] as Membership),
    selectCount: () =>
      createSelector(selectQueryset, (qs) => qs?.count as number),
  }),
});

export const {
  selectIds,
  selectAll,
  selectError,
  selectOne,
  selectTotal,
  selectLoading,
  selectCount,
} = membershipsFeature;
