import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import {
  KipesaEntityState,
  initEntityState,
  mutateLoadMany,
  mutateAddOne,
  mutateLoadOne,
  mutateDeleteOne,
} from '@kps/data/core';
import { LoanFile } from '../models';
import { loanFileActions } from '../actions';

export const loanFilesFeatureKey = 'loanFiles';

export const adapter = createEntityAdapter<LoanFile>();

const initialState: KipesaEntityState<LoanFile> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(loanFileActions.loadLoanFiles, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(loanFileActions.loadLoanFilesSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(loanFileActions.loadLoanFilesFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(loanFileActions.uploadLoanFile, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(loanFileActions.uploadLoanFileSuccess, (state, { loanFile }) =>
    mutateAddOne('success', state, adapter, loanFile)
  ),
  on(loanFileActions.uploadLoanFileFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(loanFileActions.loadLoanFile, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(loanFileActions.loadLoanFileSuccess, (state, { loanFile }) =>
    mutateLoadOne('success', state, adapter, loanFile)
  ),
  on(loanFileActions.loadLoanFileFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(loanFileActions.deleteLoanFile, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.fileId)
  ),
  on(loanFileActions.deleteLoanFileSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(loanFileActions.deleteLoanFileFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const loanFileFeature = createFeature({
  name: loanFilesFeatureKey,
  reducer,
  extraSelectors: ({
    selectLoanFilesState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectLoanFilesState),
    selectOne: (id: string) =>
      createSelector(selectEntities, (entities) => entities[id] as LoanFile),
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
} = loanFileFeature;
