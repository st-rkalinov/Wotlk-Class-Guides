import {Component, OnDestroy, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-all-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss']
})
export class GuidesComponent implements OnInit, OnDestroy {
  selectedClass: MenuSelectedClassModel = {index: -1, classData: null};
  selectedSpec: MenuSelectedSpecModel = {index: -1, specData: null};

  classesData: CharacterClassModel[];
  guidesData: GuideModel[];

  classesDataSubscription = new Subscription();
  guidesDataSub: Subscription = new Subscription();

  constructor(private charactersClassService: CharactersClassService,
              private guideService: GuideService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.guidesDataSub = this.guideService.guidesChanged.subscribe(data => {
      this.guidesData = data;
    });

    this.classesDataSubscription = this.charactersClassService.classesDataChanged.asObservable().pipe(
      exhaustMap(data => {
        this.classesData = data;
        return this.route.queryParams;
      })
    ).subscribe(params => {
      if (params.hasOwnProperty('class') && !params.hasOwnProperty('spec')) {
        this.selectedSpec = {index: -1, specData: null};
        this.setSelectedClassData(params.class, this.classesData);
        this.guideService.fetchSpecificClassGuides(params.class);
      } else if (params.hasOwnProperty('class') && params.hasOwnProperty('spec')) {
        this.setSelectedClassData(params.class, this.classesData);
        this.setSelectedSpecData(params.spec, this.selectedClass.classData.specs);
        this.guideService.fetchSpecificSpecGuides(params.class, params.spec);
      } else {
        this.selectedSpec = {index: -1, specData: null};
        this.selectedClass = {index: -1, classData: null};
        this.guideService.fetchAllGuides();
      }
    });

    this.charactersClassService.fetchClassesData();
  }

  private setSelectedClassData(classNameFromRoute: string, classesData: CharacterClassModel[]) {
    for (const classData of classesData) {
      if (classNameFromRoute === classData.name.toLowerCase()) {
        this.selectedClass = {index: classesData.indexOf(classData), classData};
        break;
      }
    }
  }

  private setSelectedSpecData(specNameFromRoute: string, specsData: DbCharacterClassSpecModel[]) {
    for (const specData of specsData) {
      if (specNameFromRoute === specData.name.toLowerCase()) {
        this.selectedSpec = {index: specsData.indexOf(specData), specData};
        break;
      }
    }
  }

  loadSpecificClassGuides() {
    this.router.navigate(['/guides'], {queryParams: {class: this.selectedClass.classData.name.toLowerCase()}});
  }

  loadSpecificSpecGuides() {
    this.router.navigate(['/guides'], {
      queryParams: {
        class: this.selectedClass.classData.name.toLowerCase(),
        spec: this.selectedSpec.specData.name.toLowerCase()
      }
    });
  }

  ngOnDestroy(): void {
    this.guidesDataSub.unsubscribe();
    this.classesDataSubscription.unsubscribe();
  }
}
