import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CharacterClassModel} from '../../models/character-class.model';
import {MenuSelectedClassModel} from '../../models/menu-selected-class.model';
import {Store} from '@ngrx/store';
import {GuideState} from '../../guide/store';
import * as fromGuideActions from '../../guide/store/guide.actions';
import * as fromSharedActions from '../../shared/store/shared.actions';
import {CharactersClassService} from '../../services/characters-class.service';
import {Observable} from 'rxjs';
import {async} from 'rxjs/internal/scheduler/async';
import {selectClassesData} from '../store';
import {ActivatedRoute} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-classes-menu',
  templateUrl: './classes-menu.component.html',
  styleUrls: ['./classes-menu.component.scss']
})
export class ClassesMenuComponent implements OnInit {
  classesData$: Observable<CharacterClassModel[]>;
  selectedClass: MenuSelectedClassModel = {index: -1, classData: null};
  @Output() classIconClicked = new EventEmitter();
  @Output() selectedClassSet = new EventEmitter();

  constructor(private charactersClassService: CharactersClassService, private store: Store<GuideState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.dispatch(fromSharedActions.loadShared());

    this.classesData$ = this.store.select(selectClassesData);
    this.route.queryParams.pipe(debounceTime(1000)).subscribe(params => {

      if (params.hasOwnProperty('class')) {
        this.setSelectedClassData(params.class.toLowerCase());
        this.selectedClassSet.emit(this.selectedClass);
      }
    });
  }

  onClassIconClick(classData: CharacterClassModel, index) {
    this.selectedClass.index = index;
    this.selectedClass.classData = classData;

    this.classIconClicked.emit(classData);
    //this.setSelectedClassData(classData.name);
  }

  private setSelectedClassData(classNameFromRoute: string) {
    let index = 0;
    this.classesData$.subscribe(data => {
      data.forEach(classData => {
        if (classData.name.toLowerCase() === classNameFromRoute) {
          this.selectedClass = {index: index, classData};
        }
        index++;
      });
    });
  }
}
