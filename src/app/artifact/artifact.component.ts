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
import { ArtifactService } from "./artifact.service";
import { SearchService } from "../search/search.service";
import { SearchDoc } from "../search/api/search-doc";
import { NotificationService } from "../shared/notifications/notification.service";
import { VulnerabilitiesService } from "../vulnerabilities/vulnerabilities.service";
import { Vulnerability } from "../vulnerabilities/api/vulnerability";
import { ComponentReport } from "../vulnerabilities/api/component-report";
import { TranslateService } from "@ngx-translate/core";
import { trigger, style, animate, transition } from '@angular/animations';

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
              private translate: TranslateService) {
    translate.setDefaultLang('artifact-en');
    translate.use('artifact-en');
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
    this.artifactService.remoteContent(this.remoteRepositoryLink()).subscribe(content => {
      this.pom = content;
    });
  }

  initByFindingLatestVersion() {
    let query: string = `g:${this.group} AND a:${this.artifact}&core=gav`;

    this.searchService.all(query).subscribe(searchResult => {
        this.router.navigate(['artifact', this.group, this.artifact, searchResult.response.docs[0].v, searchResult.response.docs[0].p])
      },
      error => this.notificationService.notifySystem('artifact.related.search.result.unavailable'));
  }

  repositoryLink(g: string, a: string, v: string): string {
    let groupSlash = g.replace(/\.+/g, '/');
    return `${this.appConfigService.getConfig().repositoryBaseUrl}/${groupSlash}/${a}/${v}/`;
  }

  ossVulnerabilitiesResourceLink(): string {
    return this.componentReport.reference;
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
