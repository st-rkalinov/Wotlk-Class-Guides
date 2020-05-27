import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WowModalComponent } from './wow-modal.component';

describe('WowModalComponent', () => {
  let component: WowModalComponent;
  let fixture: ComponentFixture<WowModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WowModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
