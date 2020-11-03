import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerStatusComponent } from './add-customer-status.component';

describe('AddCustomerStatusComponent', () => {
  let component: AddCustomerStatusComponent;
  let fixture: ComponentFixture<AddCustomerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
