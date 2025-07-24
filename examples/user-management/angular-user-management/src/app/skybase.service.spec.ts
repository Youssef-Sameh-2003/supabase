import { TestBed } from '@angular/core/testing';

import { SkybaseService } from './skybase.service';

describe('SkybaseService', () => {
  let service: SkybaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkybaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
