import { Component, OnInit } from '@angular/core';
import {CharactersClassService} from '../character-class/characters-class.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  charactersData = [];

  constructor(private charactersClassService: CharactersClassService) {
    this.charactersData = this.charactersClassService.getCharactersData();
  }

  ngOnInit(): void {
  }

}
