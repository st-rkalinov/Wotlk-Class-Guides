import {
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import {GuideModel} from '../guide.model';
import {loadGuides, loadGuidesFailure, loadGuidesSuccess} from './guide.actions';
import {CharacterClassModel} from '../../models/character-class.model';

export const guideStateFeatureKey = 'guideState';

export interface GuideState {
  classesData: CharacterClassModel[];
  guides: GuideModel[];
}

export const initialState: GuideState = {
  classesData: undefined,
  guides: undefined
};

export const reducers = createReducer(
  initialState,
  on(loadGuidesSuccess, (state, {guides}) => ({...state, guides})),
  on(loadGuidesFailure, (state, {error}) => ({...state, error})),
);

export const selectGuideFeature = createFeatureSelector<GuideState>(
  guideStateFeatureKey
);

export const selectGuides = createSelector(
  selectGuideFeature,
  (state: GuideState) => state.guides
);

export const metaReducers: MetaReducer<GuideState>[] = !environment.production ? [] : [];