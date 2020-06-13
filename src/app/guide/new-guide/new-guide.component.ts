import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharactersClassService} from '../../services/characters-class.service';
import {CharacterClassModel} from '../../models/character-class.model';
import {Observable, Subscription} from 'rxjs';
import {GuideService} from '../guide.service';
import {GuideModel, Guide} from '../guide.model';
import {NewGuideService} from '../new-guide.service';
import {DbGemsModel} from '../../models/gems.model';
import {Store} from '@ngrx/store';
import {selectClassesData, SharedState} from '../../shared/store';
import * as fromGuideActions from '../store/guide.actions';
import * as fromSharedActions from '../../shared/store/shared.actions';
import {take} from 'rxjs/operators';
import {GuideState, selectAvailableGems} from '../store';
import {async} from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-new-guide',
  templateUrl: './new-guide.component.html',
  styleUrls: ['./new-guide.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewGuideComponent implements OnInit, OnDestroy {
  showErrors = false;
  newGuideForm: FormGroup;
  submitButtonStyles = { width: '100%', padding: '0.5rem 0', letterSpacing: '3px'};

  classesData$: Observable<CharacterClassModel[]>;
  gemsData$: Observable<DbGemsModel[]>;

  selectedClass = null;
  availableSpecs = null;
  defaultOptionValue = 'None';

  constructor(private fb: FormBuilder,
              private charactersClassService: CharactersClassService,
              private guideService: GuideService,
              private newGuideService: NewGuideService,
              private store: Store<SharedState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromSharedActions.loadShared());
    this.store.dispatch(fromGuideActions.loadAvailableGems());

    this.classesData$ = this.store.select(selectClassesData);
    this.gemsData$ = this.store.select(selectAvailableGems);

    this.newGuideForm = this.fb.group({
      class: [{value: this.defaultOptionValue, disabled: false},
        [Validators.required, this.newGuideService.classAndSpecCustomValidator(this.defaultOptionValue)]
      ],
      spec: [{value: this.defaultOptionValue, disabled: true},
        [Validators.required, this.newGuideService.classAndSpecCustomValidator(this.defaultOptionValue)]
      ],
      gems: this.fb.group({
        data: [[]],
        gemsComment: ['']
      })
    });
  }

  onClassSelect() {
    this.selectedClass = this.newGuideForm.get('class').value;

    this.classesData$.pipe(take(1)).subscribe(data =>
      data.forEach(value => {
        if (value.name === this.selectedClass) {
          this.availableSpecs = value.specs;
          return;
        }
      })
    );

    this.newGuideForm.get('spec').setValue(this.defaultOptionValue);
    this.newGuideForm.get('spec').enable();
  }

  onSubmit() {
    if (this.newGuideForm.invalid) {
      this.showErrors = true;
      return;
    }

    this.showErrors = false;
    const guideDataForSubmit: GuideModel = new Guide();
    const gemsByCategory = this.newGuideService.splitGemsByCategory(this.newGuideForm.get('gems.data').value);

    guideDataForSubmit.class = this.newGuideForm.get('class').value.toLowerCase();
    guideDataForSubmit.spec = this.newGuideForm.get('spec').value.toLowerCase();
    guideDataForSubmit.gems = gemsByCategory;
    guideDataForSubmit.gems.comment = this.newGuideForm.get('gems.gemsComment').value;

    this.newGuideService.addNewGuideToDatabase(Guide.parseForDB(guideDataForSubmit));
  }

  ngOnDestroy(): void {
  }
}
