import {createFeatureSelector, createReducer, createSelector, MetaReducer, on} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {CharacterClassModel} from '../../models/character-class.model';
import {loadSharedSuccess, resetLoading, setLoading, setPageTitle} from './shared.actions';


export const sharedStateFeatureKey = 'sharedState';

export interface SharedState {
  classesData: CharacterClassModel[];
  isLoading: boolean;
  pageTitle: string;
}

export const initialState: SharedState = {
  classesData: undefined,
  isLoading: false,
  pageTitle: 'Ultimate Guides - Home'
};

export const reducers = createReducer(
  initialState,
  on(loadSharedSuccess, (state, { classesData}) => ({...state, classesData})),
  on(setLoading, (state) => ({...state, isLoading: true})),
  on(resetLoading, (state) => ({...state, isLoading: false})),
  on(setPageTitle, (state, {pageTitle}) => ({...state, pageTitle}))
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

export const selectPageTitle = createSelector(
  selectSharedFeature,
  (state: SharedState) => state.pageTitle
);

export const metaReducers: MetaReducer<SharedState>[] = !environment.production ? [] : [];
