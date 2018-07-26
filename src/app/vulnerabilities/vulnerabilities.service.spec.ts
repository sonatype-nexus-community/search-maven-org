import { TestBed, inject } from '@angular/core/testing';

import { VulnerabilitiesService } from './vulnerabilities.service';

describe('VulnerabilitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VulnerabilitiesService]
    });
  });

  it('should be created', inject([VulnerabilitiesService], (service: VulnerabilitiesService) => {
    expect(service).toBeTruthy();
  }));
});
