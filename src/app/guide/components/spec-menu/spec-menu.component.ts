import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DbCharacterClassSpecModel} from '../../../models/character-class-spec.model';
import {ActivatedRoute} from '@angular/router';
import {SharedState} from '../../../shared/store';
import {Store} from '@ngrx/store';
import {debounceTime, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-spec-menu',
  templateUrl: './spec-menu.component.html',
  styleUrls: ['./spec-menu.component.scss']
})
export class SpecMenuComponent implements OnInit {
  @Input() specsData: DbCharacterClassSpecModel[];
  @Output() specBlockClicked = new EventEmitter();
  @Input() selectedSpec: {index: number, specData?: DbCharacterClassSpecModel} = {index: -1, specData: null};

  constructor(private route: ActivatedRoute, private store: Store<SharedState>) { }

  onSpecBlockClick(specData, index) {
    this.selectedSpec.index = index;
    this.selectedSpec.specData = specData;

    this.specBlockClicked.emit(this.selectedSpec);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.hasOwnProperty('spec')) {
        this.setSelectedSpecData(params.spec.toLowerCase());
      } else {
        this.selectedSpec = {index: -1, specData: null};
      }
    });
  }

  private setSelectedSpecData(specNameFromRoute: string) {
    let index = 0;
    for (const spec of this.specsData) {
      if (spec.name.toLowerCase() === specNameFromRoute) {
        this.selectedSpec = {index, specData: spec};
      }
      index++;
    }
  }

}
