import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsDashboardComponent } from './parents-dashboard.component';

describe('ParentsDashboardComponent', () => {
  let component: ParentsDashboardComponent;
  let fixture: ComponentFixture<ParentsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
