import {createFeatureSelector, createReducer, createSelector, MetaReducer, on} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {CharacterClassModel} from '../../models/character-class.model';
import {loadSharedSuccess, resetLoading, setLoading} from './shared.actions';


export const sharedStateFeatureKey = 'sharedState';

export interface SharedState {
  classesData: CharacterClassModel[];
  isLoading: boolean;
}

export const initialState: SharedState = {
  classesData: undefined,
  isLoading: false
};

export const reducers = createReducer(
  initialState,
  on(loadSharedSuccess, (state, { classesData}) => ({...state, classesData})),
  on(setLoading, (state) => ({...state, isLoading: true})),
  on(resetLoading, (state) => ({...state, isLoading: false}))
);

export const selectSharedFeature = createFeatureSelector<SharedState>(
  sharedStateFeatureKey
);

export const selectClassesData = createSelector(
  selectSharedFeature,
  (state: SharedState) => state.classesData
);

export const selectIsLoading = createSelector(
  selectSharedFeature,
  (state: SharedState) => state.isLoading
);

export const metaReducers: MetaReducer<SharedState>[] = !environment.production ? [] : [];
