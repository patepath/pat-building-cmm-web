import { TestBed } from '@angular/core/testing';

import { Report5Service } from './report5.service';

describe('Report5Service', () => {
  let service: Report5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Report5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
