import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProviderChargesComponent } from './payment-provider-charges.component';

describe('PaymentProviderChargesComponent', () => {
  let component: PaymentProviderChargesComponent;
  let fixture: ComponentFixture<PaymentProviderChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentProviderChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentProviderChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
