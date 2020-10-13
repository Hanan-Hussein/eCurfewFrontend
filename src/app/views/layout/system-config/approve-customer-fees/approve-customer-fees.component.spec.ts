import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCustomerFeesComponent } from './approve-customer-fees.component';

describe('ApproveCustomerFeesComponent', () => {
  let component: ApproveCustomerFeesComponent;
  let fixture: ComponentFixture<ApproveCustomerFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCustomerFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCustomerFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
