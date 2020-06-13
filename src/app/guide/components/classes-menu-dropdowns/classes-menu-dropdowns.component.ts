import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CharacterClassModel} from '../../../models/character-class.model';
import {MenuSelectedClassModel} from '../../../models/menu-selected-class.model';
import {Store} from '@ngrx/store';
import {GuideState} from '../../store';
import * as fromGuideActions from '../../store/guide.actions';
import * as fromSharedActions from '../../../shared/store/shared.actions';
import {CharactersClassService} from '../../../services/characters-class.service';
import {from, Observable} from 'rxjs';
import {async} from 'rxjs/internal/scheduler/async';
import {selectClassesData} from '../../../shared/store';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, exhaustMap, take} from 'rxjs/operators';
import {MenuSelectedSpecModel} from '../../../models/menu-selected-spec.model';
import {DbCharacterClassSpecModel} from '../../../models/character-class-spec.model';

@Component({
  selector: 'app-classes-menu-dropdowns',
  templateUrl: './classes-menu-dropdowns.component.html',
  styleUrls: ['./classes-menu-dropdowns.component.scss']
})
export class ClassesMenuDropdownsComponent implements OnInit {
  classesData$: Observable<CharacterClassModel[]>;
  selectedClass: MenuSelectedClassModel = {index: -1, classData: null};
  selectedSpec: MenuSelectedSpecModel = {index: -1, specData: null};

  constructor(private charactersClassService: CharactersClassService, private store: Store<GuideState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(fromSharedActions.loadShared());
    this.classesData$ = this.store.select(selectClassesData);

    this.route.queryParams.pipe(debounceTime(1000)).subscribe(params => {
      params.hasOwnProperty('class') ? this.setSelectedClassData(params.class) : this.resetClassSpecData('class');
      params.hasOwnProperty('spec') ? this.setSelectedSpecData(params.spec) : this.resetClassSpecData('spec');
    });
  }

  loadSpecificClassGuides(classData: CharacterClassModel) {
    this.router.navigate(['/guides'], {
      queryParams: {
        class: classData.name.toLowerCase()
      }
    });
  }

  loadSpecificSpecGuides(className: string, spec: DbCharacterClassSpecModel) {
    this.router.navigate(['/guides'], {
      queryParams: {
        class: className.toLowerCase(),
        spec: spec.name.toLowerCase()
      }
    });
  }

  private setSelectedSpecData(specNameFromRoute: string) {
    const selectedClassSpecs = this.selectedClass.classData.specs;

    for (const spec of selectedClassSpecs) {
      if (spec.name.toLowerCase() === specNameFromRoute) {
        const index = selectedClassSpecs.indexOf(spec);

        this.selectedSpec = { index, specData: spec};
        break;
      }
    }
  }

  private setSelectedClassData(classNameFromRoute: string) {
    this.classesData$.pipe(take(1)).subscribe(data => {
      data.forEach(classData => {
        if (classData.name.toLowerCase() === classNameFromRoute) {
          this.selectedClass = {index: data.indexOf(classData), classData};
        }
      });
    });
  }

  private resetClassSpecData(type: string) {
    type === 'class' ? this.selectedClass = {index: -1, classData: null} : this.selectedSpec = {index: -1, specData: null};
  }
}
