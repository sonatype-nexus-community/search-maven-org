import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Stat } from "./api/stat";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class StatsService {

  constructor(private httpClient: HttpClient) {
  }

  stats(): Observable<Stat> {
    return this.httpClient.get<Stat>(`${environment.stats.endpoint}`);
  }
}
