import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromGuideActions from './guide.actions';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {GuideService} from '../guide.service';
import {of} from 'rxjs';
import {DbGuideModel, GuideModel} from '../guide.model';
import {NewGuideService} from '../new-guide.service';
import {DbGemsModel} from '../../models/gems.model';
import {UserService} from '../../services/user.service';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';

@Injectable()
export class GuideEffects {

  getGuides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGuideActions.loadGuides),
      switchMap(action =>
        this.guideService.fetchGuides(action.className, action.spec).pipe(
          exhaustMap((result: DbGuideModel[]) => this.userService.fetchAllUsersAdditionalData().pipe(
            map((users: UserAdditionalDataModel[]) => {
              return result.map((guide: DbGuideModel) => {
                return {
                  class: guide.class,
                  spec: guide.spec,
                  gems: guide.gems,
                  author: {uid: guide.author_id, nickname: this.userService.getUserNicknameByUid(guide.author_id, users)}
                };
              });
            })
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
