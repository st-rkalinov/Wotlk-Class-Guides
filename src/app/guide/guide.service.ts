import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, subscribeOn} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {GuideState} from './store';
import {Store} from '@ngrx/store';
import * as fromGuideActions from './store/guide.actions';
import {DbGuideModel} from './guide.model';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  guides: DbGuideModel[] = [];
  guidesChanged = new Subject<any>();
  guidesSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private store: Store<GuideState>) { }

  fetchGuides(className: string | undefined, specName: string | undefined) {
    if (className && !specName) {
      return this.db.collection('guides', ref => ref.where('class', '==', className.toLowerCase())).valueChanges();
    } else if (className && specName) {
      const spec = this.formatSpecName(specName);
      return this.db.collection('guides', ref => ref.where('spec', '==', spec)).valueChanges();
    }

    return this.db.collection('guides').valueChanges();
  }

/*
  fetchSpecificSpecGuides(className: string, specName: string) {
    const spec = this.formatSpecName(specName);
    this.guidesSubs.push(
      this.db.collection('guides', ref => ref.where('spec', '==', spec))
       .valueChanges()
       .pipe(map(guidesData => {
         return guidesData;
       })).subscribe((guidesData: GuideModel[]) => {
         this.guides = guidesData;
         this.store.dispatch(fromGuideActions.loadGuidesSuccess({guides: this.guides}));
         this.guidesChanged.next([...this.guides]);
       })
    );
   }

  fetchSpecificClassGuides(className: string) {
    this.guidesSubs.push(
      this.db.collection('guides', ref => ref.where('class', '==', className.toLowerCase()))
        .valueChanges()
        .pipe(map(guidesData => {
          return guidesData;
        })).subscribe((guidesData: GuideModel[]) => {
          this.guides = guidesData;
          this.store.dispatch(fromGuideActions.loadGuidesSuccess({guides: this.guides}));

          this.guidesChanged.next([...this.guides]);
        })
    );
  }

  fetchAllGuides() {
    this.guidesSubs.push(
      this.db.collection('guides')
        .valueChanges()
        .pipe(map(guidesData => {
          return guidesData;
        })).subscribe((guidesData: GuideModel[]) => {
          this.guides = guidesData;
          this.store.dispatch(fromGuideActions.loadGuidesSuccess({guides: this.guides}));

          this.guidesChanged.next([...this.guides]);
        })
    );
  }
*/

  private formatSpecName(specName) {
    return specName.replace(/-/g, ' ').toLowerCase();
  }

  cancelSubscriptions() {
    this.guidesSubs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
