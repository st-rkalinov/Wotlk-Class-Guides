import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {CharacterClassModel} from '../../models/character-class.model';
import {loadSharedSuccess} from './shared.actions';
import {MenuSelectedClassModel} from '../../models/menu-selected-class.model';


export const sharedStateFeatureKey = 'sharedState';

export interface SharedState {
  classesData: CharacterClassModel[];
  selectedClassFromMenu: MenuSelectedClassModel;
}

export const initialState: SharedState = {
  classesData: undefined,
  selectedClassFromMenu: {index: -1, classData: null}
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
