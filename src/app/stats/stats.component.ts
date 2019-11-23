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

import { Component, OnInit } from '@angular/core';
import { StatsService } from "./stats.service";
import { Stat } from "./api/stat";
import { NotificationService } from "../shared/notifications/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stat: Stat;

  constructor(private statsService: StatsService,
              private notificationService: NotificationService,
              private titleService: Title,
              private metaService: Meta,
              private translate: TranslateService) {
    translate.setDefaultLang('stats-en');
    translate.use('stats-en');
  }

  ngOnInit() {
    this.statsService.stats().subscribe(
      (stat: Stat) => this.stat = stat,
      error => this.notificationService.notifySystemUnavailable());

    this.translate.get('stats.htmlTitle').subscribe(title => {
      this.titleService.setTitle( title );
      this.metaService.updateTag({ name: 'og:title', content: title});
    });

    this.translate.get('stats.htmlDescription').subscribe(description => {
      this.metaService.updateTag({ name: 'description', content: description});
      this.metaService.updateTag({ name: 'og:description', content: description});
    });
  }

}
