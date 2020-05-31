import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CharacterClassModel} from '../../models/character-class.model';
import {MenuSelectedClassModel} from '../../models/menu-selected-class.model';

@Component({
  selector: 'app-classes-menu',
  templateUrl: './classes-menu.component.html',
  styleUrls: ['./classes-menu.component.scss']
})
export class ClassesMenuComponent implements OnInit {
  @Input() classesData;
  @Output() classIconClicked = new EventEmitter();
  @Input() selectedClass: MenuSelectedClassModel = {index: -1, classData: null};

  constructor() { }

  ngOnInit(): void {
  }

  onClassIconClick(classData: CharacterClassModel, index) {
    this.selectedClass.index = index;
    this.selectedClass.classData = classData;

    this.classIconClicked.emit(this.selectedClass);
  }
}
