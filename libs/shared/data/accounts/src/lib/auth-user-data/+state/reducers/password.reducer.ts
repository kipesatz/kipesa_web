import { HttpErrorResponse } from '@angular/common/http';
import { createFeature, createReducer, on } from '@ngrx/store';
import { passwordActions } from '../actions/password.actions';

export const passwordFeatureKey = 'password';

export interface State {
  loading: boolean;
  error: HttpErrorResponse | null;
  response: { detail: string } | null;
}

export const initialState: State = {
  loading: false,
  error: null,
  response: null,
};

export const reducer = createReducer(
  initialState,
  on(passwordActions.changePassword, (state): State => {
    return { ...state, loading: true, error: null, response: null };
  }),
  on(passwordActions.changePasswordSuccess, (state, { response }): State => {
    return { ...state, loading: true, error: null, response: response };
  }),
  on(passwordActions.changePasswordFailure, (state, { error }): State => {
    return { ...state, loading: true, error: error, response: null };
  })
);

export const passwordsFeature = createFeature({
  name: passwordFeatureKey,
  reducer,
});

export const { selectError, selectLoading, selectResponse } = passwordsFeature;
