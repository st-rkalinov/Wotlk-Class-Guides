import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthService} from '../auth.service';
import * as fromAuthActions from '../store/auth.actions';
import {Router} from '@angular/router';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.login),
      exhaustMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(user =>
            fromAuthActions.loginSuccess({isLoggedIn: true})
          ),
          tap(() => this.router.navigate(['/guides'])),
          catchError(error => of(fromAuthActions.loginFailure({error: error.message })))
        ))
  ));

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

}
