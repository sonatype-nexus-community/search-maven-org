import { Component, isDevMode } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, translate: TranslateService) {
    if (isDevMode()) {
      console.log('👋 Development!');
    } else {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
    }

    translate.setDefaultLang('en');
    translate.use('en');
  }
}
