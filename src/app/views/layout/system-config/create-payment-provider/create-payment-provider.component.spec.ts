import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentProviderComponent } from './create-payment-provider.component';

describe('CreatePaymentProviderComponent', () => {
  let component: CreatePaymentProviderComponent;
  let fixture: ComponentFixture<CreatePaymentProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePaymentProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
