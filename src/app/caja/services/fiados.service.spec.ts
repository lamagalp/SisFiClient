import { HttpClientTestingModule }from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FiadosService } from './fiados.service';

describe('FiadosService', () => {
  let service: FiadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]      
    });
    service = TestBed.inject(FiadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
