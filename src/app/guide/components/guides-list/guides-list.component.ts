import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GuideService} from '../../guide.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {GuideModel} from '../../guide.model';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.scss']
})
export class GuidesListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['class', 'spec'];
  guidesData: GuideModel[];
  guidesDataSub: Subscription = new Subscription();
  dataSource = new MatTableDataSource<GuideModel>();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private guideService: GuideService) { }

  ngOnInit(): void {
    this.guidesDataSub = this.guideService.guidesChanged.subscribe(data => {
      this.guidesData = data;
      this.dataSource.data = this.guidesData;
    });
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  filter($event) {
    this.dataSource.filter = $event.target.value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.guidesDataSub.unsubscribe();
  }
}
