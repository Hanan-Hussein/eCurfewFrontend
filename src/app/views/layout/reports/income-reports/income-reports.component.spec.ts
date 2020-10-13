import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeReportsComponent } from './income-reports.component';

describe('IncomeReportsComponent', () => {
  let component: IncomeReportsComponent;
  let fixture: ComponentFixture<IncomeReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
