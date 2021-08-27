import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePoliceOfficerComponent } from './create-police-officer.component';

describe('CreatePoliceOfficerComponent', () => {
  let component: CreatePoliceOfficerComponent;
  let fixture: ComponentFixture<CreatePoliceOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePoliceOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePoliceOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
