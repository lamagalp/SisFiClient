import { TestBed } from '@angular/core/testing';

import { TiposCartonService } from './tipos-carton.service';

describe('TiposCartonService', () => {
  let service: TiposCartonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposCartonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
