import { createFeature, createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LogoutResponse } from './logout-response.model';
import { LogoutActions } from './logout.actions';

export const logoutFeatureKey = 'logout';

export interface LoginState {
  response: LogoutResponse | null;
  loading: boolean;
  error: HttpErrorResponse | string | null;
}

export const initialState: LoginState = {
  response: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(LogoutActions.logout, LogoutActions.logout, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LogoutActions.logoutSuccess, (state, { response }) => ({
    ...state,
    response,
    loading: false,
  })),
  on(LogoutActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const logoutFeature = createFeature({
  name: logoutFeatureKey,
  reducer: reducer,
});

export const { selectError, selectLoading, selectResponse } = logoutFeature;
