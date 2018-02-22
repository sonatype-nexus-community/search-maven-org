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

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stat: Stat;

  constructor(private statsService: StatsService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.statsService.stats().subscribe(
      (stat: Stat) => this.stat = stat,
      error => this.notificationService.notifySystemUnavailable());
  }

}
