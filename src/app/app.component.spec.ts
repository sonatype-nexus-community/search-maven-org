import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { createTranslateModule } from "./shared/translate/translate";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { APP_BASE_HREF } from "@angular/common";


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
        createTranslateModule(),
        NavbarModule
      ],
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }]
    }).compileComponents();
  }));

  // it('should create the SMO app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //
  //   expect(app).toBeTruthy();
  // }));
  //
  // it('should render the SMO title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1')).toBeTruthy();
  //
  //   // TODO : MBS fix this
  //   // expect(compiled.querySelector('h1').textContent).toContain('The Search Engine for The Central Repository');
  // }));
  //
  // it('should render the SMO page title in a h2 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h2')).toBeTruthy();
  //
  //   // TODO : MBS fix this
  //   // expect(compiled.querySelector('h2').textContent).toContain('The Central Repository Search Engine!');
  // }));

});
