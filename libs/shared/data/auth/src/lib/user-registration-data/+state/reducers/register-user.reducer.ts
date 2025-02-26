import { createFeature, createReducer, on } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { registerUserActions } from '../actions';
import { RegistrationResponse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const registerUserFeatureKey = 'registerUser';

export interface RegisterUserState {
  response: RegistrationResponse | null;
  loading: boolean;
  error: HttpErrorResponse | string | null;
}

export const initialState: RegisterUserState = {
  response: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(registerUserActions.registerUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(registerUserActions.registerUserSuccess, (state, { response }) => ({
    ...state,
    response,
    loading: false,
  })),
  on(registerUserActions.registerUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const registerUserFeature = createFeature({
  name: registerUserFeatureKey,
  reducer: reducer,
});

// Base state selector
const selectAuthState = registerUserFeature.selectRegisterUserState;

// Additional selectors
export const selectResponse = createSelector(
  selectAuthState,
  (state) => state.response
);
export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);
