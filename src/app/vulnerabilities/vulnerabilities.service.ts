import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";
import { ComponentReport } from "./api/component-report";

@Injectable()
export class VulnerabilitiesService {

  constructor(private httpClient: HttpClient) {
  }

  get(group: string, artifact: string, version: string): Observable<ComponentReport> {
    return this
      .httpClient
      .get<ComponentReport>(`${environment.ossindex.maven.endpoint}/${group}/${artifact}@${version}`)
      .map(componentReport => {
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
      });
  }
}
