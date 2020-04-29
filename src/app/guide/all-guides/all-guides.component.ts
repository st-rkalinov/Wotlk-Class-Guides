import { Component, OnInit } from '@angular/core';
import {CharactersClassService} from '../../character-class/characters-class.service';
import {CharacterClassModel} from '../../character-class/character-class.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-all-guides',
  templateUrl: './all-guides.component.html',
  styleUrls: ['./all-guides.component.scss']
})
export class AllGuidesComponent implements OnInit {
  classesData: CharacterClassModel[];
  classesDataSubscription = new Subscription();

  constructor(private charactersClassService: CharactersClassService) { }

  ngOnInit(): void {
    this.charactersClassService.fetchClassesData();
    this.classesDataSubscription = this.charactersClassService.classesDataChanged.subscribe(data => {
      this.classesData = [...data];
    });
  }

}
