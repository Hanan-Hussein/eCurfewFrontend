import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComplexityComponent } from './password-complexity.component';

describe('PasswordComplexityComponent', () => {
  let component: PasswordComplexityComponent;
  let fixture: ComponentFixture<PasswordComplexityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordComplexityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComplexityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
