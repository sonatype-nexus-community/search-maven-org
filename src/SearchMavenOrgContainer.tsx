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
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './components/Search/Search';
import Artifact from './components/Artifact/Artifact';
import Stats from './components/Stats/Stats';
import { ArtifactProvider } from './context/ArtifactContext';
import { ArtifactServicesFactory } from './services/ArtifactServicesFactory';
import { NxPageMain } from '@sonatype/react-shared-components';

type SMOProps = {
  artifactServicesFactory: ArtifactServicesFactory;
};

type SMOState = unknown;

class SearchMavenOrgContainer extends React.Component<SMOProps, SMOState> {
  constructor(props: SMOProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ArtifactProvider artifactFactory={this.props.artifactServicesFactory}>
        <Router>
          <Header />
          <section className="nx-page-content">
            <NxPageMain>
              <Switch>
                <Route path="/artifact/:namespace/:name/:version/:qualifier">
                  <Artifact />
                </Route>
                <Route path="/stats">
                  <Stats />
                </Route>
                <Route path="/">
                  <Search />
                </Route>
              </Switch>
            </NxPageMain>
          </section>
        </Router>
      </ArtifactProvider>
    );
  }
}

export default SearchMavenOrgContainer;
