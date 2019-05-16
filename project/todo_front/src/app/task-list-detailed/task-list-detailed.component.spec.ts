import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListDetailedComponent } from './task-list-detailed.component';

describe('TaskListDetailedComponent', () => {
  let component: TaskListDetailedComponent;
  let fixture: ComponentFixture<TaskListDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
