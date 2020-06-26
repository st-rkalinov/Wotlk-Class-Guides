import {createAction, props} from '@ngrx/store';
import {CharacterClassModel} from '../../models/character-class.model';

export const loadShared = createAction(
  '[App Component] Load Shared Data'
);

export const loadSharedSuccess = createAction(
  '[Shared Effect] Load Shared Data Success',
  props<{ classesData: CharacterClassModel[] }>()
);

export const loadSharedFailure = createAction(
  '[Shared Effect] Load Shared Failure',
  props<{ error: any }>()
);

export const setLoading = createAction(
  '[Components, Effects] Set Loading'
);

export const resetLoading = createAction(
  '[Components, Effects] Reset Loading'
);

export const setPageTitle = createAction(
  '[Components] Set Page Title',
  props<{pageTitle: string}>()
);
