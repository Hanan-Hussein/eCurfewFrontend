import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerFeesComponent } from './create-customer-fees.component';

describe('CreateCustomerFeesComponent', () => {
  let component: CreateCustomerFeesComponent;
  let fixture: ComponentFixture<CreateCustomerFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomerFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
