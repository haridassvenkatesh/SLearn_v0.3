import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeetypeComponent } from './add-feetype.component';

describe('AddFeetypeComponent', () => {
  let component: AddFeetypeComponent;
  let fixture: ComponentFixture<AddFeetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
