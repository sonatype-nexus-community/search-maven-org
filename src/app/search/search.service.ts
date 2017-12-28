import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { SearchResult } from "./api/search-result";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  search(q: string, start: number = 0): Observable<SearchResult> {
    return this
      .httpClient
      .get<SearchResult>(
        `${environment.search.endpoint}?q=${q}&start=${start}`);
  }
}
