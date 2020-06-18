import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CharactersClassService} from '../../../services/characters-class.service';
import {CharacterClassModel} from '../../../models/character-class.model';
import {MenuSelectedClassModel} from '../../../models/menu-selected-class.model';
import {GuideState} from '../../../guide/store';
import {selectClassesData} from '../../../shared/store';
import * as fromSharedActions from '../../../shared/store/shared.actions';

@Component({
  selector: 'app-classes-menu',
  templateUrl: './classes-menu.component.html',
  styleUrls: ['./classes-menu.component.scss']
})
export class ClassesMenuComponent implements OnInit {
  classesData$: Observable<CharacterClassModel[]>;
  selectedClass: MenuSelectedClassModel = {index: -1, classData: null};

  @Output() classIconClicked = new EventEmitter();

  constructor(private charactersClassService: CharactersClassService, private store: Store<GuideState>) { }

  ngOnInit(): void {
    this.classesData$ = this.store.select(selectClassesData);
  }

  onClassIconClick(classData: CharacterClassModel, index: number) {
    this.selectedClass = {index, classData};

    this.classIconClicked.emit(classData);
  }
}
