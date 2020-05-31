import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {GuideService} from '../guide/guide.service';
import {CharactersClassService} from '../services/characters-class.service';

@Injectable()
export class AuthService {
  public error = new Subject<any>();
  public errorMessage = '';
  public hasErrors = false;
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private guideService: GuideService, private classService: CharactersClassService) {
  }

  login(form: FormGroup) {
    if (this.checkFormFields(form, 'login')) {
      this.afAuth.signInWithEmailAndPassword(form.get('email').value, form.get('password').value)
        .then(result => {
          this.hasErrors = false;
          this.errorMessage = '';
          this.isAuthenticated = true;
          this.router.navigate(['/guides']);
        })
        .catch(error => {
          this.hasErrors = true;
          this.errorMessage = error.message;
          this.error.next({message: this.errorMessage, hasErrors: this.hasErrors});

          this.guideService.cancelSubscriptions();
          this.classService.cancelSubscriptions();
          this.isAuthenticated = false;
          this.router.navigate(['/login']);
        });
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
               this.isAuthenticated = true;
               this.router.navigate(['/guides']);
            })
            .catch(error => {
              this.hasErrors = true;
              this.errorMessage = error.message;
              this.error.next({message: this.errorMessage, hasErrors: this.hasErrors});

              this.guideService.cancelSubscriptions();
              this.classService.cancelSubscriptions();
              this.isAuthenticated = false;
              this.router.navigate(['/login']);
            });
        })
        .catch(error => {
          this.hasErrors = true;
          this.errorMessage = error.message;
          this.error.next({message: this.errorMessage, hasErrors: this.hasErrors});

          this.guideService.cancelSubscriptions();
          this.classService.cancelSubscriptions();
          this.isAuthenticated = false;
        });
    }
  }

  logout() {
    this.afAuth.signOut()
      .then(result => {
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.isAuthenticated = false;
      });
  }

  checkFormFields(form: FormGroup, componentName: string) {
    if (form.invalid) {
      this.hasErrors = true;

      if (componentName === 'login') {
        this.checkLoginForm(form);
      } else if (componentName === 'signup') {
        this.checkSignUpForm(form);
      }

      this.error.next({message: this.errorMessage, hasErrors: this.hasErrors});

      return false;
    } else {
      return true;
    }
  }

  private checkLoginForm(form: FormGroup) {
    if (form.get('email').hasError('email') || form.get('email').untouched) {
      this.errorMessage = 'Please enter a correct email address';
    } else if (form.get('password').untouched || form.get('password').hasError('required')) {
      this.errorMessage = 'Please enter your account password';
    }
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

  isAuth() {
    return this.isAuthenticated;
  }
}
