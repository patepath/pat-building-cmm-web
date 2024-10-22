import { TestBed } from '@angular/core/testing';

import { Report4Service } from './report4.service';

describe('Report4Service', () => {
  let service: Report4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Report4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
