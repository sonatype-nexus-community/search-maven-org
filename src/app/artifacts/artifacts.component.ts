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

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SearchService } from "../search/search.service";
import { SearchDataSource } from "../search/api/search-data-source";
import { MatPaginator } from "@angular/material";
import { NotificationService } from "../shared/notifications/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.scss'],
  animations: [trigger('slideUp', [
    transition('void => *', [
      style({opacity: 0}),
      animate(500)
    ]),
  ])]
})
export class ArtifactsComponent implements OnInit {

  displayedColumns = [
    'groupId',
    'artifactId',
    'latestVersion',
    'updated',
    'download'
  ];

  dataSource: SearchDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private q: string;

  private core: string;

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private notificationService: NotificationService,
              private translate: TranslateService) {
    translate.setDefaultLang('artifacts-en');
    translate.use('artifacts-en');
  }

  ngOnInit() {
    this.dataSource = new SearchDataSource(this.searchService, this.paginator);
    this.dataSource.qSubject.subscribe(s => s, error => this.handleError(error));

    this.route.queryParams.subscribe(params => {
      this.q = params['q'];
      this.core = params['core'];

      if (this.q) {
        this.search(this.q + (this.core ? '&core=' + this.core : ''));
      }
    });
  }

  search(query: string) {
    this.dataSource.qSubject.next(query)
  }

  private handleError(error) {
    // For "know" exceptions, don't notify users
    if (error.status == 400 &&
      (error.error.includes('org.apache.lucene.queryParser.ParseException') ||
      error.error.includes('400, msg: missing query string') ||
      error.error.includes('Solr returned 400, msg:'))) {
      return;
    } else if (error.status == 500 && (error.statusText.includes('IllegalArgumentException'))) {
      return;
    }

    this.notificationService.notifySystemUnavailable();
  }
}
