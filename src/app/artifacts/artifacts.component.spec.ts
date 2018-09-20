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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { ArtifactsComponent } from './artifacts.component';
import { createTranslateModule } from "../shared/translate/translate";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SearchService } from "../search/search.service";
import { NotificationService } from "../shared/notifications/notification.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe('ArtifactsComponent', () => {
  let component: ArtifactsComponent;
  let fixture: ComponentFixture<ArtifactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatSnackBarModule,
        RouterModule.forRoot([]),
        RouterModule.forChild([{
          path: '',
          component: ArtifactsComponent,
          data: {
            showNavSearchBar: true
          }
        }]),
        createTranslateModule()
      ],
      declarations: [ArtifactsComponent],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        SearchService,
        NotificationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
