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

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dependency-information',
  templateUrl: './dependency-information.component.html',
  styleUrls: ['./dependency-information.component.scss']
})
export class DependencyInformationComponent implements OnChanges {

  @Input()
  headerText: string;

  @Input()
  subText: string;

  @Input()
  subTextUrl: string;

  @Input()
  image: string;

  @Input()
  g: string;

  @Input()
  a: string;

  @Input()
  v: string;

  @Input()
  p: string;

  @Input()
  type: string;

  templateValue: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.v && changes.v.currentValue) {
      this.templateValue = this.provideTemplateOnValue(this.type);
    }
  }

  provideTemplateOnValue(type: string): string {
    switch(type) {
      case "maven": {
        return this.apacheMavenTemplate(this.g, this.a, this.v, this.p);
      }
      case "maven-badge": {
        return this.mavenCentralBadge(this.g, this.a, this.v)
      }
      case "apachebuilder": {
        return this.apacheBuildrTemplate(this.g, this.a, this.v);
      }
      case "gradle": {
        return this.gradleGrailsTemplate(this.g, this.a, this.v);
      }
      case "kotlin": {
        return this.gradleKotlinDslTemplate(this.g, this.a, this.v);
      }
      case "sbt": {
        return this.scalaSbtTemplate(this.g, this.a, this.v);
      }
      case "groovygrape": {
        return this.groovyGrapeTemplate(this.g, this.a, this.v);
      }
      case "leiningen": {
        return this.leiningenTemplate(this.g, this.a, this.v);
      }
      case "ivy": {
        return this.apacheIvyTemplate(this.g, this.a, this.v);
      }
      case "purl": {
        return this.purlTemplate(this.g, this.a, this.v);
      }
      default: {
        this.templateValue =  "";
        break;
      }
    }
  }

  mavenCentralBadge(g: string, a: string, v: string): string {
    return `[![Maven Central](https://img.shields.io/maven-central/v/${g}/${a}.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22${g}%22%20AND%20a:%22${a}%22)`
  }

  apacheMavenTemplate(g: string, a: string, v: string, p: string): string {
    if (p == 'jar') {
      return `<dependency>\n  <groupId>${g}</groupId>\n  <artifactId>${a}</artifactId>\n  <version>${v}</version>\n</dependency>`;
    }
    else {
      return `<dependency>\n  <groupId>${g}</groupId>\n  <artifactId>${a}</artifactId>\n  <version>${v}</version>\n  <type>${p}</type>\n</dependency>`;
    }
  }

  apacheBuildrTemplate(g: string, a: string, v: string): string {
    return `'${g}:${a}:jar:${v}'`;
  }

  apacheIvyTemplate(g: string, a: string, v: string): string {
    return `<dependency org="${g}" name="${a}" rev="${v}" />`;
  }

  groovyGrapeTemplate(g: string, a: string, v: string): string {
    return `@Grapes(\n  @Grab(group='${g}', module='${a}', version='${v}')\n)`;
  }

  scalaSbtTemplate(g: string, a: string, v: string): string {
    return `libraryDependencies += "${g}" % "${a}" % "${v}"`;
  }

  leiningenTemplate(g: string, a: string, v: string): string {
    return `[${g}/${a} "${v}"]`;
  }

  gradleGrailsTemplate(g: string, a: string, v: string): string {
    return `implementation '${g}:${a}:${v}'`;
  }

  gradleKotlinDslTemplate(g: string, a: string, v: string): string {
    return `implementation("${g}:${a}:${v}")`;
  }

  purlTemplate(g: string, a: string, v: string): string {
    return `pkg:maven/${g}/${a}@${v}`;
  }
}
