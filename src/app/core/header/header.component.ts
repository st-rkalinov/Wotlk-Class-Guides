import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {UserService} from '../../user/user.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectIsLoggedIn, selectUserDataNickname} from '../../auth/store';
import * as fromAuthActions from '../../auth/store/auth.actions';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService, private userService: UserService, private route: Router, private store: Store) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsLoggedIn);
  }

  onLogout() {
    this.store.dispatch(fromAuthActions.logout());
  }

  goToUserRoute() {
    this.store.select(selectUserDataNickname).pipe(take(1)).subscribe(nickname => {
      this.route.navigate(['/user/' + nickname]);
    });

  }

  goToNewGuideRoute() {
    this.route.navigate(['/guides/new']);
  }
}
