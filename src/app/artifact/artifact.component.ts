import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from "../../environments/environment";

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.group = params['group'];
      this.artifact = params['artifact'];
      this.version = params['version'];
      this.classifier = params['classifier'];
    });
  }

  repositoryLink(g: string, a: string, v: string): string {
    let groupSlash = g.replace(/\.+/g, '/');
    return `${environment.repositoryBaseUrl}/${groupSlash}/${a}/${v}/`;
  }

  apacheMavenTemplate(g: string, a: string, v: string): string {
    return `<dependency>
    <groupId>${g}</groupId>
    <artifactId>${a}</artifactId>
    <version>${v}</version>
  </dependency>`;
  }

  apacheBuildrTemplate(g: string, a: string, v: string): string {
    return `'${g}:${a}:jar:${v}'`;
  }

  apacheIvyTemplate(g: string, a: string, v: string): string {
    return `<dependency org="${g}" name="${a}" rev="${v}" />`;
  }

  groovyGrapeTemplate(g: string, a: string, v: string): string {
    return `@Grapes( 
      @Grab(group='${g}', module='${a}', version='${v}') 
    )`;
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
}
