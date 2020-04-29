import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharactersClassService} from '../character-class/characters-class.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import {CharacterClassModel} from '../character-class/character-class.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  classesData: CharacterClassModel[];
  classesDataSubscription = new Subscription();
  gems = [];

  constructor(private charactersClassService: CharactersClassService, private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.charactersClassService.fetchClassesData();
    this.classesDataSubscription = this.charactersClassService.classesDataChanged.subscribe(data => {
      this.classesData = data;
    });

    const blueItemsCollection = this.db.collection('gems', ref => ref.where('category', '==', 'red'));
    blueItemsCollection.valueChanges().subscribe(result => {
      this.gems = [...result];
    });
  }

  ngOnDestroy(): void {
    this.classesDataSubscription.unsubscribe();
  }
}
