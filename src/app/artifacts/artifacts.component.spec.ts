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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArtifactsComponent } from './artifacts.component';
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SearchService } from "../search/search.service";
import { AnchorModule } from "../shared/anchor/anchor.module";
import { NotificationService } from "../shared/notifications/notification.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ArtifactsDescriptionComponent } from "./artifacts-description/artifacts-description.component";


describe('ArtifactsComponent', () => {
  let component: ArtifactsComponent;
  let fixture: ComponentFixture<ArtifactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AnchorModule,
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
      ],
      declarations: [ArtifactsComponent, ArtifactsDescriptionComponent],
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
