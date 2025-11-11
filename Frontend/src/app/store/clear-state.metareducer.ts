
import { ActionReducer, createAction, MetaReducer } from '@ngrx/store';
import { AppState } from './app.store';

export const logoutAction = createAction('[Auth] Logout');


export const clearStateMetaReducer: MetaReducer<AppState> = 
  (reducer: ActionReducer<AppState>) => (state, action) => {
    if (action.type === logoutAction.type) {
      state = undefined;
    }
    return reducer(state, action);
  };

  export const metaReducers: MetaReducer<AppState>[] = [clearStateMetaReducer];
