import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GuideService} from '../../guide.service';

@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.scss']
})
export class GuidesListComponent implements OnInit {
  @Input() guidesData: object[];

  constructor(private guideService: GuideService) { }

  ngOnInit(): void {}
}
