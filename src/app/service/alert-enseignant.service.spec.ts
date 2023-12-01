import { TestBed } from '@angular/core/testing';

import { AlertEnseignantService } from './alert-enseignant.service';

describe('AlertEnseignantService', () => {
  let service: AlertEnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertEnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
