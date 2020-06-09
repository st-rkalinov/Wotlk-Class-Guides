import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {from, Observable, of, Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {GuideService} from '../guide/guide.service';
import {CharactersClassService} from '../services/characters-class.service';
import {UserService} from '../services/user.service';
import {AuthState} from './store';
import {Store} from '@ngrx/store';
import * as fromAuthActions from './store/auth.actions';
import {UserAdditionalDataModel} from '../models/user-additionalData.model';
import {LoginFormFieldModel} from '../models/login-formField.model';
import {CustomFormErrorChecker} from './formHelper';

@Injectable()
export class AuthService {
  public error = new Subject<any>();
  public errorMessage = '';
  public hasErrors = false;
  public userAdditionalData: UserAdditionalDataModel;

  constructor(private router: Router, private afAuth: AngularFireAuth,
              private guideService: GuideService,
              private classService: CharactersClassService,
              private userService: UserService,
              private store: Store<AuthState>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userService.fetchUserAdditionalData(user.uid).subscribe(data => {
          this.userAdditionalData = data[0];
          this.store.dispatch(fromAuthActions.getUserSuccess({isLoggedIn: true, userData: {uid: user.uid, nickname: data[0].nickname}}));
        });
      } else {
        this.store.dispatch(fromAuthActions.getUserFailure({isLoggedIn: false, userData: undefined}));
      }
    });
  }

  login(email: LoginFormFieldModel, password: LoginFormFieldModel) {
    const loginCheck = new CustomFormErrorChecker([email, password], 'login');

    if (loginCheck.hasErrors()) {
      return throwError({message: loginCheck.getError()});
    } else {
      return from(this.afAuth.signInWithEmailAndPassword(email.value, password.value));
    }
  }

  signup(form: FormGroup) {
    if (this.checkFormFields(form, 'signup')) {
      const email = form.get('email').value;
      const password = form.get('password').value;

      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(result => {
          this.hasErrors = false;
          this.errorMessage = '';

          this.afAuth.signInWithEmailAndPassword(email, password)
            .then(loginResult => {
              this.router.navigate(['/guides']);
            })
            .catch(error => {
              this.hasErrors = true;
              this.errorMessage = error.message;
            });
        })
        .catch(error => {
          this.hasErrors = true;
          this.errorMessage = error.message;
          this.error.next({message: this.errorMessage, hasErrors: this.hasErrors});
        });
    }
  }

  logout() {
    this.store.dispatch(fromAuthActions.logout());
    this.afAuth.signOut().then(() => {
      this.store.dispatch(fromAuthActions.logoutSuccess({isLoggedIn: false, userData: undefined}));
      this.userService.deleteUserAdditionalData();
      this.guideService.cancelSubscriptions();
      this.classService.cancelSubscriptions();
      this.router.navigate(['/login']);
    }).catch(error => {
       this.store.dispatch(fromAuthActions.logoutFailure({error: error.message }));
    });
  }

  checkFormFields(form: FormGroup, componentName: string) {
    if (form.invalid) {
      this.hasErrors = true;

      if (componentName === 'login') {
        //this.checkLoginForm(form);
      } else if (componentName === 'signup') {
        this.checkSignUpForm(form);
      }

      this.error.next({message: this.errorMessage, hasErrors: this.hasErrors});
//      this.store.dispatch(fromAuthActions.loginFailure({error: this.errorMessage, isLoggedIn: false}));
      return false;
    } else {
      return true;
    }
  }

  public checkLoginForm(email: LoginFormFieldModel, password: LoginFormFieldModel) {
    if (email.errors !== null ) {
      return this.checkLoginEmail(email);
    } else if (password.errors !== null) {
      return 'Please enter your account password';
    }

    return null;
  }

  private checkLoginEmail(email: LoginFormFieldModel) {
    const messages = {
      required: 'The email field is required',
      email: 'Please enter a correct email',
    };
    let error = null;

    Object.keys(email.errors).forEach(key => {
      if ( messages.hasOwnProperty(key) ) {
        error = messages[key];
        return;
      }
    });

    return error;
  }

  private checkSignUpForm(form: FormGroup) {
    if (form.get('email').hasError('email') || form.get('email').untouched) {
      this.errorMessage = 'Please enter a correct email address';
    } else if (form.get('nickname').untouched || form.get('nickname').hasError('required')) {
      this.errorMessage = 'Please enter your nickname';
    } else if (form.get('password').untouched || form.get('password').hasError('required')) {
      this.errorMessage = 'Please enter your account password';
    } else if (form.hasError('notSame')) {
      this.errorMessage = 'Passwords doesnt match';
    }
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('passwordConfirm').value;

    return password === confirmPassword ? null : { notSame: true };
  }

}
