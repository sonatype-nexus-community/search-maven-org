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

import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from "./search.service";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { NotificationService } from "../shared/notifications/notification.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { FormControl } from "@angular/forms";
import { SearchDoc } from "./api/search-doc";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchDocs: BehaviorSubject<SearchDoc[]> = new BehaviorSubject<SearchDoc[]>([]);

  stateCtrl: FormControl;

  @Input()
  startQuery: string;

  query: string;

  constructor(private searchService: SearchService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.stateCtrl = new FormControl();
    this.stateCtrl.valueChanges.subscribe(s => this.search(s));
    this.stateCtrl.setValue(this.startQuery);
  }

  navigate() {
    if (this.query) {
      this.router.navigate(['/search'], {queryParams: {q: this.query}});
      this.clearSearchResults();
    }
  }

  clearQuery() {
    this.stateCtrl.setValue('');
    this.clearSearchResults();
  }

  private search(query: string) {
    this.query = query;

    if (this.query) {
      this.searchService
        .search(this.query, 0)
        .subscribe(
          searchResult => this.searchDocs.next(searchResult.response.docs),
          error => this.handleError(error))
    } else {
      this.clearSearchResults();
    }
  }

  private clearSearchResults() {
    this.searchDocs.next([]);
  }

  private handleError(error) {

    // For "know" exceptions, don't notify users
    if (error.status == 400 &&
      (error.error.includes('org.apache.lucene.queryParser.ParseException') ||
      error.error.includes('400, msg: missing query string'))) {
      return;
    } else if (error.status == 500 && (error.statusText.includes('IllegalArgumentException'))) {
      return;
    }

    this.notificationService.notifySystemUnavailable();
  }
}
