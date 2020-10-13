import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePaymentProviderComponent } from './approve-payment-provider.component';

describe('ApprovePaymentProviderComponent', () => {
  let component: ApprovePaymentProviderComponent;
  let fixture: ComponentFixture<ApprovePaymentProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePaymentProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePaymentProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
