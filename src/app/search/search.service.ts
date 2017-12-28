import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { SearchResult } from "./api/search-result";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  // search(): Observable<SearchDoc[]> {
  //   console.log('aaa');
  //   return this
  //     .httpClient
  //     .get<SearchDoc[]>(
  //       `${environment.search.endpoint}?q=test`)
  //     .map(data => data['response']['docs'] as SearchDoc[]);
  // }

  search(): Observable<SearchResult> {
    console.log('aaa');
    return this
      .httpClient
      .get<SearchResult>(
        `${environment.search.endpoint}?q=test`);
  }
}
