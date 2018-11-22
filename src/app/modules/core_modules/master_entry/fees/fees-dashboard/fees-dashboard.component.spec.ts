import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesDashboardComponent } from './fees-dashboard.component';

describe('FeesDashboardComponent', () => {
  let component: FeesDashboardComponent;
  let fixture: ComponentFixture<FeesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
