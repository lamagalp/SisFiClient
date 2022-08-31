import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PagosPremioService } from './pagos-premio.service';

describe('PagosPremioService', () => {
  let service: PagosPremioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(PagosPremioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
