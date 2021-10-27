/*
 * Copyright (c) 2019-present Sonatype, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from 'react';
import Header from './Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './Search/Search';
import Artifact from './Artifact/Artifact';
import Stats from './Stats/Stats';

class SearchMavenOrgContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div className="nx-page-header">
            <Header />
          </div>
          <div className="nx-page-content">
            <div className="nx-page-main">
              <Switch>
                <Route path="/artifact">
                  <Artifact />
                </Route>
                <Route path="/stats">
                  <Stats />
                </Route>
                <Route path="/">
                  <Search />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default SearchMavenOrgContainer;
