import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassesSpecsComponent} from './classes-specs.component';

describe('ClassesSpecsComponent', () => {
  let component: ClassesSpecsComponent;
  let fixture: ComponentFixture<ClassesSpecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesSpecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
