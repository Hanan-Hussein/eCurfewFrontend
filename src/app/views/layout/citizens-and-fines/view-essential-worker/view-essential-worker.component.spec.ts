import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEssentialWorkerComponent } from './view-essential-worker.component';

describe('ViewEssentialWorkerComponent', () => {
  let component: ViewEssentialWorkerComponent;
  let fixture: ComponentFixture<ViewEssentialWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEssentialWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEssentialWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
