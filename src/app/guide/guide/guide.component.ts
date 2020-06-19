import {Component, OnInit} from '@angular/core';
import {GuideService} from '../guide.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DbGuideModel, GuideModel} from '../guide.model';
import {map, switchMap, take} from 'rxjs/operators';
import {CharacterClassModel} from '../../models/character-class.model';
import {Store} from '@ngrx/store';
import {selectClassesData} from '../../shared/store';
import {Observable, ObservableInput} from 'rxjs';
import {UserService} from '../../user/user.service';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
  guideData: GuideModel;
  guideClassData: CharacterClassModel;
  constructor(private guideService: GuideService, private route: ActivatedRoute, private store: Store, private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.guideService.fetchGuide(params.get('id')).pipe(
          take(1),
          switchMap((result: DbGuideModel) => {
            return this.userService.fetchUserAdditionalData(result.author_id).pipe(
              take(1),
              map((user: UserAdditionalDataModel) => {
                this.guideData = {
                  id: params.get('id'),
                  class: result.class,
                  spec: result.spec,
                  gems: result.gems,
                  author: { uid: result.author_id, nickname: user[0].nickname },
                  macros: result.macros
                };
              })
            );
          }),
        );
      }),
      switchMap(() => {
        return this.store.select(selectClassesData).pipe(take(1));
      })
    ).subscribe(classesData => {
        this.guideClassData = classesData.filter(classData => classData.name.toLowerCase() === this.guideData.class)[0];
    });
  }

}
