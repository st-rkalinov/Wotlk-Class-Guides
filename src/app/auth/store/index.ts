import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {getUserFailure, getUserSuccess, login, loginFailure, loginSuccess, logoutFailure, logoutSuccess, resetError} from './auth.actions';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';


export const authStateFeatureKey = 'authState';

export interface AuthState {
  isLoggedIn: boolean;
  userData: UserAdditionalDataModel;
  error: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  userData: undefined,
  error: undefined
};

export const reducers = createReducer(
  initialState,
  on(login, (state) => ({...state})),
  on(loginSuccess, (state, {isLoggedIn}) => ({ ...state, isLoggedIn})),
  on(loginFailure, (state, {error}) => ({...state, error})),

  on(getUserSuccess, (state, {isLoggedIn, userData}) => ({...state, isLoggedIn, userData})),
  on(getUserFailure, (state, {isLoggedIn, userData}) => ({...state, isLoggedIn, userData})),

  on(logoutSuccess, (state, {isLoggedIn, userData} ) => ({...state, isLoggedIn, userData})),
  on(logoutFailure, (state, {error}) => ({...state, error})),

  on(resetError, (state, {error}) => ({...state, error}))
);

export const selectAuthFeature = createFeatureSelector<AuthState>(
  authStateFeatureKey
);

export const selectIsLoggedIn = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoggedIn
);

export const selectUserDataNickname = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.userData.uid
);

export const selectError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.error
);

export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
