import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesListComponent } from './guides-list.component';

describe('AllGuidesComponent', () => {
  let component: GuidesListComponent;
  let fixture: ComponentFixture<GuidesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
