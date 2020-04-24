import { Component, OnInit } from '@angular/core';
import {CharactersClassService} from '../character-class/characters-class.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  charactersData = [];

  constructor(private charactersClassService: CharactersClassService, private db: AngularFirestore) {
    this.charactersData = this.charactersClassService.getCharactersData();
  }

  ngOnInit(): void {
    this.db.collection('guides').valueChanges().subscribe(result => {
      console.log(result);
    });
  }

}
