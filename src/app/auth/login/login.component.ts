import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AuthState} from '../store';
import {Store} from '@ngrx/store';
import * as fromAuthActions from '../store/auth.actions';
import {FormFieldModel} from '../../models/form-field.model';
import {selectIsLoading} from '../../shared/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;

  constructor(private authService: AuthService, private store: Store<AuthState>) {
  }

  ngOnInit(): void {
    this.store.select(selectIsLoading).subscribe(isLoading => {
      this.isLoading = isLoading;
    });

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

