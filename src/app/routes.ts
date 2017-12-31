import { Routes } from "@angular/router";
import { SearchComponent } from "./search/search.component";
import { StatsComponent } from "./stats/stats.component";

export const SMO_ROUTES: Routes = [
  {
    path: '',
    component: SearchComponent
  }, {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
