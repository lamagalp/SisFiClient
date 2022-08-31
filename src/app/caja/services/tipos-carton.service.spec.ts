import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgSelectModule } from '@ng-select/ng-select';

import { TiposCartonService } from './tipos-carton.service';

describe('TiposCartonService', () => {
  let service: TiposCartonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,NgSelectModule]
    });    
    service = TestBed.inject(TiposCartonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
