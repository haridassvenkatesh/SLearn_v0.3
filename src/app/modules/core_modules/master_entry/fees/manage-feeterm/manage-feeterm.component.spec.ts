import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeetermComponent } from './manage-feeterm.component';

describe('ManageFeetermComponent', () => {
  let component: ManageFeetermComponent;
  let fixture: ComponentFixture<ManageFeetermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFeetermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeetermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
