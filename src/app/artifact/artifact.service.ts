import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";

@Injectable()
export class ArtifactService {

  constructor(private httpClient: HttpClient) {
  }

  remoteContent(path: string): Observable<string> {
    return this
      .httpClient
      .get(`${environment.smoBaseUrl}${path}`, {responseType: 'text'});
  }

}
