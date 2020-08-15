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

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StatsService } from "./stats.service";
import { Stat } from "./api/stat";
import { NotificationService } from "../shared/notifications/notification.service";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  // i18n workaround: all translated strings must be in HTML
  @ViewChild('metaTitle', {static: true}) titleSpan: ElementRef;
  @ViewChild('metaDescription', {static: true}) descriptionSpan: ElementRef;

  stat: Stat;

  constructor(private statsService: StatsService,
              private notificationService: NotificationService,
              private titleService: Title,
              private metaService: Meta) {
  }

  ngOnInit() {
    this.statsService.stats().subscribe(
      (stat: Stat) => this.stat = stat,
      error => this.notificationService.notifySystemUnavailable());

    const title = this.titleSpan.nativeElement.textContent;
    const description = this.descriptionSpan.nativeElement.textContent;
    this.titleService.setTitle( title );
    this.metaService.updateTag({ name: 'og:title', content: title});
    this.metaService.updateTag({ name: 'description', content: description});
    this.metaService.updateTag({ name: 'og:description', content: description});
  }

}
