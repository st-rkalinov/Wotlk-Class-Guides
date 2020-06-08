import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export const authStateFeatureKey = 'authState';

export interface AuthState {

}

export const reducers: ActionReducerMap<AuthState> = {

};


export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
