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
import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';
import { createTranslateModule } from "../shared/translate/translate";
import { ArtifactsComponent } from "./artifacts.component";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterModule.forChild([{
      path: '',
      component: ArtifactsComponent,
      data: {
        showNavSearchBar: true
      }
    }]),
    createTranslateModule()
  ],
  providers: [],
  declarations: [
    ArtifactsComponent
  ]
})
export class ArtifactsModule {
}
