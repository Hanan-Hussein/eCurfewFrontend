import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstChangeComponent } from './first-change.component';

describe('FirstChangeComponent', () => {
  let component: FirstChangeComponent;
  let fixture: ComponentFixture<FirstChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
