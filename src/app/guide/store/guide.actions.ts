import {createAction, props} from '@ngrx/store';
import {GuideModel} from '../guide.model';
import {DbGemsModel} from '../../models/gems.model';

export const loadGuides = createAction(
  '[Guides List Component] Load Guides',
  props<{ className: string | undefined, spec: string | undefined }>()
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

export const loadSelectedGuide = createAction(
  '[Guide Component] Load Selected Guide',
  props<{guideId: string}>()
);

export const loadSelectedGuideSuccess = createAction(
  '[Guide Effect] Load Selected Guide Success',
  props<{selectedGuide: GuideModel}>()
);

export const loadSelectedGuideFailure = createAction(
  '[Guide Effect] Load Selected Guide Failure',
  props<{error: any}>()
);

export const resetSelectedGuide = createAction(
  '[Guide Effect] Reset Selected Guide',
  props<{selectedGuide: any}>()
);
