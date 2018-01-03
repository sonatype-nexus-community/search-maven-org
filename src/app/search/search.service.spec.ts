import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService,{
        provide: HttpClient,
        useValue: HttpClientTestingModule
      } ]
    });
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
