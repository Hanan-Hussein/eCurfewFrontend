import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCurrencyComponent } from './approve-currency.component';

describe('ApproveCurrencyComponent', () => {
  let component: ApproveCurrencyComponent;
  let fixture: ComponentFixture<ApproveCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
