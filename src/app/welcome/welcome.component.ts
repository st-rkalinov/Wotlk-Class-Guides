import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterClassModel} from '../models/character-class.model';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  aboutSectionButtonStyles = { width: '35%', padding: '1rem 0', letterSpacing: '3px'};
  selectedClass: CharacterClassModel;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
