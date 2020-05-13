import {Injectable} from '@angular/core';
import {DbGemModel} from '../models/gem.model';
import {AbstractControl} from '@angular/forms';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/firestore';
import {Subject} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {GemsByCategory, DbGuideGemsModel, DbGemsModel} from '../models/gems.model';

@Injectable({
  providedIn: 'root'
})
export class NewGuideService {
  gems: Array<DbGemsModel>;
  gemsChanged = new Subject<DbGuideGemsModel>();

  constructor(private db: AngularFirestore) {
  }

  splitGemsByCategory(gemsData: Array<DbGemsModel>): DbGuideGemsModel {
    const gems = new GemsByCategory();

    if (gemsData) {
      gemsData.forEach(value => {
        const categoryGems: Array<DbGemModel> = value.gems;
        gems.addGems(value.category, categoryGems);
      });
    }

    return gems;
  }

  addNewGuideToDatabase(guideData: object) {
    this.db.collection('guides').add(guideData);
  }

  classAndSpecCustomValidator(value: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = value === control.value;

      return forbidden ? {value: control.value} : null;
    };
  }

  fetchAvailableGems() {
    this.db.collection('gems')
      .snapshotChanges()
        .pipe(take(1),
        map(docArray => {
          return docArray.map((doc: any) => {
            return {
              category: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            };
          });
      })).subscribe((data: Array<DbGemsModel>) => {
        this.gems = data;
        this.gemsChanged.next(this.splitGemsByCategory(this.gems));
    });
  }
}
