import { TestBed } from '@angular/core/testing';

import { OrupoolService } from './orupool.service';

describe('OrupoolService', () => {
  let service: OrupoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrupoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
