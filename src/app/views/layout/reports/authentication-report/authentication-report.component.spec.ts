import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationReportComponent } from './authentication-report.component';

describe('AuthenticationReportComponent', () => {
  let component: AuthenticationReportComponent;
  let fixture: ComponentFixture<AuthenticationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
