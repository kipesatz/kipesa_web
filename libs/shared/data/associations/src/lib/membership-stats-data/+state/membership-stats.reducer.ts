import {
  createFeature,
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';
import { membershipStatsActions } from './membership-stats.actions';
import { MembershipStats } from './membership-stats.model';
import { HttpErrorResponse } from '@angular/common/http';

export const membershipStatsFeatureKey = 'membershipStats';

export interface MembershipStatsState {
  membershipStats: MembershipStats | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

const initialState: MembershipStatsState = {
  membershipStats: null,
  loading: false,
  error: null,
};

export const membershipStatsReducer = createReducer(
  initialState,
  on(membershipStatsActions.loadMembershipStats, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    membershipStatsActions.loadMembershipStatsSuccess,
    (state, { membershipStats }) => ({
      ...state,
      membershipStats: membershipStats,
      loading: false,
    })
  ),
  on(membershipStatsActions.loadMembershipStatsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const membershipStatsFeatureSelector =
  createFeatureSelector<MembershipStatsState>(membershipStatsFeatureKey);

export const membershipStatsFeature = createFeature({
  name: membershipStatsFeatureKey,
  reducer: membershipStatsReducer,
});

export const { selectError, selectLoading, selectMembershipStats } =
  membershipStatsFeature;
