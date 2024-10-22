import { TestBed } from '@angular/core/testing';

import { Report1Service } from './report1.service';

describe('Report1Service', () => {
  let service: Report1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Report1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
