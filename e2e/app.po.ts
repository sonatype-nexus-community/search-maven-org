import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getSmoTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getSmoPageTitleText() {
    return element(by.css('app-root h2')).getText();
  }
}
