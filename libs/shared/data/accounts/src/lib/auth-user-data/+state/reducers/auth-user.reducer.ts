import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { AuthUser } from '../models';
import { authUserActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';

export const authUsersFeatureKey = 'authUsers';

export const adapter = createEntityAdapter<AuthUser>();

export interface State {
  loading: boolean;
  error: HttpErrorResponse | null;
  authUser: AuthUser | null;
}

const initialState: State = {
  authUser: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(authUserActions.updateAuthUser, (state): State => {
    return { ...state, loading: true, authUser: null, error: null };
  }),
  on(authUserActions.updateAuthUserSuccess, (state, { authUser }): State => {
    return { ...state, loading: false, authUser: authUser, error: null };
  }),
  on(authUserActions.updateAuthUserFailure, (state, { error }): State => {
    return { ...state, loading: true, authUser: null, error: error };
  }),
  on(authUserActions.loadAuthUser, (state): State => {
    return { ...state, loading: true, authUser: null, error: null };
  }),
  on(authUserActions.loadAuthUserSuccess, (state, { authUser }): State => {
    return { ...state, loading: false, authUser: authUser, error: null };
  }),
  on(authUserActions.loadAuthUserFailure, (state): State => {
    return { ...state, loading: false, authUser: null, error: null };
  })
);

export const authUsersFeature = createFeature({
  name: authUsersFeatureKey,
  reducer,
});

export const { selectAuthUser, selectError, selectLoading } = authUsersFeature;
