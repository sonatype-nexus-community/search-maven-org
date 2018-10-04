/*
 * Copyright 2018-present Sonatype, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DataSource } from '@angular/cdk/collections';
import { Observable ,  BehaviorSubject } from 'rxjs';






import { SearchDoc } from "./search-doc";
import { MatPaginator } from "@angular/material";
import { SearchService } from "../search.service";
import { SearchResult } from "./search-result";
import { SearchSuggestion } from "./search-suggestion";

export class SearchDataSource extends DataSource<SearchDoc> {

  subject: BehaviorSubject<SearchDoc[]>;
  qSubject: BehaviorSubject<string>;

  totalCount: number = -1;

  hasSearched: boolean = false;

  private q: string;

  constructor(private searchService: SearchService, private paginator: MatPaginator) {
    super();

    this.qSubject = new BehaviorSubject<string>('');
  }

  /**
   * Connect function called by MatTable to retrieve one stream containing the data to render.
   */
  connect(): Observable<SearchDoc[]> {
    const displayedChanges = [
      this.paginator.page
    ];

    this.subject = new BehaviorSubject<SearchDoc[]>([]);

    Observable.merge(...displayedChanges).subscribe(() => {
      this.getData();
    });

    this.qSubject.subscribe((q) => {
      this.q = q;
      this.paginator.pageIndex = 0;
      this.getData();
    });

    if (!this.subject.isStopped) {
      this.getData();
    }

    return Observable.merge(this.subject);
  }

  disconnect() {
    this.subject.complete();
    this.subject.observers = [];

    this.qSubject.complete();
    this.qSubject.observers = [];
  }

  private getData() {
    let start = this.paginator.pageIndex * this.paginator.pageSize;
    let q: string = this.q.trim();

    if (q) {
      if (q.length > 2) {
        q = this.getSearchString(q);
      }
      this.hasSearched = true;

      this.searchService.search(q, start).map(searchResult => {
        this.totalCount = searchResult.response.numFound;
        return searchResult;
      }).subscribe(
        (searchResult: SearchResult) => this.handleSearchResults(searchResult),
        (error: any) => {
          this.qSubject.error(error);
          this.clearData();
        });
    } else {
      this.clearData();
      this.hasSearched = false;
    }
  }

  private handleSearchResults(searchResult: SearchResult) {
    if (searchResult.response.docs.length) {
      this.subject.next(searchResult.response.docs);
    } else if (searchResult.spellcheck && searchResult.spellcheck.suggestion) {
      this.searchSuggestion(searchResult.spellcheck.suggestion);
    } else {
      this.clearData();
    }
  }

  private searchSuggestion(suggestion: SearchSuggestion) {
    if (suggestion.suggestionResponse) {
      this.searchService
        .search(suggestion.suggestionResponse.suggestion[0], 0)
        .subscribe(
          searchResult => this.subject.next(searchResult.response.docs),
          error => this.qSubject.error(error));
    }
  }

  private getSearchString(q: string): string {
    let query: string = q;

    query = query.replace(/ and /gi, w => w.toUpperCase());
    query = query.replace(/ && /gi, ' AND ');
    query = query.split(' ').join('+');

    return query;
  }

  private clearData() {
    this.subject.next([]);
    this.totalCount = -1;
  }
}
