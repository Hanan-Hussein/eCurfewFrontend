import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountOfficerComponent } from './add-account-officer.component';

describe('AddAccountOfficerComponent', () => {
  let component: AddAccountOfficerComponent;
  let fixture: ComponentFixture<AddAccountOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
