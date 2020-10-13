import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpRequestsComponent } from './top-up-requests.component';

describe('TopUpRequestsComponent', () => {
  let component: TopUpRequestsComponent;
  let fixture: ComponentFixture<TopUpRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopUpRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
