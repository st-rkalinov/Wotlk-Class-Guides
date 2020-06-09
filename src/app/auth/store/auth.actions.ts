import { createAction, props } from '@ngrx/store';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';
import {LoginFormFieldModel} from '../../models/login-formField.model';

export const login = createAction(
  '[Login Component] Login',
  props<{ email: LoginFormFieldModel, password: LoginFormFieldModel }>()
);

export const loginSuccess = createAction(
  '[Auth Effect] Login Success',
  props<{ isLoggedIn: boolean}>()
);

export const loginFailure = createAction(
  '[Auth Effect] Login Failure',
  props<{ error: any }>()
);

export const getUserSuccess = createAction(
  '[Auth Service] Get User Success',
  props<{isLoggedIn: boolean, userData: UserAdditionalDataModel}>()
);

export const getUserFailure = createAction(
  '[Auth Service] Get User Failure',
  props<{isLoggedIn: boolean, userData: undefined}>()
);

export const logout = createAction(
  '[Header Component] Logout'
);

export const logoutSuccess = createAction(
  '[Auth Effect] Logout Success',
  props<{ isLoggedIn: boolean, userData: any}>()
);

export const logoutFailure = createAction(
  '[Auth Effect] Logout Failure',
  props<{ error: any }>()
);

export const resetError = createAction(
  '[Modal Component] Reset Error',
  props<{ error: any}>()
);

