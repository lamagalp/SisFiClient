import { HttpClientTestingModule }from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GastosService } from './gastos-service.service';

describe('GastosService', () => {
  let service: GastosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]});
    service = TestBed.inject(GastosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
