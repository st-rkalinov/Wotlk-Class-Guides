import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {CharacterClassModel} from './character-class.model';

@Injectable()
export class CharactersClassService {
  classesData: CharacterClassModel[] = [];
  classesDataChanged = new Subject<CharacterClassModel[]>();
  classesSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {
  }

  fetchClassesData() {
    this.classesSubs.push(
      this.db.collection('classes').valueChanges().pipe(map(classesData => {
        return classesData;
      }))
      .subscribe((data: CharacterClassModel[]) => {
        this.classesData = data;
        this.classesDataChanged.next([...this.classesData]);
      })
    );
  }

  extractClassSpecs(classData: CharacterClassModel) {
    return classData.specs;
  }

  cancelSubscriptions() {
    this.classesSubs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
