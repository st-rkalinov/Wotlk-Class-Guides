import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {CharacterClassModel} from '../models/character-class.model';
import {GuideState} from '../guide/store';
import {Store} from '@ngrx/store';
import * as fromGuideActions from '../guide/store/guide.actions';

@Injectable()
export class CharactersClassService {
  classesData: CharacterClassModel[] = [];
  classesDataChanged = new Subject<CharacterClassModel[]>();
  classesSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private store: Store<GuideState>) {
  }

  fetchClassesData() {
    this.classesSubs.push(
      this.db.collection('classes').valueChanges().pipe(map(classesData => {
        return classesData;
      }))
      .subscribe((data: CharacterClassModel[]) => {
        this.classesData = data;
        //this.store.dispatch(fromGuideActions.loadClassesDataSuccess({classesData: data}));
        this.classesDataChanged.next([...this.classesData]);
      })
    );
  }

  fetchClassesData2() {
    return this.db.collection('classes').valueChanges();
  }

  cancelSubscriptions() {
    this.classesSubs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
