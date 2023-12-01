import { TestBed } from '@angular/core/testing';

import { EnseigantService } from './enseigant.service';

describe('EnseigantService', () => {
  let service: EnseigantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnseigantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
