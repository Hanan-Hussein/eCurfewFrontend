import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePoliceOfficerComponent } from './approve-police-officer.component';

describe('ApprovePoliceOfficerComponent', () => {
  let component: ApprovePoliceOfficerComponent;
  let fixture: ComponentFixture<ApprovePoliceOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePoliceOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePoliceOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
