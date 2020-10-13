import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaggeredProviderChargesComponent } from './staggered-provider-charges.component';

describe('StaggeredProviderChargesComponent', () => {
  let component: StaggeredProviderChargesComponent;
  let fixture: ComponentFixture<StaggeredProviderChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaggeredProviderChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaggeredProviderChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
