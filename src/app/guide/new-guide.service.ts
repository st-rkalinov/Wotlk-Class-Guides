import {Injectable} from '@angular/core';
import {DbGemModel} from '../models/gem.model';
import {AbstractControl} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {DbGuideGemsModel} from '../models/gems.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewGuideService {
  constructor(private db: AngularFirestore, private route: Router) {
  }

  splitGemsByCategory(selectedGems: Array<DbGemModel>): DbGuideGemsModel {
    const gems = {
      red: [],
      blue: [],
      yellow: [],
    };

    if (selectedGems) {
      selectedGems.forEach(value => {
        gems[value.category].push(value);
      });
    }

    return gems;
  }

  addNewGuideToDatabase(guideData: object) {
    this.db.collection('guides').add(guideData)
      .then(result => {
        this.route.navigate(['guides']);
      })
      .catch(error => {
      });
  }

  classAndSpecCustomValidator(value: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = value === control.value;

      return forbidden ? {value: control.value} : null;
    };
  }

  fetchAvailableGems() {
    return this.db.collection('gems')
      .snapshotChanges()
        .pipe(take(1),
        map(docArray => {
          return docArray.map((doc: any) => {
            return {
              category: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            };
          });
      }));
  }
}
