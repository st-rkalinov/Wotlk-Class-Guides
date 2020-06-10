import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  constructor(private db: AngularFirestore) {
  }

  fetchUserAdditionalData(uid: string): Observable<any> {
    return this.db.collection('users', ref => ref.where('uid', '==', uid))
      .valueChanges();
  }

  addUserAdditionalData(uid: string, nickname: string) {
    return this.db.collection('users').add({
      uid,
      nickname
    });
  }
}
