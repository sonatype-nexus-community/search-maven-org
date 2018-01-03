import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { createTranslateModule } from "./shared/translate/translate";
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { RouterModule } from "@angular/router";
import { SMO_ROUTES } from "./routes";
import { SearchModule } from "./search/search.module";
import { FooterModule } from "./shared/footer/footer.module";
import { StatsModule } from "./stats/stats.module";
import { ArtifactModule } from './artifact/artifact.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(SMO_ROUTES),
    BrowserAnimationsModule,
    createTranslateModule(),
    NavbarModule,
    FooterModule,
    SearchModule,
    StatsModule,
    ArtifactModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
