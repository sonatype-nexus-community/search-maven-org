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
import { HomeComponent } from "./home/home.component";
import { AdvancedSearchComponent } from "./search/advanced-search.component";
import { ClassicUrlGuard } from "./shared/classic/classic-url.guard";

export const SMO_ROUTES: Routes = [
  {
    path: '',
    canActivate: [ClassicUrlGuard],
    component: HomeComponent
  }, {
    path: 'stats',
    loadChildren: 'app/stats/stats.module#StatsModule'
  },
  {
    path: 'artifact',
    loadChildren: 'app/artifact/artifact.module#ArtifactModule',
  },
  {
    path: 'search',
    loadChildren: 'app/artifacts/artifacts.module#ArtifactsModule'
  },
  {
    path: 'resources',
    loadChildren: 'app/resources/resources.module#ResourcesModule',
  },
  {
    path: '**',
    redirectTo: ''
  }
];
