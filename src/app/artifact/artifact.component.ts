import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from "../../environments/environment";
import { ArtifactService } from "./artifact.service";

@Component({
  selector: 'app-artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.scss']
})
export class ArtifactComponent implements OnInit {
  group: string;
  artifact: string;
  version: string;
  classifier: string;
  pom: string;

  constructor(private route: ActivatedRoute,
              private artifactService: ArtifactService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.group = params['group'];
      this.artifact = params['artifact'];
      this.version = params['version'];
      this.classifier = params['classifier'];


      this.artifactService.remoteContent(this.remoteRepositoryLink()).subscribe(content => {
        this.pom = content;
      })
    });
  }

  repositoryLink(g: string, a: string, v: string): string {
    let groupSlash = g.replace(/\.+/g, '/');
    return `${environment.repositoryBaseUrl}/${groupSlash}/${a}/${v}/`;
  }

  mavenCentralBadge(g: string, a: string, v: string): string {
    return `[![Maven Central](https://img.shields.io/maven-central/v/${g}/${a}.svg?label=Maven%20Central)](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22${g}%22%20a%3A%22${a}%22)`
  }

  apacheMavenTemplate(g: string, a: string, v: string): string {
    return `<dependency>\n  <groupId>${g}</groupId>\n  <artifactId>${a}</artifactId>\n  <version>${v}</version>\n</dependency>`;
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
    return `[${g}}/${a} "${v}"]`;
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
}
