import { TestBed } from '@angular/core/testing';

import { SeguiridadService } from './seguiridad.service';

describe('SeguiridadService', () => {
  let service: SeguiridadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguiridadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
