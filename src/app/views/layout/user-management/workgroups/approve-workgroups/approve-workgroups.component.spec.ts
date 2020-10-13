import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWorkgroupsComponent } from './approve-workgroups.component';

describe('WorkgroupsComponent', () => {
  let component: ApproveWorkgroupsComponent;
  let fixture: ComponentFixture<ApproveWorkgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveWorkgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveWorkgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
