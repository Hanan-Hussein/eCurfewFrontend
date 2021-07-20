import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRankComponent } from './add-rank.component';

describe('AddRankComponent', () => {
  let component: AddRankComponent;
  let fixture: ComponentFixture<AddRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
