import { TestBed } from '@angular/core/testing';

import { GlobalFService } from './global-f.service';

describe('GlobalFService', () => {
  let service: GlobalFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
