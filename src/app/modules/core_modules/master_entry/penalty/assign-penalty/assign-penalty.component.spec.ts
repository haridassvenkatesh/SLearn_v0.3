import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPenaltyComponent } from './assign-penalty.component';

describe('AssignPenaltyComponent', () => {
  let component: AssignPenaltyComponent;
  let fixture: ComponentFixture<AssignPenaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPenaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
