import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromGuideActions from './guide.actions';
import {catchError, map, skipWhile, switchMap, take, tap} from 'rxjs/operators';
import {GuideService} from '../guide.service';
import {of} from 'rxjs';
import {DbGuideModel, GuideModel} from '../guide.model';
import {NewGuideService} from '../new-guide.service';
import {DbGemsModel} from '../../models/gems.model';
import {UserService} from '../../user/user.service';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';
import {Store} from '@ngrx/store';
import {resetLoading} from '../../shared/store/shared.actions';

@Injectable()
export class GuideEffects {
  getSelectedGuide$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGuideActions.loadSelectedGuide),
      switchMap(action =>
        this.guideService.fetchGuide(action.guideId).pipe(
          take(1),
          switchMap((result: DbGuideModel) => {
            if (!result) {
              throw {message: 'Guide Not Found'};
            }

            return this.userService.fetchUserAdditionalData(result.author_id).pipe(
              take(1),
              map((user: UserAdditionalDataModel[]) => {
                return {
                  id: action.guideId,
                  class: result.class,
                  spec: result.spec,
                  gems: result.gems,
                  author: { uid: result.author_id, nickname: user[0].nickname },
                  macros: result.macros
                };
              })
            );
          }),
          map((guideData: GuideModel) => fromGuideActions.loadSelectedGuideSuccess({selectedGuide: guideData})),
          catchError(error => of(fromGuideActions.loadSelectedGuideFailure({error: error.message})))
        )
      )
    )
  );

  getGuides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGuideActions.loadGuides),
      switchMap(action =>
        this.guideService.fetchGuides(action.className, action.spec).pipe(
          take(1),
          switchMap((docArray) => this.userService.fetchAllUsersAdditionalData().pipe(
            map((users: UserAdditionalDataModel[]) => {
              return docArray.map((doc: any) => {
                const payloadData = {
                  ...doc.payload.doc.data()
                };

                return {
                  id: doc.payload.doc.id,
                  class: payloadData.class,
                  spec: payloadData.spec,
                  gems: payloadData.gems,
                  macros: payloadData.macros,
                  author: {uid: payloadData.author_id, nickname: this.userService.getUserNicknameByUid(payloadData.author_id, users)}
                };
              });
            }),
          )),
          skipWhile((result: GuideModel[]) => {
            for (let guide of result) {
              if (guide.author.nickname === undefined) {
                return true;
              }
            }

            return false;
          }),
          map((result: GuideModel[]) => fromGuideActions.loadGuidesSuccess({guides: result})),
          tap(() => this.store.dispatch(resetLoading())),
          catchError(error => of(fromGuideActions.loadGuidesFailure({error: error.message})))
        ))
    ));

  getGems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGuideActions.loadAvailableGems),
      switchMap(action =>
        this.newGuideService.fetchAvailableGems().pipe(
          map((result: DbGemsModel[]) => fromGuideActions.loadAvailableGemsSuccess({gems: result})),
          catchError(error => of(fromGuideActions.loadAvailableGemsFailure({error: error.message})))
        ))
    ));

  constructor(private actions$: Actions, private guideService: GuideService, private newGuideService: NewGuideService, private userService: UserService, private store: Store) {
  }

}
