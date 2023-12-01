import { TestBed } from '@angular/core/testing';

import { TypeBanqueService } from './type-banque.service';

describe('TypeBanqueService', () => {
  let service: TypeBanqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeBanqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
