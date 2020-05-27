import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WowBtnComponent } from './wow-btn.component';

describe('WowBtnComponent', () => {
  let component: WowBtnComponent;
  let fixture: ComponentFixture<WowBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WowBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WowBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
