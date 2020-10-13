import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantFeesComponent } from './merchant-fees.component';

describe('MerchantFeesComponent', () => {
  let component: MerchantFeesComponent;
  let fixture: ComponentFixture<MerchantFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
