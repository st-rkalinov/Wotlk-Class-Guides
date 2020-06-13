import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GuideState} from '../guide/store';
import {Store} from '@ngrx/store';

@Injectable()
export class CharactersClassService {
  constructor(private db: AngularFirestore, private store: Store<GuideState>) {
  }

  fetchClassesData() {
    return this.db.collection('classes').valueChanges();
  }
}
