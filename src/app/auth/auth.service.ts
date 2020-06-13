import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {from, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {GuideService} from '../guide/guide.service';
import {CharactersClassService} from '../services/characters-class.service';
import {UserService} from '../services/user.service';
import {AuthState} from './store';
import {Store} from '@ngrx/store';
import * as fromAuthActions from './store/auth.actions';
import {FormFieldModel} from '../models/form-field.model';
import {FormErrorChecker} from '../shared/FormErrorChecker';

@Injectable()
export class AuthService {
  constructor(private router: Router, private afAuth: AngularFireAuth,
              private guideService: GuideService,
              private classService: CharactersClassService,
              private userService: UserService,
              private store: Store<AuthState>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(fromAuthActions.getUser({uid: user.uid}));
      }
    });
  }

  login(email: FormFieldModel, password: FormFieldModel, globalErrors: object) {
    const loginCheck = new FormErrorChecker([email, password], globalErrors, 'login');

    if (loginCheck.hasErrors()) {
      return throwError({message: loginCheck.getError()});
    } else {
      return from(this.afAuth.signInWithEmailAndPassword(email.value, password.value));
    }
  }

  signUp(email: FormFieldModel, nickname: FormFieldModel, password: FormFieldModel, passwordConfirm: FormFieldModel, globalErrors: object) {
    const signUpCheck = new FormErrorChecker([email, nickname, password, passwordConfirm], globalErrors, 'signup');

    if (signUpCheck.hasErrors()) {
      return throwError({message: signUpCheck.getError()});
    } else {
      return from(this.afAuth.createUserWithEmailAndPassword(email.value, password.value));
    }
  }

  logout() {
    return from(this.afAuth.signOut());
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('passwordConfirm').value;

    return password === confirmPassword ? null : { notSame: true };
  }
}
