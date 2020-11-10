import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateTransactionComponent } from './authenticate-transaction.component';

describe('AuthenticateTransactionComponent', () => {
  let component: AuthenticateTransactionComponent;
  let fixture: ComponentFixture<AuthenticateTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticateTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
