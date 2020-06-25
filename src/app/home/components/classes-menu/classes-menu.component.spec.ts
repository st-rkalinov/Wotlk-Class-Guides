import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassesMenuDropdownsComponent} from './classes-menu.component';

describe('ClassesMenuComponent', () => {
  let component: ClassesMenuDropdownsComponent;
  let fixture: ComponentFixture<ClassesMenuDropdownsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesMenuDropdownsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesMenuDropdownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
