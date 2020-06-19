import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {UserAdditionalDataModel} from '../models/user-additionalData.model';

@Injectable()
export class UserService {
  constructor(private db: AngularFirestore) {
  }

  fetchUserAdditionalData(uid: string): Observable<any> {
    return this.db.collection('users', ref => ref.where('uid', '==', uid))
      .valueChanges();
  }

  fetchAllUsersAdditionalData(): Observable<any> {
    return this.db.collection('users').valueChanges();
  }

  addUserAdditionalData(uid: string, nickname: string) {
    return this.db.collection('users').add({
      uid,
      nickname
    });
  }

  getUserNicknameByUid(uid: string, users: UserAdditionalDataModel[]) {
    for (const user of users) {
      if (user.uid === uid) {
        return user.nickname;
      }
    }
  }
}
