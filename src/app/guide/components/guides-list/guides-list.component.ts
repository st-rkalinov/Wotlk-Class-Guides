import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GuideService} from '../../guide.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DbGuideModel, GuideModel} from '../../guide.model';
import {MatSort} from '@angular/material/sort';
import {Observable, Subscription} from 'rxjs';
import {GuideState, selectGuides} from '../../store';
import {Store} from '@ngrx/store';
import {debounceTime, exhaustMap, map} from 'rxjs/operators';
import {ActivatedRoute, Route, Router} from '@angular/router';
import * as fromGuideActions from '../../store/guide.actions';

@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.scss']
})
export class GuidesListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['class', 'spec', 'author'];
  guidesDataSub: Subscription = new Subscription();
  dataSource = new MatTableDataSource<GuideModel>([]);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private guideService: GuideService, private store: Store<GuideState>, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.hasOwnProperty('spec')) {
        this.store.dispatch(fromGuideActions.loadGuides({className: params.class, spec: params.spec}));
      } else if (params.hasOwnProperty('class') && !params.hasOwnProperty('spec')) {
        this.store.dispatch(fromGuideActions.loadGuides({className: params.class, spec: undefined}));
      } else {
        this.store.dispatch(fromGuideActions.loadGuides({className: undefined, spec: undefined}));
      }

      this.guidesDataSub = this.store.select(selectGuides).subscribe(data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    });
  }

  filter($event) {
    this.dataSource.filter = $event.target.value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.guidesDataSub.unsubscribe();
  }
}
