import { TestBed } from '@angular/core/testing';

import { PartProfileService } from './part-profile.service';

describe('PartProfileService', () => {
  let service: PartProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
