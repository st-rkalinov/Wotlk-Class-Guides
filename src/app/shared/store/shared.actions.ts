import { createAction, props } from '@ngrx/store';
import {CharacterClassModel} from '../../models/character-class.model';
import {MenuSelectedClassModel} from '../../models/menu-selected-class.model';

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
