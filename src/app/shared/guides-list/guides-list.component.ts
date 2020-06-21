import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GuideService} from '../../guide/guide.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {GuideModel} from '../../guide/guide.model';
import {MatSort} from '@angular/material/sort';
import {GuideState} from '../../guide/store';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.scss']
})
export class GuidesListComponent implements OnInit, OnChanges {
  @Input() guides: GuideModel[];
  @Input() displayedColumns: string[] = ['class', 'spec', 'author'];
  dataSource = new MatTableDataSource<GuideModel>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private guideService: GuideService, private store: Store<GuideState>, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  goToGuidePage($event) {
    this.router.navigate(['/guides/' + $event.id]);
  }

  filter($event) {
    this.dataSource.filter = $event.target.value.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = changes.guides.currentValue;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
       if (property === 'author') {
        return item.author.nickname;
      } else {
        return item[property];
      }
    };
    this.dataSource.sort = this.sort;
  }
}
