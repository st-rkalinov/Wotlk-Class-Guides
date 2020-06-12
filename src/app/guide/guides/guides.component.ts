import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CharactersClassService} from '../../services/characters-class.service';
import {CharacterClassModel} from '../../models/character-class.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {DbCharacterClassSpecModel} from '../../models/character-class-spec.model';
import {GuideService} from '../guide.service';
import {GuideModel} from '../guide.model';
import {exhaustMap} from 'rxjs/operators';
import {MenuSelectedClassModel} from '../../models/menu-selected-class.model';
import {MenuSelectedSpecModel} from '../../models/menu-selected-spec.model';
import {GuideState} from '../store';
import {Store} from '@ngrx/store';
import * as fromGuideActions from '../store/guide.actions';

@Component({
  selector: 'app-all-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss']
})
export class GuidesComponent implements OnInit, OnDestroy {
  selectedClass: MenuSelectedClassModel = {index: -1, classData: null};
  selectedSpec: MenuSelectedSpecModel = {index: -1, specData: null};

  constructor(private charactersClassService: CharactersClassService,
              private guideService: GuideService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<GuideState>) {}

  ngOnInit(): void {
  }

  setSelectedClassData($event) {
    this.selectedClass = $event;
  }

  loadSpecificClassGuides($event) {
    const className = $event.name.toLowerCase();
    this.selectedClass = $event;
    this.router.navigate(['/guides'], {queryParams: {class: className}});
  }

  loadSpecificSpecGuides($event) {
    this.router.navigate(['/guides'], {
      queryParams: {
        class: this.selectedClass.classData.name.toLowerCase(),
        spec: $event.specData.name.toLowerCase()
      }
    });
  }

  ngOnDestroy(): void {
  }
}
