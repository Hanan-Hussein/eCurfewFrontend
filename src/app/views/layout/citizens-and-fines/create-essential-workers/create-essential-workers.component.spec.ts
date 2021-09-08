import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEssentialWorkersComponent } from './create-essential-workers.component';

describe('CreateEssentialWorkersComponent', () => {
  let component: CreateEssentialWorkersComponent;
  let fixture: ComponentFixture<CreateEssentialWorkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEssentialWorkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEssentialWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
