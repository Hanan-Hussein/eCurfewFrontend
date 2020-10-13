import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionConfigurationsComponent } from './commission-configurations.component';

describe('CommissionConfigurationsComponent', () => {
  let component: CommissionConfigurationsComponent;
  let fixture: ComponentFixture<CommissionConfigurationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionConfigurationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
