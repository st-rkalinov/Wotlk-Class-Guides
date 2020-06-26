import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  constructor(private db: AngularFirestore) { }

  fetchGuides(className: string | undefined, specName: string | undefined) {
    if (className && !specName) {
      return this.db.collection('guides', ref => ref.where('class', '==', className.toLowerCase())).snapshotChanges();
    } else if (className && specName) {
      const spec = this.formatSpecName(specName);
      return this.db.collection('guides', ref => ref.where('spec', '==', spec)).snapshotChanges();
    }
    return this.db.collection('guides').snapshotChanges();
  }

  fetchGuide(uid: string): Observable<any> {
    return this.db.collection('guides').doc(uid).valueChanges();
  }

  fetchUserGuides(uid: string) {
    return this.db.collection('guides', ref => ref.where('author_id', '==', uid))
      .snapshotChanges();
  }

  findAndReplaceOccurencesInString(from: string, to: string) {
    return from.split("\\n").join('\n');
  }

  private formatSpecName(specName) {
    return specName.replace(/-/g, ' ').toLowerCase();
  }

}
