import { createFeature, createReducer, on } from '@ngrx/store';
import { loginActions } from '../actions';
import { AuthTokens } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const loginFeatureKey = 'login';

export interface LoginState {
  tokens: AuthTokens | null;
  loading: boolean;
  error: HttpErrorResponse | string | null;
}

export const initialState: LoginState = {
  tokens: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginActions.login, loginActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginActions.loginSuccess, (state, { tokens }) => ({
    ...state,
    tokens,
    loading: false,
  })),
  on(loginActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const loginFeature = createFeature({
  name: loginFeatureKey,
  reducer: authReducer,
});

export const { selectError, selectLoading, selectTokens } = loginFeature;
