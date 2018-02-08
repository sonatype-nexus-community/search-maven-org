import { Routes } from "@angular/router";
import { SearchComponent } from "./search/search.component";
import { StatsComponent } from "./stats/stats.component";
import { ArtifactComponent } from "./artifact/artifact.component";
import { ArtifactsComponent } from "./artifact/artifacts.component";

export const SMO_ROUTES: Routes = [
  {
    path: '',
    component: SearchComponent
  }, {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'artifact/:group/:artifact/:version/:classifier',
    component: ArtifactComponent
  },
  {
    path: 'search',
    component: ArtifactsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
