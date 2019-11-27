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

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { APP_BASE_HREF } from "@angular/common";


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
        NavbarModule
      ],
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }]
    }).compileComponents();
  }));

  // it('should create the SMO app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //
  //   expect(app).toBeTruthy();
  // }));
  //
  // it('should render the SMO title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1')).toBeTruthy();
  //
  //   // TODO : MBS fix this
  //   // expect(compiled.querySelector('h1').textContent).toContain('The Search Engine for The Central Repository');
  // }));
  //
  // it('should render the SMO page title in a h2 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h2')).toBeTruthy();
  //
  //   // TODO : MBS fix this
  //   // expect(compiled.querySelector('h2').textContent).toContain('The Central Repository Search Engine!');
  // }));

});
