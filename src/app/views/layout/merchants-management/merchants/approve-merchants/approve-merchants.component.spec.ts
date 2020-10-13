import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMerchantsComponent } from './approve-merchants.component';

describe('ApproveMerchantsComponent', () => {
  let component: ApproveMerchantsComponent;
  let fixture: ComponentFixture<ApproveMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
