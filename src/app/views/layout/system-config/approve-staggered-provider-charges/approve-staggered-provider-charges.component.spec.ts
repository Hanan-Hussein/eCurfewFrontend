import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveStaggeredProviderChargesComponent } from './approve-staggered-provider-charges.component';

describe('ApproveStaggeredProviderChargesComponent', () => {
  let component: ApproveStaggeredProviderChargesComponent;
  let fixture: ComponentFixture<ApproveStaggeredProviderChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveStaggeredProviderChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveStaggeredProviderChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
