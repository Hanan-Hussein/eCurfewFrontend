import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchConfigsComponent } from './switch-configs.component';

describe('SwitchConfigsComponent', () => {
  let component: SwitchConfigsComponent;
  let fixture: ComponentFixture<SwitchConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
