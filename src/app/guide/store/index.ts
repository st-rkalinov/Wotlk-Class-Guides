import {
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import {GuideModel} from '../guide.model';
import {loadAvailableGemsSuccess, loadGuidesFailure, loadGuidesSuccess} from './guide.actions';
import {DbGemsModel} from '../../models/gems.model';

export const guideStateFeatureKey = 'guideState';

export interface GuideState {
  guides: GuideModel[];
  gems: DbGemsModel[];
}

export const initialState: GuideState = {
  guides: undefined,
  gems: undefined
};

export const reducers = createReducer(
  initialState,
  on(loadGuidesSuccess, (state, {guides}) => ({...state, guides})),
  on(loadGuidesFailure, (state, {error}) => ({...state, error})),

  on(loadAvailableGemsSuccess, (state, {gems}) => ({...state, gems})),
  on(loadGuidesFailure, (state, {error}) => ({...state, error}))
);

export const selectGuideFeature = createFeatureSelector<GuideState>(
  guideStateFeatureKey
);

export const selectGuides = createSelector(
  selectGuideFeature,
  (state: GuideState) => state.guides
);

export const selectAvailableGems = createSelector(
  selectGuideFeature,
  (state: GuideState) => state.gems
);

export const metaReducers: MetaReducer<GuideState>[] = !environment.production ? [] : [];
