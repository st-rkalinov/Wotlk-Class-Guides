import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificGuidesComponent } from './specific-guides.component';

describe('ClassGuidesComponent', () => {
  let component: SpecificGuidesComponent;
  let fixture: ComponentFixture<SpecificGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
