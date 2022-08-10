import { TestBed } from '@angular/core/testing';

import { FiadosService } from './fiados.service';

describe('FiadosService', () => {
  let service: FiadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
