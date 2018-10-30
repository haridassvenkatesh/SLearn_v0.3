import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPenaltyComponent } from './edit-penalty.component';

describe('EditPenaltyComponent', () => {
  let component: EditPenaltyComponent;
  let fixture: ComponentFixture<EditPenaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPenaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
