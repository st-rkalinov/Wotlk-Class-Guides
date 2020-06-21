import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {AuthService} from '../auth.service';
import * as fromAuthActions from '../store/auth.actions';
import {Router} from '@angular/router';
import {UserService} from '../../user/user.service';
import * as firebase from 'firebase';
import {Store} from '@ngrx/store';
import {resetLoading, setLoading} from '../../shared/store/shared.actions';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.login),
      exhaustMap(action => {
        this.store.dispatch(setLoading());

        return this.authService.login(action.email, action.password, action.globalErrors).pipe(
          map(user => {
            this.store.dispatch(resetLoading());
            return fromAuthActions.loginSuccess();
          }),
          tap(() => this.router.navigate(['/guides'])),
          catchError(error => {
            this.store.dispatch(resetLoading());
            return of(fromAuthActions.loginFailure({error: error.message}));
          })
        );
      })
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
      exhaustMap(action => {
        this.store.dispatch(setLoading());
        const checkUserNicknameExistence = firebase.functions().httpsCallable('checkUserNicknameExistence');

        return from(checkUserNicknameExistence({nickname: action.nickname.value})).pipe(
          switchMap(() => this.authService.signUp(action.email, action.nickname, action.password, action.passwordConfirm, action.globalErrors).pipe(
            map(result => {
              from(this.userService.addUserAdditionalData(result.user.uid, action.nickname.value));
            }),
            map(() => {
              const addUserNickname = firebase.functions().httpsCallable('addUserNickname');

              from(addUserNickname({nickname: action.nickname.value}));
            }),
            map(() => {
              this.store.dispatch(resetLoading());
              return fromAuthActions.signUpSuccess();
            }),
            tap(() => this.router.navigate(['/guides'])),
            catchError(error => {
              this.store.dispatch(resetLoading());
              return of(fromAuthActions.signUpFailure({error: error.message}));
            })
          )),
          catchError(error => {
            this.store.dispatch(resetLoading());
            return of(fromAuthActions.signUpFailure({error: error.message}));
          })
        );
      })
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

  constructor(private actions$: Actions, private authService: AuthService, private userService: UserService, private router: Router, private store: Store) {
  }

}
