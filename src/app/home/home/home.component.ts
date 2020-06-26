import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterClassModel} from '../../models/character-class.model';
import {Store} from '@ngrx/store';
import {setPageTitle} from '../../shared/store/shared.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  aboutSectionButtonStyles = { width: '35%', padding: '1rem 0', letterSpacing: '3px'};
  selectedClass: CharacterClassModel;

  constructor(private store: Store) {
    this.store.dispatch(setPageTitle({pageTitle: 'Ultimate Guides - Home'}));
  }

  ngOnInit(): void {
  }

  navigateToGithubProject() {
    (window as any).open('https://github.com/st-rkalinov/Wotlk-Class-Guides', "_blank");
  }

  ngOnDestroy(): void {
  }
}
