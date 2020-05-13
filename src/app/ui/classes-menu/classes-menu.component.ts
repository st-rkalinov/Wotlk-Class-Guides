import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharactersClassService} from '../../character-class/characters-class.service';
import {Subscription} from 'rxjs';
import {CharacterClassModel} from '../../character-class/character-class.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-classes-menu',
  templateUrl: './classes-menu.component.html',
  styleUrls: ['./classes-menu.component.scss']
})
export class ClassesMenuComponent implements OnInit, OnDestroy {
  classesDataSubscription: Subscription = new Subscription();
  classesData: CharacterClassModel[];

  constructor(private charactersClassService: CharactersClassService, private authService: AuthService) { }

  ngOnInit(): void {
    this.charactersClassService.fetchClassesData();
    this.classesDataSubscription = this.charactersClassService.classesDataChanged.subscribe(data => {
      this.classesData = [...data];
    });
  }

  formatRouteParam(param: string) {
    return param.replace(/\W+/g, '-').toLowerCase();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.classesDataSubscription) {
      this.classesDataSubscription.unsubscribe();
    }
  }
}
