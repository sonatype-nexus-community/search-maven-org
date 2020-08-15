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
import { ClassicUrlGuard } from "./shared/classic/classic-url.guard";

export const SMO_ROUTES: Routes = [
  {
    path: '',
    canActivate: [ClassicUrlGuard],
    component: HomeComponent
  }, {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule)
  },
  {
    path: 'artifact',
    loadChildren: () => import('./artifact/artifact.module').then(m => m.ArtifactModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./artifacts/artifacts.module').then(m => m.ArtifactsModule)
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
