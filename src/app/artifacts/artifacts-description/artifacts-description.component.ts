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

import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../../search/search.service';
import { ArtifactService } from '../../artifact/artifact.service';
import { Pom } from '../../artifact/api/pom';
import { Meta } from '@angular/platform-browser';

/**
 * Shows some details extracted from pom.xml of latest version.
 */
@Component({
  selector: 'app-artifacts-description',
  templateUrl: './artifacts-description.component.html',
  styleUrls: ['./artifacts-description.component.scss']
})
export class ArtifactsDescriptionComponent implements OnInit {

  @Input() group: string;
  @Input() artifact: string;

  parsedPom: Pom;

  constructor(private searchService: SearchService,
              private artifactService: ArtifactService,
              private metaService: Meta) {
  }

  ngOnInit() {
    const query = `g:${this.group} AND a:${this.artifact}&core=gav`;
    this.searchService.all(query).subscribe(searchResult => {
      const firstVersion = searchResult.response.docs[0].v;
      this.artifactService.remoteContent(this.remoteRepositoryPomLink(firstVersion)).subscribe(content => {
        this.parsedPom = Pom.parse(content);

        this.initOnParsedPom();
      });
    }, error => {});
  }

  private remoteRepositoryPomLink(version): string {
    const gSlash = this.group.replace(/\.+/g, '/');
    return `${gSlash}/${this.artifact}/${version}/${this.artifact}-${version}.pom`;
  }

  private initOnParsedPom() {
    let description = this.parsedPom.getSeoDescription({
      groupId: this.group,
      artifactId: this.artifact,
      version: ''
    });

    if (description) {
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ name: 'og:description', content: description });
    }
  }
}
