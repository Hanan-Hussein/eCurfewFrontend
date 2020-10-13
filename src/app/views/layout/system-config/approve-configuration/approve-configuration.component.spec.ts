import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveConfigurationComponent } from './approve-configuration.component';

describe('ApproveConfigurationComponent', () => {
  let component: ApproveConfigurationComponent;
  let fixture: ComponentFixture<ApproveConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
