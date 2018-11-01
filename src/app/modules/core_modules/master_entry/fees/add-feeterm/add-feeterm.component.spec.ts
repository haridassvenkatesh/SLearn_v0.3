import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeetermComponent } from './add-feeterm.component';

describe('AddFeetermComponent', () => {
  let component: AddFeetermComponent;
  let fixture: ComponentFixture<AddFeetermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeetermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeetermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
