import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wow-btn',
  templateUrl: './wow-btn.component.html',
  styleUrls: ['./wow-btn.component.scss']
})
export class WowBtnComponent implements OnInit {
  @Input() btnType: string;
  @Input() btnText: string;

  constructor() {
    this.btnType = 'submit';
    this.btnText = 'Login';
  }

  ngOnInit(): void {
  }
}
