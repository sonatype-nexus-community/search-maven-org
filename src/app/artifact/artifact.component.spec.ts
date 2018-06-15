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

import { ArtifactComponent } from './artifact.component';
import { ActivatedRoute, Data } from '@angular/router';
import { MatInputModule, MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { createTranslateModule } from "../shared/translate/translate";
import { ClipboardModule } from 'ngx-clipboard';
import { SearchService } from '../search/search.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('ArtifactComponent', () => {
  let component: ArtifactComponent;
  let fixture: ComponentFixture<ArtifactComponent>;
  let a = "artifact";
  let g = "group.something.etc";
  let v = "1.0.0";
  let p = "jar";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        ClipboardModule,
        createTranslateModule(),
        HttpClientModule
      ],
      providers: [
        HttpClient,
        SearchService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({
              group: this.g,
              artifact: this.a,
              version: this.v,
              classifier: 'jar'
            })
          }
        }
      ],
      declarations: [ ArtifactComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactComponent);
    component = fixture.componentInstance;
    component.group = g;
    component.artifact = a;
    component.version = v;
    component.packaging = 'jar';
    fixture.detectChanges();
  });

  describe('when doing fun utility things', () => {
    it('should create a valid repository link given proper values', () => {
      expect(component.repositoryLink(g, a, v)).toEqual("http://repo1.maven.org/maven2/group/something/etc/artifact/1.0.0/");
    });

    it('should create a valid Apache Maven Template', () => {
      let expected = `<dependency>
      <groupId>${g}</groupId>
      <artifactId>${a}</artifactId>
      <version>${v}</version>
    </dependency>`;
      let result = component.apacheMavenTemplate(g, a, v, p)
      expect(result.replace(/\s\s+/g, ' ')).toBe(expected.replace(/\s\s+/g, ' '));
    });
  });
});
