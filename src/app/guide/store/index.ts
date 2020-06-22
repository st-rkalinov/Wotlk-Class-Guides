import {createFeatureSelector, createReducer, createSelector, MetaReducer, on} from '@ngrx/store';

import {environment} from '../../../environments/environment';
import {GuideModel} from '../guide.model';
import {
  loadAvailableGemsSuccess,
  loadGuidesFailure,
  loadGuidesSuccess,
  loadSelectedGuideFailure,
  loadSelectedGuideSuccess,
  resetSelectedGuide
} from './guide.actions';
import {DbGemsModel} from '../../models/gems.model';

export const guideStateFeatureKey = 'guideState';

export interface GuideState {
  guides: GuideModel[];
  gems: DbGemsModel[];
  selectedGuide: GuideModel;
  error: string;
}

export const initialState: GuideState = {
  guides: undefined,
  gems: undefined,
  selectedGuide: undefined,
  error: undefined
};

export const reducers = createReducer(
  initialState,
  on(loadGuidesSuccess, (state, {guides}) => ({...state, guides})),
  on(loadGuidesFailure, (state, {error}) => ({...state, error})),

  on(loadSelectedGuideSuccess, (state, {selectedGuide}) => ({...state, selectedGuide})),
  on(loadSelectedGuideFailure, (state, {error}) => ({...state, error})),
  on(resetSelectedGuide, (state, {selectedGuide}) => ({...state, selectedGuide})),

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

export const selectSelectedGuide = createSelector(
  selectGuideFeature,
  (state: GuideState) => state.selectedGuide
);

export const selectGuideStateError = createSelector(
  selectGuideFeature,
  (state: GuideState) => state.error
);

export const metaReducers: MetaReducer<GuideState>[] = !environment.production ? [] : [];
