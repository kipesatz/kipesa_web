import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user.model';
import { UserActions } from '../actions/user.actions';

export const usersFeatureKey = 'users';

export type State = EntityState<User>;

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, action) =>
    adapter.addOne(action.user, state)
  ),
  on(UserActions.upsertUser, (state, action) =>
    adapter.upsertOne(action.user, state)
  ),
  on(UserActions.addUsers, (state, action) =>
    adapter.addMany(action.users, state)
  ),
  on(UserActions.upsertUsers, (state, action) =>
    adapter.upsertMany(action.users, state)
  ),
  on(UserActions.updateUser, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  on(UserActions.updateUsers, (state, action) =>
    adapter.updateMany(action.users, state)
  ),
  on(UserActions.deleteUser, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUsers, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(UserActions.loadUsers, (state, action) =>
    adapter.setAll(action.users, state)
  ),
  on(UserActions.clearUsers, (state) => adapter.removeAll(state))
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...adapter.getSelectors(selectUsersState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } =
  usersFeature;
