import { TestBed } from '@angular/core/testing';

import { DtServiceService } from './dt-service.service';

describe('DtServiceService', () => {
  let service: DtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
