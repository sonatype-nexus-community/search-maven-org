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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { createTranslateModule } from "./shared/translate/translate";
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { RouterModule } from "@angular/router";
import { SMO_ROUTES } from "./routes";
import { SearchModule } from "./search/search.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NotificationsModule } from "./shared/notifications/notifications.module";
import { HomeModule } from "./home/home.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterStateModule } from "./shared/router-state/router-state.module";
import { VulnerabilitiesModule } from "./vulnerabilities/vulnerabilities.module";
import { ClassicModule } from "./shared/classic/classic.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ClipboardModule } from "ngx-clipboard";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AppConfigService } from './shared/config/app-config.service';
import { environment } from '../environments/environment';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    RouterModule.forRoot(SMO_ROUTES),
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    ClipboardModule,
    BrowserAnimationsModule,
    RouterStateModule,
    NavbarModule,
    FooterModule,
    NotificationsModule,
    HomeModule,
    SearchModule,
    VulnerabilitiesModule,
    ClassicModule,
    MatProgressSpinnerModule,
    createTranslateModule(),
  ],
  providers: [AppConfigService, {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFn,
    multi: true,
    deps: [AppConfigService]
  }],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule {
}
