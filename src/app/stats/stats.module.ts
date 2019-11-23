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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import {
  createTranslateModule
} from "../shared/translate/translate";
import { StatsService } from "./stats.service";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { NotificationsModule } from "../shared/notifications/notifications.module";
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: StatsComponent
    }]),
    CommonModule,
    MatCardModule,
    MatIconModule,
    NotificationsModule,
    createTranslateModule()
  ],
  providers : [
    StatsService,
    Title
  ],
  exports: [StatsComponent],
  declarations: [StatsComponent]
})
export class StatsModule { }
