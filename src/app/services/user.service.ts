import {Injectable} from '@angular/core';
import {UserAdditionalDataModel} from '../models/user-additionalData.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from 'firebase';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class UserService {
  userAdditionalData: UserAdditionalDataModel;
  userAdditionalDataChange = new Subject<UserAdditionalDataModel>();

  constructor(private db: AngularFirestore) {
  }

  saveUserAdditionalData(user: User) {
    this.fetchUserAdditionalData(user.uid);
  }

  deleteUserAdditionalData() {
    this.userAdditionalData = null;
  }

  fetchUserAdditionalData(uid: string): Observable<any> {
    return this.db.collection('users', ref => ref.where('uid', '==', uid))
      .valueChanges();
     /* .subscribe((value: UserAdditionalDataModel[]) => {
        this.userAdditionalData = value[0];
        this.userAdditionalDataChange.next(value[0]);
      });*/
  }
}
