import { TestBed, inject } from '@angular/core/testing';

import { ArtifactService } from './artifact.service';

describe('ArtifactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtifactService]
    });
  });

  it('should be created', inject([ArtifactService], (service: ArtifactService) => {
    expect(service).toBeTruthy();
  }));
});
