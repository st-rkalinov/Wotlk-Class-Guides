import { createAction, props } from '@ngrx/store';
import {DbGuideModel, GuideModel} from '../guide.model';
import {CharacterClassModel} from '../../models/character-class.model';
import {DbGemsModel} from '../../models/gems.model';

export const loadGuides = createAction(
  '[Guides List Component] Load Guides',
  props<{ className: string, spec: string }>()
);

export const loadGuidesSuccess = createAction(
  '[Guide Effect] Load Guides Success',
  props<{ guides: GuideModel[] }>()
);

export const loadGuidesFailure = createAction(
  '[Guide Effect] Load Guides Failure',
  props<{ error: any }>()
);

export const loadAvailableGems = createAction(
  '[New Guide Component] Load Available Gems'
);

export const loadAvailableGemsSuccess = createAction(
  '[Guide Effect] Load Available Gems Success',
  props<{ gems: DbGemsModel[]}>()
);

export const loadAvailableGemsFailure = createAction(
  '[Guide Effect] Load Available Gems Failure',
  props<{ error: any}>()
);
