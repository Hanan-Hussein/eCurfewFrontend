import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedPoliceOfficerComponent } from './locked-police-officer.component';

describe('LockedPoliceOfficerComponent', () => {
  let component: LockedPoliceOfficerComponent;
  let fixture: ComponentFixture<LockedPoliceOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockedPoliceOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedPoliceOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
