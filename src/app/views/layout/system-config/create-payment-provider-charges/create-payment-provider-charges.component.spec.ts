import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentProviderChargesComponent } from './create-payment-provider-charges.component';

describe('CreatePaymentProviderChargesComponent', () => {
  let component: CreatePaymentProviderChargesComponent;
  let fixture: ComponentFixture<CreatePaymentProviderChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePaymentProviderChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentProviderChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
