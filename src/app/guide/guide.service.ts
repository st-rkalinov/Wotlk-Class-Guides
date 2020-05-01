import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  guides: object[] = [];
  guidesChanged = new Subject<any>();

  constructor(private db: AngularFirestore) { }

  fetchSpecificSpecGuides(className: string, specName: string) {
    const spec = this.formatSpecName(specName);
    this.db.collection('guides', ref => ref.where('spec', '==', spec))
     .valueChanges()
     .pipe(map(guidesData => {
       return guidesData;
     })).subscribe((guidesData: object[]) => {
       this.guides = guidesData;
       this.guidesChanged.next([...this.guides]);
     });
   }

  fetchSpecificClassGuides(className: string) {
    this.db.collection('guides', ref => ref.where('class', '==', className.toLowerCase()))
      .valueChanges()
      .pipe(map(guidesData => {
        return guidesData;
      })).subscribe((guidesData: object[]) => {
        this.guides = guidesData;
        this.guidesChanged.next([...this.guides]);
      });
  }

  fetchAllGuides() {
    this.db.collection('guides')
      .valueChanges()
      .pipe(map(guidesData => {
        return guidesData;
      })).subscribe((guidesData: object[]) => {
        this.guides = guidesData;
        this.guidesChanged.next([...this.guides]);
      });
  }

  private formatSpecName(specName) {
    return specName.replace(/-/g, ' ').toLowerCase();
  }
}
