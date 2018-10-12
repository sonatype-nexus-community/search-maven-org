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

import { DependencyInformationComponent } from './dependency-information.component';
import { createTranslateModule } from '../../shared/translate/translate';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DependencyInformationComponent', () => {
  let component: DependencyInformationComponent;
  let fixture: ComponentFixture<DependencyInformationComponent>;
  let a = "artifact";
  let g = "group.something.etc";
  let v = "1.0.0";
  let p = "jar";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [createTranslateModule(),
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ClipboardModule,
        HttpClientModule],
      declarations: [ DependencyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyInformationComponent);
    component = fixture.componentInstance;
    component.g = g;
    component.a = a;
    component.v = v;
    component.p = 'jar';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a valid Apache Maven Template', () => {
    let expected = `<dependency>\n  <groupId>${g}</groupId>\n  <artifactId>${a}</artifactId>\n  <version>${v}</version>\n</dependency>`;
    let result = component.provideTemplateOnValue("maven");
    expect(result).toBe(expected);
  });

  it('should create a valid Apache Maven Badge', () => {
    let expected = `[![Maven Central](https://img.shields.io/maven-central/v/${g}/artifact.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22${g}%22%20AND%20a:%22${a}%22)`;
    let result = component.provideTemplateOnValue("maven-badge");
    expect(result).toBe(expected);
  });

  it('should create a valid Groovy Grapes Template', () => {
    let expected = `@Grapes(\n  @Grab(group='${g}', module='${a}', version='${v}')\n)`;
    let result = component.provideTemplateOnValue("groovygrape");
    expect(result).toBe(expected);
  });

  it('should create a valid sbt template', () => {
    let expected = `libraryDependencies += "${g}" % "${a}" % "${v}"`;
    let result = component.provideTemplateOnValue("sbt");
    expect(result).toBe(expected);
  });

  it('should create a valid Gradle Groovy template', () => {
    let expected = `compile '${g}:${a}:${v}'`;
    let result = component.provideTemplateOnValue("gradle");
    expect(result).toBe(expected);
  });

  it('should create a valid Gradle Kotlin DSL template', () => {
    let expected = `compile("${g}:${a}:${v}")`;
    let result = component.provideTemplateOnValue("kotlin");
    expect(result).toBe(expected);
  });
});
