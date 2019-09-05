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
import { ArtifactComponent } from './artifact.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  createTranslateModule
} from "../shared/translate/translate";
import { DependencyInformationComponent } from './dependency-information/dependency-information.component';
import { ArtifactService } from "./artifact.service";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PomDependencyInformationComponent } from "./dependency-information/pom-dependency-information.component";
import { HttpClient } from '@angular/common/http';
import { VulnerabilitiesModule } from "../vulnerabilities/vulnerabilities.module";

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    ClipboardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    VulnerabilitiesModule,
    RouterModule.forChild([{
      path: ':group/:artifact',
      component: ArtifactComponent,
      data: {
        showNavSearchBar: true
      }
    }, {
      path: ':group/:artifact/:version/:packaging',
      component: ArtifactComponent,
      data: {
        showNavSearchBar: true
      }
    }]),
    createTranslateModule()
  ],
  providers: [ArtifactService],
  declarations: [
    ArtifactComponent,
    DependencyInformationComponent,
    PomDependencyInformationComponent
  ]
})
export class ArtifactModule { }

