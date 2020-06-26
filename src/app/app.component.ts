import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromSharedActions from './shared/store/shared.actions';
import {Title} from '@angular/platform-browser';
import {selectPageTitle} from './shared/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wotlk-class-guides';

  constructor(private authService: AuthService, private store: Store, private titleService: Title) {
    this.authService.initAuthListener();
    this.store.select(selectPageTitle).subscribe(title => {
      this.titleService.setTitle(title);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(fromSharedActions.loadShared());
  }
}
