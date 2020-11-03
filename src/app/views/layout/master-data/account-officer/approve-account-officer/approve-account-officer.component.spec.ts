import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAccountOfficerComponent } from './approve-account-officer.component';

describe('ApproveAccountOfficerComponent', () => {
  let component: ApproveAccountOfficerComponent;
  let fixture: ComponentFixture<ApproveAccountOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAccountOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAccountOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
