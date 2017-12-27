import { AppPage } from './app.po';

describe('search-maven-org', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display home page', () => {
    page.navigateTo();
    expect(page.getSmoTitleText()).toEqual('The Search Engine for The Central Repository');
    expect(page.getSmoPageTitleText()).toEqual('The Central Repository Search Engine!');
  });

});
