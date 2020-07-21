import {Component, OnInit} from '@angular/core';
import {CharacterClassModel} from '../../../models/character-class.model';
import {MenuSelectedClassModel} from '../../../models/menu-selected-class.model';
import {Store} from '@ngrx/store';
import {GuideState} from '../../store';
import {SharedDataService} from '../../../shared/shared-data.service';

import {selectClassesData} from '../../../shared/store';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {MenuSelectedSpecModel} from '../../../models/menu-selected-spec.model';
import {DbCharacterClassSpecModel} from '../../../models/character-class-spec.model';

@Component({
  selector: 'app-classes-menu-dropdowns',
  templateUrl: './classes-menu-dropdowns.component.html',
  styleUrls: ['./classes-menu-dropdowns.component.scss']
})
export class ClassesMenuDropdownsComponent implements OnInit {
  classesData: CharacterClassModel[];
  selectedClass: MenuSelectedClassModel = {index: -1, classData: null};
  selectedSpec: MenuSelectedSpecModel = {index: -1, specData: null};
  constructor(private charactersClassService: SharedDataService, private store: Store<GuideState>, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(selectClassesData)
      .pipe(take(2))
      .subscribe(data => {
        if (data) {
          this.classesData = data;

          this.route.queryParams.subscribe(params => {
            params.hasOwnProperty('class') ? this.setSelectedClassData(params.class) : this.resetClassSpecData('class');
            params.hasOwnProperty('spec') ? this.setSelectedSpecData(params.spec) : this.resetClassSpecData('spec');
          });
        }

    });
  }

  loadSpecificClassGuides(classData: CharacterClassModel) {
    this.router.navigate(['/guides'], {
      queryParams: {
        class: classData.name.toLowerCase()
      }
    });

    window.scrollTo(0, document.body.scrollHeight);
  }

  loadSpecificSpecGuides(className: string, spec: DbCharacterClassSpecModel) {
    this.router.navigate(['/guides'], {
      queryParams: {
        class: className.toLowerCase(),
        spec: spec.name.toLowerCase()
      }
    });

    window.scrollTo(0, document.body.scrollHeight);
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
    for (const classData of this.classesData) {
      if (classData.name.toLowerCase() === classNameFromRoute) {
        this.selectedClass = {index: this.classesData.indexOf(classData), classData};
        break;
      }
    }
  }

  private resetClassSpecData(type: string) {
    type === 'class' ? this.selectedClass = {index: -1, classData: null} : this.selectedSpec = {index: -1, specData: null};
  }
}
