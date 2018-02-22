import { Routes } from "@angular/router";
import { StatsComponent } from "./stats/stats.component";
import { ArtifactComponent } from "./artifact/artifact.component";
import { ArtifactsComponent } from "./artifact/artifacts.component";
import { HomeComponent } from "./home/home.component";

export const SMO_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
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
