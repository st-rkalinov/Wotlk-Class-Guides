import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {GuideService} from '../guide/guide.service';
import {CharactersClassService} from '../character-class/characters-class.service';

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
      }

      this.error.next({message: this.errorMessage, hasErrors: this.hasErrors});

      return false;
    } else {
      return true;
    }
  }

  private checkLoginForm(form: FormGroup) {
    if (form.get('email').untouched || form.get('email').value === '') {
      this.errorMessage = 'Please enter your account email';
    } else if (form.get('password').untouched || form.get('password').value === '') {
      this.errorMessage = 'Please enter your account password';
    } else if (form.get('email').dirty) {
      this.errorMessage = 'The email address is not correctly formatted';
    }
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
