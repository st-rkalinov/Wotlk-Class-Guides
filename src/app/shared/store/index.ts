import {
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {CharacterClassModel} from '../../models/character-class.model';
import {loadSharedSuccess} from './shared.actions';


export const sharedStateFeatureKey = 'sharedState';

export interface SharedState {
  classesData: CharacterClassModel[];
}

export const initialState: SharedState = {
  classesData: undefined,
};

export const reducers = createReducer(
  initialState,
  on(loadSharedSuccess, (state, { classesData}) => ({...state, classesData})),
);

export const selectSharedFeature = createFeatureSelector<SharedState>(
  sharedStateFeatureKey
);

export const selectClassesData = createSelector(
  selectSharedFeature,
  (state: SharedState) => state.classesData
);

export const metaReducers: MetaReducer<SharedState>[] = !environment.production ? [] : [];
