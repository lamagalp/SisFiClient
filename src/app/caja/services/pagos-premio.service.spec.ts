import { HttpClientTestingModule }from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PagosPremioService } from './pagos-premio.service';

describe('PagosPremioService', () => {
  let service: PagosPremioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(PagosPremioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
