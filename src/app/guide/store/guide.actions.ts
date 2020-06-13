import { createAction, props } from '@ngrx/store';
import {GuideModel} from '../guide.model';
import {CharacterClassModel} from '../../models/character-class.model';
import {DbGemsModel} from '../../models/gems.model';

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

export const loadAvailableGems = createAction(
  '[New Guide Component] Load Available Gems'
);

export const loadAvailableGemsSuccess = createAction(
  '[New Guide Component] Load Available Gems Success',
  props<{ gems: DbGemsModel[]}>()
);

export const loadAvailableGemsFailure = createAction(
  '[New Guide Component] Load Available Gems Failure',
  props<{ error: any}>()
);
