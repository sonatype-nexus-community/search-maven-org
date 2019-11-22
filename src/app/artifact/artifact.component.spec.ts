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
import { ArtifactComponent } from './artifact.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { createTranslateModule } from "../shared/translate/translate";
import { ClipboardModule } from 'ngx-clipboard';
import { SearchService } from '../search/search.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ArtifactService } from './artifact.service';
import { VulnerabilitiesService } from '../vulnerabilities/vulnerabilities.service';
import { NotificationService } from '../shared/notifications/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DependencyInformationComponent } from "./dependency-information/dependency-information.component";
import { PomDependencyInformationComponent } from "./dependency-information/pom-dependency-information.component";
import { RouterModule } from "@angular/router";
import { AppConfigService } from '../shared/config/app-config.service';
import { MockConfigService } from '../shared/config/app-config-mock.service';
import { DependencyLinksComponent } from "./dependency-links/dependency-links.component";

describe('ArtifactComponent', () => {
  let component: ArtifactComponent;
  let fixture: ComponentFixture<ArtifactComponent>;

  let a = "artifact";
  let g = "group.something.etc";
  let v = "1.0.0";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatMenuModule,
        FormsModule,
        ClipboardModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        RouterModule.forChild([{
          path: ':group/:artifact',
          component: ArtifactComponent,
          data: {
            showNavSearchBar: true
          }
        }, {
          path: ':group/:artifact/:version/:packaging',
          component: ArtifactComponent,
          data: {
            showNavSearchBar: true
          }
        }]),
        createTranslateModule(),
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        SearchService,
        ArtifactService,
        VulnerabilitiesService,
        NotificationService,
        {
          provide: AppConfigService,
          useClass: MockConfigService
        }
      ],
      declarations: [
        ArtifactComponent,
        DependencyInformationComponent,
        PomDependencyInformationComponent,
        DependencyLinksComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a valid repository link given proper values', () => {
    expect(component.repositoryLink(g, a, v)).toEqual("http://repo1.maven.org/maven2/group/something/etc/artifact/1.0.0/");
  });
});
