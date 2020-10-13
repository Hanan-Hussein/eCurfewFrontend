import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemIntegrationsComponent } from './system-integrations.component';

describe('SystemIntegrationsComponent', () => {
  let component: SystemIntegrationsComponent;
  let fixture: ComponentFixture<SystemIntegrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemIntegrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
