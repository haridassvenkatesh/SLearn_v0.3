import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAttendanceManageComponent } from './students-attendance-manage.component';

describe('StudentsAttendanceManageComponent', () => {
  let component: StudentsAttendanceManageComponent;
  let fixture: ComponentFixture<StudentsAttendanceManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsAttendanceManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsAttendanceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
