import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SharedDataService} from '../shared-data.service';
import * as fromSharedActions from './shared.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {CharacterClassModel} from '../../models/character-class.model';


@Injectable()
export class SharedEffects {

  getSharedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSharedActions.loadShared),
      exhaustMap(action =>
        this.sharedDataService.fetchClassesData().pipe(
          map((result: CharacterClassModel[]) => fromSharedActions.loadSharedSuccess({classesData: result})),
          catchError(error => of(fromSharedActions.loadSharedFailure({error: error.message})))
        ))
    ));

  constructor(private actions$: Actions, private sharedDataService: SharedDataService) {
  }

}
