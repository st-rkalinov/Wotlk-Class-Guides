import { createAction, props } from '@ngrx/store';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';
import {FormFieldModel} from '../../models/form-field.model';

export const login = createAction(
  '[Login Component] Login',
  props<{ email: FormFieldModel, password: FormFieldModel, globalErrors: object }>()
);

export const loginSuccess = createAction(
  '[Auth Effect] Login Success'
);

export const loginFailure = createAction(
  '[Auth Effect] Login Failure',
  props<{ error: any }>()
);

export const signUp = createAction(
  '[Auth Service] SignUp',
  props<{email: FormFieldModel, nickname: FormFieldModel, password: FormFieldModel, passwordConfirm: FormFieldModel, globalErrors: object}>()
);

export const signUpSuccess = createAction(
  '[Auth Service] SignUp Success'
);

export const signUpFailure = createAction(
  '[Auth Service] SignUp Failure',
  props<{ error: any }>()
);

export const getUserSuccess = createAction(
  '[Auth Service] Get User Success',
  props<{isLoggedIn: boolean, userData: UserAdditionalDataModel}>()
);

export const getUserFailure = createAction(
  '[Auth Service] Get User Failure',
  props<{userData: undefined}>()
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

