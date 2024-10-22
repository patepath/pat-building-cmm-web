import { TestBed } from '@angular/core/testing';

import { Report3Service } from './report3.service';

describe('Report3Service', () => {
  let service: Report3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Report3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
