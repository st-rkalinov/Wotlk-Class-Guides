import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AuthState} from '../store';
import {Store} from '@ngrx/store';
import * as fromAuthActions from '../store/auth.actions';
import {LoginFormFieldModel} from '../../models/login-formField.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private store: Store<AuthState>) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      }),
    });
  }

  onSubmit(): void {
    const emailData: LoginFormFieldModel = {
      value: this.loginForm.get('email').value,
      errors: this.loginForm.get('email').errors,
      name: 'email'
    };
    const passwordData: LoginFormFieldModel = {
      value: this.loginForm.get('password').value,
      errors: this.loginForm.get('password').errors,
      name: 'password'
    };

    this.store.dispatch(fromAuthActions.login({email: emailData, password: passwordData}));
  }
}

