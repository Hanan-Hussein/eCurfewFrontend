import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemerchantsComponent } from './createmerchants.component';

describe('CreatemerchantsComponent', () => {
  let component: CreatemerchantsComponent;
  let fixture: ComponentFixture<CreatemerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatemerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
