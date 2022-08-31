import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GastosService } from './gastos-service.service';

describe('GastosService', () => {
  let service: GastosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]});
    service = TestBed.inject(GastosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
