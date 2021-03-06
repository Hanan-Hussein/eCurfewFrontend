import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOfficerComponent } from './account-officer.component';

describe('AccountOfficerComponent', () => {
  let component: AccountOfficerComponent;
  let fixture: ComponentFixture<AccountOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
