import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {Store} from '@ngrx/store';
import * as fromUserActions from '../store/user.actions';
import {take} from 'rxjs/operators';
import {GuideModel} from '../../guide/guide.model';
import {selectUserGuides} from '../store';
import {setPageTitle} from '../../shared/store/shared.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  guides: GuideModel[];

  constructor(private router: ActivatedRoute, private userService: UserService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(setPageTitle({pageTitle: 'Ultimate Guides - Your Guides'}));
    this.router.paramMap.pipe(take(1)).subscribe(params => {
      this.store.dispatch(fromUserActions.loadUserGuides({nickname: params.get('nickname')}));

      this.store.select(selectUserGuides).pipe(take(3)).subscribe(data => {
        this.guides = data;
      });
    });
  }
}
