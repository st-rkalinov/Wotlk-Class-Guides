import {createAction, props} from '@ngrx/store';
import {GuideModel} from '../../guide/guide.model';

export const loadUserGuides = createAction(
  '[User Component] Load User Guides',
  props<{nickname: string}>()
);

export const loadUserGuidesSuccess = createAction(
  '[User Effect] Load User Guides Success',
  props<{ userGuides: GuideModel[]}>()
);

export const loadUserGuidesFailure = createAction(
  '[User Effect] Load User Guides Failure',
  props<{ error: any }>()
);
