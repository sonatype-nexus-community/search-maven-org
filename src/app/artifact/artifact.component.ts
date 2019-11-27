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
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from "../shared/config/app-config.service";
import { Pom } from "./api/pom";
import { ArtifactService } from "./artifact.service";
import { SearchService } from "../search/search.service";
import { SearchDoc } from "../search/api/search-doc";
import { NotificationService } from "../shared/notifications/notification.service";
import { VulnerabilitiesService } from "../vulnerabilities/vulnerabilities.service";
import { Vulnerability } from "../vulnerabilities/api/vulnerability";
import { ComponentReport } from "../vulnerabilities/api/component-report";
import { trigger, style, animate, transition } from '@angular/animations';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.scss'],
  animations: [trigger('slideUp', [
    transition('void => *', [
      style({opacity: 0}),
      animate(700)
    ]),
  ])]
})
export class ArtifactComponent implements OnInit {
  group: string;
  artifact: string;
  version: string;
  packaging: string;
  pom: string;
  parsedPom: Pom;
  sha1: string;
  searchDocs: SearchDoc[];
  downloadLinks: { name: string, link: string }[];
  vulnerabilities: Vulnerability[];
  componentReport: ComponentReport;
  showVulnerabilitySpinner: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private artifactService: ArtifactService,
              private searchService: SearchService,
              private vulnerabilitiesService: VulnerabilitiesService,
              private notificationService: NotificationService,
              private appConfigService: AppConfigService,
              private titleService: Title,
              private metaService: Meta) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.group = params['group'];
      this.artifact = params['artifact'];
      this.packaging = params['packaging'];
      this.version = params['version'];

      if (this.version) {
        this.initDefault()
      } else {
        this.initByFindingLatestVersion();
      }
    });
  }

  initDefault() {
    this.initOnRelatedArtifacts();
    this.initOnVulnerabilities();
    this.artifactService.remoteContent(this.remoteRepositoryPomLink()).subscribe(content => {
      setTimeout(() => {
        this.pom = content;
        this.parsedPom = Pom.parse(this.pom);
        this.parsedPom.dependencies = [...this.parsedPom.dependencies];
        if (this.parsedPom.name) {
          this.titleService.setTitle(this.parsedPom.name.trim());
          this.metaService.updateTag({ name: 'og:title', content: this.parsedPom.name.trim()});
        }
        if (this.parsedPom.description) {
          this.metaService.updateTag({ name: 'description', content: this.parsedPom.description.trim()});
          this.metaService.updateTag({ name: 'og:description', content: this.parsedPom.description.trim()});
        }
      }, 1000);
    });

    this.artifactService.remoteContent(this.remoteRepositoryJarSha1Link()).subscribe(content => {
      // some sha1 files have path names in them after a space, this way we remove the path part.
      this.sha1 = content ? content.split(' ')[0] : '';
    });
  }

  initByFindingLatestVersion() {
    let query: string = `g:${this.group} AND a:${this.artifact}&core=gav`;

    this.searchService.all(query).subscribe(searchResult => {
        this.router.navigate(['artifact', this.group, this.artifact, searchResult.response.docs[0].v, searchResult.response.docs[0].p])
      },
      error => this.notificationService.notifySystem('Unable to find related versions and downloads'));
  }

  repositoryLink(g: string, a: string, v: string): string {
    let groupSlash = g.replace(/\.+/g, '/');
    return `${this.appConfigService.getConfig().repositoryBaseUrl}/${groupSlash}/${a}/${v}/`;
  }

  ossVulnerabilitiesResourceLink(): string {
    return this.componentReport.reference;
  }

  remoteRepositoryJarSha1Link(): string {
    return this.remoteRepositoryLink() + '.jar.sha1';
  }

  remoteRepositoryPomLink(): string {
    return this.remoteRepositoryLink() + '.pom';
  }

  remoteRepositoryLink(): string {
    let groupSlash = this.group.replace(/\.+/g, '/');
    return `${groupSlash}/${this.artifact}/${this.version}/${this.artifact}-${this.version}`;
  }

  private initOnRelatedArtifacts() {
    let query: string = `g:${this.group} AND a:${this.artifact}&core=gav`;

    this.searchService
      .all(query)
      .subscribe(
        searchResult => this.initRelatedArtifacts(searchResult.response.docs),
        error => this.notificationService.notifySystem('Unable to find related versions and downloads'));
  }

  private initRelatedArtifacts(searchDocs: SearchDoc[]) {
    this.searchDocs = searchDocs;

    let currentVersionSearchDocs: SearchDoc[] = this.searchDocs.filter((value) => {
      return value.v == this.version
    });

    if (currentVersionSearchDocs.length) {
      this.downloadLinks = currentVersionSearchDocs[0].downloadLinks;
    }
  }

  private initOnVulnerabilities() {
    this.showVulnerabilitySpinner = true;

    this.vulnerabilitiesService.get(this.group, this.artifact, this.version).subscribe(componentReport => {
      this.componentReport = componentReport;
      this.showVulnerabilitySpinner = false;
    }, error => {
      setTimeout(() => {
        this.showVulnerabilitySpinner = false;
      }, 1000);
    });
  }
}
