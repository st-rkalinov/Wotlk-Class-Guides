import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AuthState} from '../store';
import * as fromAuthActions from '../store/auth.actions';
import {FormFieldModel} from '../../models/form-field.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private authService: AuthService, private store: Store<AuthState>) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      nickname: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      passwordConfirm: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    }, { validators: [this.authService.passwordsMatchValidator]});
  }

  onSubmit() {
    const email: FormFieldModel = {
      value: this.signUpForm.get('email').value,
      errors: this.signUpForm.get('email').errors,
      name: 'email'
    };
    const nickname: FormFieldModel = {
      value: this.signUpForm.get('nickname').value.toLowerCase(),
      errors: this.signUpForm.get('nickname').errors,
      name: 'nickname'
    };
    const password: FormFieldModel = {
      value: this.signUpForm.get('password').value,
      errors: this.signUpForm.get('password').errors,
      name: 'password'
    };
    const passwordConfirm: FormFieldModel = {
      value: this.signUpForm.get('passwordConfirm').value,
      errors: this.signUpForm.get('passwordConfirm').errors,
      name: 'passwordConfirm'
    };
    const globalErrors = this.signUpForm.errors;


    this.store.dispatch(fromAuthActions.signUp({email, nickname, password, passwordConfirm, globalErrors}));
  }

}
