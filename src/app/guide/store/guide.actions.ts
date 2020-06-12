import { createAction, props } from '@ngrx/store';
import {GuideModel} from '../guide.model';
import {CharacterClassModel} from '../../models/character-class.model';

export const loadGuides = createAction(
  '[Guides List Component] Load Guides',
  props<{ className: string, spec: string }>()
);

export const loadGuidesSuccess = createAction(
  '[Guides Component] Load Guides Success',
  props<{ guides: GuideModel[] }>()
);

export const loadGuidesFailure = createAction(
  '[Guides Component] Load Guides Failure',
  props<{ error: any }>()
);
