import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CharactersClassService} from '../../services/characters-class.service';
import {CharacterClassModel} from '../../models/character-class.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {GuideService} from '../guide.service';
import {GuideModel, Guide} from '../guide.model';
import {DbGemModel} from '../../models/gem.model';
import {NewGuideService} from '../new-guide.service';
import {DbGuideGemsModel, GemsByCategory, GuideGems} from '../../models/gems.model';

@Component({
  selector: 'app-new-guide',
  templateUrl: './new-guide.component.html',
  styleUrls: ['./new-guide.component.scss']
})
export class NewGuideComponent implements OnInit, OnDestroy {
  newGuideForm: FormGroup;

  classesData: CharacterClassModel[];
  classesDataSubs = new Subscription();

  gemsData: DbGuideGemsModel;
  gemsDataSubs = new Subscription();

  selectedClass = null;
  availableSpecs = null;
  defaultOptionValue = 'None';

  constructor(private fb: FormBuilder, private charactersClassService: CharactersClassService, private guideService: GuideService, private newGuideService: NewGuideService) {
    this.charactersClassService.fetchClassesData();
    this.newGuideService.fetchAvailableGems();

    this.classesDataSubs = this.charactersClassService.classesDataChanged.subscribe(data => {
      this.classesData = data;
    });
    this.gemsDataSubs = this.newGuideService.gemsChanged.subscribe(data => {
      this.gemsData = data;
    });

    this.newGuideForm = this.fb.group({
      class: [{value: this.defaultOptionValue, disabled: false},
        [Validators.required, this.newGuideService.classAndSpecCustomValidator(this.defaultOptionValue)]
      ],
      spec: [{value: this.defaultOptionValue, disabled: true},
        [Validators.required, this.newGuideService.classAndSpecCustomValidator(this.defaultOptionValue)]
      ],
      gems: this.fb.group({
        red: this.fb.array([]),
        blue: this.fb.array([]),
        yellow: this.fb.array([]),
        comment: ''
      }),
    });
  }

  ngOnInit(): void {
    this.gemsData = new GuideGems();
  }

  onClassSelect() {
    this.selectedClass = this.newGuideForm.get('class').value;

    this.classesData.forEach(value => {
      if (value.name === this.selectedClass) {
        this.availableSpecs = value.specs;
        return;
      }
    });

    this.newGuideForm.get('spec').setValue(this.defaultOptionValue);
    this.newGuideForm.get('spec').enable();
  }

  onCheckboxChange(e) {
    const gemsDataGroup  = this.newGuideForm.get('gems') as FormGroup;
    const gemCategory = e.target.getAttribute('data-category');

    if (e.target.checked) {
      (this.gemsData[gemCategory] as Array<DbGemModel>).forEach(value => {
        if (value.name === e.target.value) {
          (gemsDataGroup.controls[gemCategory] as FormArray).push(new FormControl(value));
        }
      });
    } else {
      let i = 0;

      (gemsDataGroup.controls[gemCategory] as FormArray).controls.forEach((item: FormControl) => {
        if (item.value['name'] === e.target.value) {
          (gemsDataGroup.controls[gemCategory] as FormArray).removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  onSubmit() {
    const guideDataForSubmit: GuideModel = new Guide();

    guideDataForSubmit.class = this.newGuideForm.get('class').value.toLowerCase();
    guideDataForSubmit.spec = this.newGuideForm.get('spec').value.toLowerCase();
    guideDataForSubmit.gems = this.newGuideForm.get('gems').value;

    if (this.newGuideForm.valid) {
      this.newGuideService.addNewGuideToDatabase(Guide.parseForDB(guideDataForSubmit));
    }
  }

  ngOnDestroy(): void {
    if (this.classesDataSubs) {
      this.classesDataSubs.unsubscribe();
    }
    if (this.gemsDataSubs) {
      this.gemsDataSubs.unsubscribe();
    }
  }
}
