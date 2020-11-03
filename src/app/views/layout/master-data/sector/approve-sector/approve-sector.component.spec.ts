import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSectorComponent } from './approve-sector.component';

describe('ApproveSectorComponent', () => {
  let component: ApproveSectorComponent;
  let fixture: ComponentFixture<ApproveSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
