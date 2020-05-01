import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GuideService} from '../guide.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-class-guides',
  templateUrl: './specific-guides.component.html',
  styleUrls: ['./specific-guides.component.scss']
})
export class SpecificGuidesComponent implements OnInit, OnDestroy {
  guidesData: object[];
  guidesDataSubs: Subscription = new Subscription();

  constructor(private guideService: GuideService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('className') && !params.get('specName')) {
        this.guideService.fetchSpecificClassGuides(params.get('className'));
      } else if (params.get('specName')) {
        this.guideService.fetchSpecificSpecGuides(params.get('className'), params.get('specName'));
      } else {
        this.guideService.fetchAllGuides();
      }
    });

    this.guidesDataSubs = this.guideService.guidesChanged.subscribe(data => {
      this.guidesData = data;
    });
  }

  ngOnDestroy(): void {
    this.guidesDataSubs.unsubscribe();
  }
}
