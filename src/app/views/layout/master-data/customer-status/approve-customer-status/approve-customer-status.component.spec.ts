import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCustomerStatusComponent } from './approve-customer-status.component';

describe('ApproveCustomerStatusComponent', () => {
  let component: ApproveCustomerStatusComponent;
  let fixture: ComponentFixture<ApproveCustomerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCustomerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCustomerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
