import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {UserAdditionalDataModel} from '../../models/user-additionalData.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  userAdditionalData: UserAdditionalDataModel;
  userAdditionalDataSub: Subscription;
  authChangeSub: Subscription;


  constructor(private authService: AuthService, private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.authChangeSub = this.authService.authChange.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    this.userAdditionalDataSub = this.userService.userAdditionalDataChange.subscribe(data => {
      this.userAdditionalData = data;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  goToNewGuideRoute() {
    this.route.navigate(['/guides/new']);
  }

  ngOnDestroy(): void {
    if(this.authChangeSub) {
      this.authChangeSub.unsubscribe();
    }
    if(this.userAdditionalDataSub) {
      this.userAdditionalDataSub.unsubscribe();
    }
  }
}
