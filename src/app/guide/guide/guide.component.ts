import {Component, OnInit} from '@angular/core';
import {GuideService} from '../guide.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GuideModel} from '../guide.model';
import {skipWhile, switchMap, take} from 'rxjs/operators';
import {CharacterClassModel} from '../../models/character-class.model';
import {Store} from '@ngrx/store';
import {selectClassesData} from '../../shared/store';
import {UserService} from '../../user/user.service';
import {loadSelectedGuide, resetSelectedGuide} from '../store/guide.actions';
import {selectGuideStateError, selectSelectedGuide} from '../store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
  guideData: GuideModel;
  guideClassData: CharacterClassModel;
  error: Observable<any>;

  constructor(private guideService: GuideService, private route: ActivatedRoute, private store: Store, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(resetSelectedGuide({selectedGuide: undefined}));
    this.error = this.store.select(selectGuideStateError);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.store.dispatch(loadSelectedGuide({guideId: params.get('id')}));

        return this.store.select(selectSelectedGuide).pipe(
          skipWhile(data => data === undefined),
          take(1)
        );
      }),
      switchMap(selectedGuideData => {
        this.guideData = selectedGuideData;

        return this.store.select(selectClassesData).pipe(skipWhile(classesData => classesData === undefined), take(1));
      }),
    ).subscribe(classesData => {
      this.guideClassData = classesData.filter(classData => classData.name.toLowerCase() === this.guideData.class)[0];
    });
  }
}
