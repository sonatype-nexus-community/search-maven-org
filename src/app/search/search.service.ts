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

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable ,  Subject } from "rxjs";
import { SearchResult } from "./api/search-result";
import { Doc } from "./api/doc";
import { SearchSpellcheck } from "./api/search-spellcheck";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  search(q: string, start: number = 0, rows: number = 20): Observable<SearchResult> {
    return this
      .httpClient
      .get<SearchResult>(`${environment.search.endpoint}?q=${q}&start=${start}&rows=${rows}`)
      .map((searchResult: SearchResult) => {
        searchResult.response.docs.forEach((doc: Doc) => {
          this.addDownloadLinks(doc);
        });

        if (searchResult.spellcheck &&
          searchResult.spellcheck.suggestions.length >= 2) {

          searchResult.spellcheck.suggestions.sort((c1, c2) => {
            return (typeof c1.localeCompare === 'function') ? c1.localeCompare(c2) : 0;
          });

          searchResult.spellcheck = new SearchSpellcheck(searchResult.spellcheck.suggestions);
        }

        return searchResult;
      });
  }

  count(q: string): Observable<number> {
    return this
      .httpClient
      .get<SearchResult>(`${environment.search.endpoint}?q=${q}&start=0&rows=0`)
      .map((searchResult: SearchResult) => {
        return searchResult.response.numFound;
      });
  }

  all(q: string): Observable<SearchResult> {
    let observer: Subject<SearchResult> = new Subject<SearchResult>();

    this.count(q).subscribe(
      count => this.search(q, 0, count).subscribe(
        searchResult => observer.next(searchResult),
        error => observer.error(error)),
      error => observer.error(error));

    return observer;
  }

  private addDownloadLinks(doc: Doc) {
    if (doc.ec) {
      doc.downloadLinks = [];
      doc.ec.forEach((extension: string) => {
        doc.downloadLinks.push({
          name: extension.slice(1),
          link: this.downloadLink(doc, extension)
        });
      });

      doc.downloadLinks.sort((c1, c2) => c1.name.localeCompare(c2.name))
    }
  }

  private downloadLink(doc: Doc, extension: string): string {
    let groupSlash = doc.g.replace(/\.+/g, '/');
    return doc.latestVersion ? this.getDownloadLink(doc, doc.latestVersion, extension, groupSlash) : this.getDownloadLink(doc, doc.v, extension, groupSlash);
  }

  private getDownloadLink(doc: Doc, version: string, extension: string, groupSlash: string): string {
    return `${environment.smoBaseUrl}${groupSlash}/${doc.a}/${version}/${doc.a}-${version}${extension}`;
  }

}
