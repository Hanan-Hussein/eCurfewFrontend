import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFeesComponent } from './customer-fees.component';

describe('CustomerFeesComponent', () => {
  let component: CustomerFeesComponent;
  let fixture: ComponentFixture<CustomerFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
