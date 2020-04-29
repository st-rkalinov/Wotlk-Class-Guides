import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGuidesComponent } from './all-guides.component';

describe('AllGuidesComponent', () => {
  let component: AllGuidesComponent;
  let fixture: ComponentFixture<AllGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
