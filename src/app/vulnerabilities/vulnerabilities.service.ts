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


import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ComponentReport } from "./api/component-report";
import { AppConfigService } from '../shared/config/app-config.service';

@Injectable()
export class VulnerabilitiesService {

  constructor(private httpClient: HttpClient,
              private appConfigService: AppConfigService) {
  }

  get(group: string, artifact: string, version: string): Observable<ComponentReport> {
    return this
      .httpClient
      .get<ComponentReport>(`${this.appConfigService.getConfig().ossindex.maven.endpoint}/${group}/${artifact}@${version}`).pipe(
      map(componentReport => {
        // simple reset of numbers
        componentReport.moderateCount = 0;
        componentReport.severeCount = 0;
        componentReport.criticalCount = 0;
        componentReport.unknownCount = 0;

        componentReport.vulnerabilities.forEach(vulnerability => {
          if (vulnerability.cvssScore >= 1 && vulnerability.cvssScore < 4) {
            componentReport.moderateCount++;
          } else if (vulnerability.cvssScore >= 4 && vulnerability.cvssScore < 7) {
            componentReport.severeCount++;
          } else if (vulnerability.cvssScore >= 7) {
            componentReport.criticalCount++;
          } else {
            componentReport.unknownCount++;
          }
        });

        return componentReport;
      }));
  }
}
