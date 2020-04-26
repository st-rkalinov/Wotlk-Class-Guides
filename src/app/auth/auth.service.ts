import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  public error = new Subject<any>();
  public errorMessage = '';
  public hasErrors: boolean;

  constructor(private router: Router) {
    this.hasErrors = false;
  }

  login(loginForm: FormGroup) {
    if (loginForm.invalid) {
      this.hasErrors = true;

      if (loginForm.get('email').untouched || loginForm.get('email').value === '') {
        this.errorMessage = 'Please enter your account email';
      } else if (loginForm.get('password').untouched || loginForm.get('password').value === '') {
        this.errorMessage = 'Please enter your account password';
      } else {
        this.errorMessage = 'Invalid account credentials';
      }
    } else {
      this.hasErrors = false;
      this.errorMessage = '';
      this.router.navigate(['/']);
    }

    this.error.next({ message: this.errorMessage, hasErrors: this.hasErrors });
  }

  errorObservable() {
    return this.error.asObservable();
  }
}
