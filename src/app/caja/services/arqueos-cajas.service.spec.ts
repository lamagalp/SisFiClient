import { TestBed } from '@angular/core/testing';

import { ArqueosCajasService } from './arqueos-cajas.service';

describe('ArqueosCajasService', () => {
  let service: ArqueosCajasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArqueosCajasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
