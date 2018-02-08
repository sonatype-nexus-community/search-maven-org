import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatMenuModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar.component";
import { createTranslateModule } from "../translate/translate";
import { SearchModule } from "../../search/search.module";

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    SearchModule,
    createTranslateModule()
  ],
  exports: [NavbarComponent],
  declarations: [NavbarComponent]
})
export class NavbarModule {
}

