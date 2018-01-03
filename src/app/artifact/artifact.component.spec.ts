import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactComponent } from './artifact.component';
import { ActivatedRoute, Data } from '@angular/router';
import { MatInputModule, MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { createTranslateModule } from "../shared/translate/translate";
import { ClipboardModule } from 'ngx-clipboard';
import { SearchService } from '../search/search.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('ArtifactComponent', () => {
  let component: ArtifactComponent;
  let fixture: ComponentFixture<ArtifactComponent>;
  let a = "artifact";
  let g = "group.something.etc";
  let v = "1.0.0";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        ClipboardModule,
        createTranslateModule(),
        HttpClientModule
      ],
      providers: [
        HttpClient,
        SearchService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({
              group: this.g,
              artifact: this.a,
              version: this.v,
              classifier: 'jar'
            })
          }
        }
      ],
      declarations: [ ArtifactComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactComponent);
    component = fixture.componentInstance;
    component.group = g;
    component.artifact = a;
    component.version = v;
    component.classifier = 'jar';
    fixture.detectChanges();
  });

  describe('when doing fun utility things', () => {
    it('should create a valid repository link given proper values', () => {
      expect(component.repositoryLink(g, a, v)).toEqual("http://repo1.maven.org/maven2/group/something/etc/artifact/1.0.0/");
    });

    it('should create a valid Apache Maven Template', () => {
      let expected = `<dependency>
      <groupId>${g}</groupId>
      <artifactId>${a}</artifactId>
      <version>${v}</version>
    </dependency>`;
      let result = component.apacheMavenTemplate(g, a, v)
      expect(result.replace(/\s\s+/g, ' ')).toBe(expected.replace(/\s\s+/g, ' '));
    });
  });
});
