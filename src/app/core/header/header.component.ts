import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectIsLoggedIn} from '../../auth/store';
import * as fromAuthActions from '../../auth/store/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAdditionalData: UserAdditionalDataModel;
  userAdditionalDataSub: Subscription;
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService, private userService: UserService, private route: Router, private store: Store) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsLoggedIn);

    this.userAdditionalDataSub = this.userService.userAdditionalDataChange.subscribe(data => {
      this.userAdditionalData = data;
    });
  }

  onLogout() {
    this.store.dispatch(fromAuthActions.logout());
  }

  goToNewGuideRoute() {
    this.route.navigate(['/guides/new']);
  }

  ngOnDestroy(): void {
    if(this.userAdditionalDataSub) {
      this.userAdditionalDataSub.unsubscribe();
    }
  }
}
