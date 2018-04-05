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
import {
  MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatTableModule, MatPaginatorModule
} from '@angular/material';
import { createTranslateModule } from "../shared/translate/translate";
import { DependencyInformationComponent } from './dependency-information/dependency-information.component';
import { ArtifactService } from "./artifact.service";
import { FormsModule } from "@angular/forms";
import { ArtifactsComponent } from "./artifacts.component";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PomDependencyInformationComponent } from "./dependency-information/pom-dependency-information.component";

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    ClipboardModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    RouterModule,
    createTranslateModule()
  ],
  providers: [ArtifactService],
  declarations: [
    ArtifactsComponent,
    ArtifactComponent,
    DependencyInformationComponent,
    PomDependencyInformationComponent
  ]
})
export class ArtifactModule { }
