import { Routes } from "@angular/router";
import { SearchComponent } from "./search/search.component";

export const SMO_ROUTES: Routes = [
  {
    path: '',
    component: SearchComponent
  }, {
    path: '**',
    redirectTo: ''
  }
];
