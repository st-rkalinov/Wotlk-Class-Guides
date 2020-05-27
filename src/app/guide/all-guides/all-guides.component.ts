import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharactersClassService} from '../../character-class/characters-class.service';
import {CharacterClassModel} from '../../character-class/character-class.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-all-guides',
  templateUrl: './all-guides.component.html',
  styleUrls: ['./all-guides.component.scss']
})
export class AllGuidesComponent implements OnInit, OnDestroy {
  classesData: CharacterClassModel[];
  classesDataSubscription = new Subscription();
  selectedClass: {index: number, classData?: CharacterClassModel} = {index: 0, classData: null};

  constructor(private charactersClassService: CharactersClassService, private router: Router) {
  }

  ngOnInit(): void {
    this.charactersClassService.fetchClassesData();
    this.classesDataSubscription = this.charactersClassService.classesDataChanged.subscribe(data => {
      this.classesData = data;
    });
  }

  loadSpecificClassGuides(data) {
    this.selectedClass = data;
    this.router.navigate(['/guides/' + this.selectedClass.classData.name.toLowerCase()]);
  }

  loadSpecificSpecGuides(event) {
    console.log(event);
    //this.router.navigate(['/guides/' + this.selectedClass.classData.name.toLowerCase()]);
  }

  ngOnDestroy(): void {
  }

}
