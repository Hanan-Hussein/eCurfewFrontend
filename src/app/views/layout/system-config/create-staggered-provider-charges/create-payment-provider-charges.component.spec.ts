import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStaggeredProviderChargesComponent } from './create-staggered-provider-charges.component';

describe('CreateStaggeredProviderChargesComponent', () => {
  let component: CreateStaggeredProviderChargesComponent;
  let fixture: ComponentFixture<CreateStaggeredProviderChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStaggeredProviderChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStaggeredProviderChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
