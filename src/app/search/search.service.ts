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
import { Observable } from "rxjs/Observable";
import { SearchResult } from "./api/search-result";
import { Doc } from "./api/doc";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {
  }

  search(q: string, start: number = 0): Observable<SearchResult> {
    return this
      .httpClient
      .get<SearchResult>(`${environment.search.endpoint}?q=${q}&start=${start}`)
      .map((searchResult:SearchResult) => {
        searchResult.response.docs.forEach((doc:Doc) => {
          this.addDownloadLinks(doc);
        });
        return searchResult;
      });
  }

  private addDownloadLinks(doc:Doc) {
    if(doc.ec) {
      doc.downloadLinks = [];
      doc.ec.forEach((extension: string) => {
        doc.downloadLinks.push({
          name: extension,
          link: this.downloadLink(doc, extension)
        });
      });
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
