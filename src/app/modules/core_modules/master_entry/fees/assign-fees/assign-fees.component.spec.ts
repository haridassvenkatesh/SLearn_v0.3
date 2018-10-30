import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFeesComponent } from './assign-fees.component';

describe('AssignFeesComponent', () => {
  let component: AssignFeesComponent;
  let fixture: ComponentFixture<AssignFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
