import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEssentialWorkersComponent } from './list-essential-workers.component';

describe('ListEssentialWorkersComponent', () => {
  let component: ListEssentialWorkersComponent;
  let fixture: ComponentFixture<ListEssentialWorkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEssentialWorkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEssentialWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
