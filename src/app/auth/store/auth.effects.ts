import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthService} from '../auth.service';
import * as fromAuthActions from '../store/auth.actions';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.login),
      exhaustMap(action =>
        this.authService.login(action.email, action.password, action.globalErrors).pipe(
          map(user => fromAuthActions.loginSuccess()),
          tap(() => this.router.navigate(['/guides'])),
          catchError(error => of(fromAuthActions.loginFailure({error: error.message})))
        ))
    ));

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.logout),
      exhaustMap(action => this.authService.logout().pipe(
        map(result => fromAuthActions.logoutSuccess({isLoggedIn: false, userData: undefined})),
        tap(() => this.router.navigate(['/login'])),
        catchError(error => of(fromAuthActions.logoutFailure({error: error.message})))
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.signUp),
      exhaustMap(action => this.authService.signUp(action.email, action.nickname, action.password, action.passwordConfirm, action.globalErrors).pipe(
        map(result => this.userService.addUserAdditionalData(result.user.uid, action.nickname.value)),
        map(() => fromAuthActions.signUpSuccess()),
        tap(() => this.router.navigate(['/guides'])),
        catchError(error => of(fromAuthActions.signUpFailure({error: error.message})))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.getUser),
      switchMap(action => this.userService.fetchUserAdditionalData(action.uid).pipe(
        map(result => fromAuthActions.getUserSuccess({isLoggedIn: true, userData: { uid: action.uid, nickname: result[0].nickname }})),
        catchError(error => of(fromAuthActions.getUserFailure({userData: undefined})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService, private userService: UserService, private router: Router) {
  }

}
