import { HttpClientTestingModule }from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ArqueosCajasService } from './arqueos-cajas.service';

describe('ArqueosCajasService', () => {
  let service: ArqueosCajasService;
  let httpClientSpy: { get : jasmine.Spy}; //espía el método get

  beforeEach(() => {
   /*  TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }); */
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ArqueosCajasService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* it('should return arqueo de caja', () =>{
    service.getArqueoCaja(1);
  }); */
});
