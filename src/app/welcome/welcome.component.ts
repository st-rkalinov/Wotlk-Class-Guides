import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharactersClassService} from '../character-class/characters-class.service';
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

  aboutSectionButtonStyles = { width: '35%', padding: '1rem 0', letterSpacing: '3px'};
  guidesSectionClassButtonStyles = { width: '35%', padding: '0.5rem 0', letterSpacing: '3px'};
  guidesSectionSpecButtonStyles = { width: '100%', padding: '0.5rem 0', letterSpacing: '3px'};

  selectedClass: {index: number, classData?: CharacterClassModel} = {index: 0, classData: null};

  constructor(private charactersClassService: CharactersClassService) {
  }

  ngOnInit(): void {
    this.charactersClassService.fetchClassesData();
    this.classesDataSubscription = this.charactersClassService.classesDataChanged.subscribe(data => {
      this.classesData = data;
      this.selectedClass.index = 0;
      this.selectedClass.classData = this.classesData[0];
    });
  }

  ngOnDestroy(): void {
    this.classesDataSubscription.unsubscribe();
  }
}
