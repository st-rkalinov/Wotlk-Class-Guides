import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromGuideActions from '../store/guide.actions';
import {GuideModel} from '../guide.model';
import {selectGuides} from '../store';
import {skip, take} from 'rxjs/operators';
import {selectIsLoading} from '../../shared/store';
import {setLoading} from '../../shared/store/shared.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-all-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss']
})
export class GuidesComponent implements OnInit, OnDestroy {
  guides: GuideModel[];
  isLoading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
     this.isLoading$ = this.store.select(selectIsLoading);

     this.route.queryParams.subscribe(params => {
       this.store.dispatch(setLoading());
       if (params.hasOwnProperty('spec')) {
         this.store.dispatch(fromGuideActions.loadGuides({className: params.class, spec: params.spec}));
       } else if (params.hasOwnProperty('class') && !params.hasOwnProperty('spec')) {
         this.store.dispatch(fromGuideActions.loadGuides({className: params.class, spec: undefined}));
       } else {
         this.store.dispatch(fromGuideActions.loadGuides({className: undefined, spec: undefined}));
       }

       this.store.select(selectGuides).pipe(
         skip(1),
         take(1)).subscribe(
           data => {
              this.guides = data;
            }
       );
     });
  }

  ngOnDestroy(): void {
  }
}
