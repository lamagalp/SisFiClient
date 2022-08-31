import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { VentasService } from './ventas.service';

describe('VentasService', () => {
  let service: VentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(VentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
