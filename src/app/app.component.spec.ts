import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";

import { createTranslateLoader } from "./app.module";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
      ],
      declarations: [
        AppComponent
      ],
      providers : [
        TranslateService
      ]
    }).compileComponents();
  }));

  it('should create the SMO app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

  it('should render the SMO title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1')).toBeTruthy();

    // TODO : MBS fix this
    // expect(compiled.querySelector('h1').textContent).toContain('The Search Engine for The Central Repository');
  }));

  it('should render the SMO page title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2')).toBeTruthy();

    // TODO : MBS fix this
    // expect(compiled.querySelector('h2').textContent).toContain('The Central Repository Search Engine!');
  }));

});
