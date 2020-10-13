import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePaymentProviderChargesComponent } from './approve-payment-provider-charges.component';

describe('ApprovePaymentProviderChargesComponent', () => {
  let component: ApprovePaymentProviderChargesComponent;
  let fixture: ComponentFixture<ApprovePaymentProviderChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePaymentProviderChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePaymentProviderChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
