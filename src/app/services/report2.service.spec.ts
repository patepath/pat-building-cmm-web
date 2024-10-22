import { TestBed } from '@angular/core/testing';

import { Report2Service } from './report2.service';

describe('Report2Service', () => {
  let service: Report2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Report2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
