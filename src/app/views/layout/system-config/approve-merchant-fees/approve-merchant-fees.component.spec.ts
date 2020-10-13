import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMerchantFeesComponent } from './approve-merchant-fees.component';

describe('ApproveMerchantFeesComponent', () => {
  let component: ApproveMerchantFeesComponent;
  let fixture: ComponentFixture<ApproveMerchantFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveMerchantFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMerchantFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
