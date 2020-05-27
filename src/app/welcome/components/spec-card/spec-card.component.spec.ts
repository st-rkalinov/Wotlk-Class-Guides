import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecCardComponent } from './spec-card.component';

describe('SpecCardComponent', () => {
  let component: SpecCardComponent;
  let fixture: ComponentFixture<SpecCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
