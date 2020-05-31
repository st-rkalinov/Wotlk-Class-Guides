import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DbCharacterClassSpecModel} from '../../../models/character-class-spec.model';

@Component({
  selector: 'app-spec-menu',
  templateUrl: './spec-menu.component.html',
  styleUrls: ['./spec-menu.component.scss']
})
export class SpecMenuComponent implements OnInit {
  @Input() specsData: DbCharacterClassSpecModel[];
  @Output() specBlockClicked = new EventEmitter();
  @Input() selectedSpec: {index: number, specData?: DbCharacterClassSpecModel} = {index: -1, specData: null};

  constructor() { }

  onSpecBlockClick(specData, index) {
    this.selectedSpec.index = index;
    this.selectedSpec.specData = specData;

    this.specBlockClicked.emit(this.selectedSpec);
  }

  ngOnInit(): void {
  }

}
