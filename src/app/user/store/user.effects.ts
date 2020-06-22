import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromUserActions from '../store/user.actions';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import {UserService} from '../user.service';
import {GuideService} from '../../guide/guide.service';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {GuideModel} from '../../guide/guide.model';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';


@Injectable()
export class UserEffects {

  geUserGuides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.loadUserGuides),
      switchMap(action =>
        this.userService.fetchUserAdditionalDataByNickname(action.nickname).pipe(
          take(1),
          switchMap((userData: UserAdditionalDataModel[]) => {
            if (userData.length === 0) {
              throw {message: `User '${action.nickname}' not found`};
            }

            return this.guideService.fetchUserGuides(userData[0].uid).pipe(
              take(1),
              map(docArray => {
                return docArray.map((doc: any) => {
                  return {
                    id: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                  };
                });
              })
            );
          }),
          map((userGuides: GuideModel[]) => fromUserActions.loadUserGuidesSuccess({userGuides})),
          catchError(error => of(fromUserActions.loadUserGuidesFailure({error: error.message})))
        )
      )
    ));

  constructor(private actions$: Actions, private userService: UserService, private guideService: GuideService, private store: Store) {}
}
