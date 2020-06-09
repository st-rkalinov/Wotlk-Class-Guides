import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectError} from '../../auth/store';
import {resetError} from '../../auth/store/auth.actions';

@Component({
  selector: 'app-wow-modal',
  templateUrl: './wow-modal.component.html',
  styleUrls: ['./wow-modal.component.scss']
})
export class WowModalComponent implements OnInit, OnDestroy {
  buttonStyles = { display: 'block', width: '40%', margin: '0 auto'};
  public message$: Observable<string>;

  constructor(private authService: AuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.message$ = this.store.select(selectError);
  }

  closeModal(): void {
    this.store.dispatch(resetError({error: undefined}));
  }

  ngOnDestroy(): void {
  }
}
