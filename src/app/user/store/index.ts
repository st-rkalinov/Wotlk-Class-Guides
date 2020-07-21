import {createFeatureSelector, createReducer, createSelector, MetaReducer, on} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {GuideModel} from '../../guide/guide.model';
import * as fromUserActions from '../store/user.actions';

export const userStateFeatureKey = 'userState';


export interface UserState {
  userGuides: GuideModel[];
  error: any;
}

export const initialState: UserState = {
  userGuides: undefined,
  error: undefined,
};

export const reducers = createReducer(
  initialState,
  on(fromUserActions.loadUserGuidesSuccess, (state, {userGuides}) => ({...state, userGuides})),
  on(fromUserActions.loadUserGuidesFailure, (state, {error}) => ({...state, error}))
);

export const selectGuideFeature = createFeatureSelector<UserState>(
  userStateFeatureKey
);

export const selectUserGuides = createSelector(
  selectGuideFeature,
  (state: UserState) => state.userGuides
);

export const selectUserGuidesError = createSelector(
  selectGuideFeature,
  (state: UserState) => state.error
);


export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [] : [];
