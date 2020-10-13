import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmerchantsComponent } from './listmerchants.component';

describe('ListmerchantsComponent', () => {
  let component: ListmerchantsComponent;
  let fixture: ComponentFixture<ListmerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
