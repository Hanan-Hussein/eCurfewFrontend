import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRolesComponent } from './approve-roles.component';

describe('RolesComponent', () => {
  let component: ApproveRolesComponent;
  let fixture: ComponentFixture<ApproveRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
