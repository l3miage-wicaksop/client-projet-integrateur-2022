import { TestBed } from '@angular/core/testing';

import { DefiService } from './defi.service';

describe('DefiService', () => {
  let service: DefiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
