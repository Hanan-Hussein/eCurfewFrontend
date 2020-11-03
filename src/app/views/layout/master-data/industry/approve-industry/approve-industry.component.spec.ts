import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveIndustryComponent } from './approve-industry.component';

describe('ApproveIndustryComponent', () => {
  let component: ApproveIndustryComponent;
  let fixture: ComponentFixture<ApproveIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveIndustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
