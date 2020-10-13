import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityButtonsComponent } from './functionality-buttons.component';

describe('FunctionalityButtonsComponent', () => {
  let component: FunctionalityButtonsComponent;
  let fixture: ComponentFixture<FunctionalityButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalityButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalityButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
