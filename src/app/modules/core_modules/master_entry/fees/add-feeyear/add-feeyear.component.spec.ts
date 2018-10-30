import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeyearComponent } from './add-feeyear.component';

describe('AddFeeyearComponent', () => {
  let component: AddFeeyearComponent;
  let fixture: ComponentFixture<AddFeeyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeeyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeeyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
