import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class SharedDataService {
  constructor(private db: AngularFirestore) {
  }

  fetchClassesData() {
    return this.db.collection('classes').valueChanges();
  }
}
