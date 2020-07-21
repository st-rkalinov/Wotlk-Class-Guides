import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AuthState} from '../store';
import {Store} from '@ngrx/store';
import * as fromAuthActions from '../store/auth.actions';
import {resetError} from '../store/auth.actions';
import {FormFieldModel} from '../../models/form-field.model';
import {selectIsLoading} from '../../shared/store';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {setPageTitle} from '../../shared/store/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<AuthState>, private titleService: Title) {
    this.store.dispatch(resetError({error: undefined}));
    this.store.dispatch(setPageTitle({pageTitle: 'Ultimate Guides - Login'}));
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);

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
    const emailData: FormFieldModel = {
      value: this.loginForm.get('email').value,
      errors: this.loginForm.get('email').errors,
      name: 'email'
    };
    const passwordData: FormFieldModel = {
      value: this.loginForm.get('password').value,
      errors: this.loginForm.get('password').errors,
      name: 'password'
    };
    const globalErrors = this.loginForm.errors;

    this.store.dispatch(fromAuthActions.login({email: emailData, password: passwordData, globalErrors}));
  }
}

