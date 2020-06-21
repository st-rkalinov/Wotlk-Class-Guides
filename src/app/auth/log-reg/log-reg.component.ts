import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.scss']
})
export class LogRegComponent implements OnInit {
  isLoginRoute = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.router.url === '/auth/signup') {
      this.isLoginRoute = false;
    }
  }
}
