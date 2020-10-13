import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMerchantFeesComponent } from './create-merchant-fees.component';

describe('CreateMerchantFeesComponent', () => {
  let component: CreateMerchantFeesComponent;
  let fixture: ComponentFixture<CreateMerchantFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMerchantFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMerchantFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
