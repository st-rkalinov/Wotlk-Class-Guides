import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromGuideActions from './guide.actions';
import {catchError, combineAll, concatMap, delay, exhaustMap, first, map, mergeMap, switchMap, take, takeLast, tap} from 'rxjs/operators';
import {GuideService} from '../guide.service';
import {combineLatest, forkJoin, Observable, of} from 'rxjs';
import {DbGuideModel, GuideModel} from '../guide.model';
import {NewGuideService} from '../new-guide.service';
import {DbGemsModel} from '../../models/gems.model';
import {UserService} from '../../services/user.service';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';

@Injectable()
export class GuideEffects {
 /* getGuides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGuideActions.loadGuides),
      switchMap(action => {
        const guidesData$ = this.guideService.fetchGuides(action.className, action.spec).pipe(take(1));
        const usersData$ = this.userService.fetchAllUsersAdditionalData().pipe(take(2));

        return forkJoin({guides: guidesData$, users: usersData$}).pipe(
          map(result => {
            return result.guides.map((doc: any) => {
              const payloadData = {
                ...doc.payload.doc.data()
              };

              return {
                id: doc.payload.doc.id,
                class: payloadData.class,
                spec: payloadData.spec,
                gems: payloadData.gems,
                macros: payloadData.macros,
                author: {uid: payloadData.author_id, nickname: this.userService.getUserNicknameByUid(payloadData.author_id, result.users)}
              };
            });
          }),
        );
      }),
      map((result: GuideModel[]) => fromGuideActions.loadGuidesSuccess({guides: result})),
      catchError(error => of(fromGuideActions.loadGuidesFailure({error: error.message})))
    ));*/


    getGuides$ = createEffect(() =>
      this.actions$.pipe(
        ofType(fromGuideActions.loadGuides),
        switchMap(action =>
          this.guideService.fetchGuides(action.className, action.spec).pipe(
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
                    author: { uid: payloadData.author_id, nickname: this.userService.getUserNicknameByUid(payloadData.author_id, users)}
                  };
                });
              }),
            )),
            map((result: GuideModel[]) => fromGuideActions.loadGuidesSuccess({guides: result})),
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

  constructor(private actions$: Actions, private guideService: GuideService, private newGuideService: NewGuideService, private userService: UserService) {
  }

}
