import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateforexComponent } from './createforex.component';

describe('CreateforexComponent', () => {
  let component: CreateforexComponent;
  let fixture: ComponentFixture<CreateforexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateforexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateforexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
