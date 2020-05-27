import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-wow-modal',
  templateUrl: './wow-modal.component.html',
  styleUrls: ['./wow-modal.component.scss']
})
export class WowModalComponent implements OnInit, OnDestroy {
  public isVisible: boolean;
  public messageSubs: Subscription;
  public message: string;
  buttonStyles = { display: 'block', width: '40%', margin: '0 auto'};

  constructor(private authService: AuthService) {
    this.messageSubs = this.authService.error.asObservable().subscribe(result => {
      if (result) {
        this.message = result.message;
        this.isVisible = result.hasErrors;
      } else {
        this.message = '';
        this.isVisible = false;
      }
    });

    this.isVisible = false;
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.messageSubs.unsubscribe();
  }
}
