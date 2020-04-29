import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CharacterClassModel} from './character-class.model';

@Injectable()
export class CharactersClassService {
  classesData: CharacterClassModel[] = [];
  classesDataChanged = new Subject<CharacterClassModel[]>();

  constructor(private db: AngularFirestore) {
  }

  fetchClassesData() {
    this.db.collection('classes').valueChanges().pipe(map(classesData => {
      return classesData;
    }))
    .subscribe((data: CharacterClassModel[]) => {
      this.classesData = data;
      this.classesDataChanged.next([...this.classesData]);
    });

    //console.log(this.classesData);
    //this.classesData = [...data];
  }
}
