import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  authChangeSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authChangeSub = this.authService.authChange.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
