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

import { Routes } from "@angular/router";
import { StatsComponent } from "./stats/stats.component";
import { ArtifactComponent } from "./artifact/artifact.component";
import { ArtifactsComponent } from "./artifact/artifacts.component";
import { ResourcesComponent } from './resources/resources.component';
import { HomeComponent } from "./home/home.component";
import { AdvancedSearchComponent } from "./search/advanced-search.component";

export const SMO_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'artifact/:group/:artifact',
    component: ArtifactComponent,
    data: {
      showNavSearchBar: true
    }
  },
  {
    path: 'artifact/:group/:artifact/:version/:packaging',
    component: ArtifactComponent,
    data: {
      showNavSearchBar: true
    }
  },
  {
    path: 'search',
    component: ArtifactsComponent,
    data: {
      showNavSearchBar: true
    }
  },
  {
    path: 'advancedsearch',
    component: AdvancedSearchComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
