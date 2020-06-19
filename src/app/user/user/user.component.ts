import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {first, take} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private router: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(param => {
      if (param.get('nickname')) {
        this.userService.fetchUserUidByNickname(param.get('nickname')).pipe(take(1)).subscribe(data => {
          console.log(data[0]);
        });
      }
    });
  }
}
