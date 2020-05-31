import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecMenuComponent } from './spec-menu.component';

describe('SpecMenuComponent', () => {
  let component: SpecMenuComponent;
  let fixture: ComponentFixture<SpecMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
