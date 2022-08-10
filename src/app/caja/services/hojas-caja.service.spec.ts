import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HojasCajaService } from './hojas-caja.service';

describe('HojasService', () => {
  let service: HojasCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(HojasCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
