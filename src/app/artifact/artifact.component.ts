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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from "../../environments/environment";
import { ArtifactService } from "./artifact.service";
import { SearchService } from "../search/search.service";
import { SearchDoc } from "../search/api/search-doc";
import { NotificationService } from "../shared/notifications/notification.service";

@Component({
  selector: 'app-artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.scss']
})
export class ArtifactComponent implements OnInit {
  group: string;
  artifact: string;
  version: string;
  packaging: string;
  pom: string;
  searchDocs: SearchDoc[];
  downloadLinks: { name: string, link: string }[];

  constructor(private route: ActivatedRoute,
              private artifactService: ArtifactService,
              private searchService: SearchService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.group = params['group'];
      this.artifact = params['artifact'];
      this.version = params['version'];
      this.packaging = params['packaging'];

      this.artifactService.remoteContent(this.remoteRepositoryLink()).subscribe(content => {
        this.pom = content;
      });

      this.initOnRelatedArtifacts();
    });
  }

  repositoryLink(g: string, a: string, v: string): string {
    let groupSlash = g.replace(/\.+/g, '/');
    return `${environment.repositoryBaseUrl}/${groupSlash}/${a}/${v}/`;
  }

  mavenCentralBadge(g: string, a: string, v: string): string {
    return `[![Maven Central](https://img.shields.io/maven-central/v/${g}/${a}.svg?label=Maven%20Central)](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22${g}%22%20a%3A%22${a}%22)`
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
    return `compile '${g}:${a}:${v}'`;
  }

  gradleKotlinDslTemplate(g: string, a: string, v: string): string {
  return `compile(group = "${g}", name = "${a}", version = "${v}")`;
  }

  purlTemplate(g: string, a: string, v: string): string {
    return `maven:${g}/${a}@${v}`;
  }

  remoteRepositoryLink(): string {
    let groupSlash = this.group.replace(/\.+/g, '/');
    return `${groupSlash}/${this.artifact}/${this.version}/${this.artifact}-${this.version}.pom`;
  }

  private initOnRelatedArtifacts() {
    let query: string = `g:${this.group} AND a:${this.artifact}&core=gav`;

    this.searchService
      .all(query)
      .subscribe(
        searchResult => this.initRelatedArtifacts(searchResult.response.docs),
        error => this.notificationService.notifySystem('artifact.related.search.result.unavailable'));
  }

  private initRelatedArtifacts(searchDocs: SearchDoc[]) {
    this.searchDocs = searchDocs;

    let currentVersionSearchDocs: SearchDoc[] = this.searchDocs.filter((value) => {
      return value.v == this.version
    });

    if(currentVersionSearchDocs.length) {
      this.downloadLinks = currentVersionSearchDocs[0].downloadLinks;
    }
  }
}
