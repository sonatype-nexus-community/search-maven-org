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
    return `${environment.smoBaseUrl}${groupSlash}/${doc.a}/${doc.latestVersion}/${doc.a}-${doc.latestVersion}${extension}`;
  }

}
