/*
 * Copyright (c) 2021-present Sonatype, Inc.
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
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  NxCard,
  NxH3,
  NxH4,
  NxTextInput,
  NxTextLink,
  NxGrid,
  NxList,
} from '@sonatype/react-shared-components';
import { useArtifactContext } from '../../context/ArtifactContext';
import { Pom } from '../../services/PomParserService';
import {
  initialState,
  userInput,
} from '@sonatype/react-shared-components/components/NxTextInput/stateHelpers';

const Artifact = () => {
  const [pom, setPom] = useState(initialState(''));
  const [pomParsed, setPomParsed] = useState<Pom | undefined>();

  const artifactContext = useArtifactContext();
  const { namespace, name, version, qualifier }: any = useParams();

  let sha1: string;

  const remoteRepositoryJarSha1Link = () => {
    return remoteRepositoryLink() + '.jar.sha1';
  };

  const remoteRepositoryPomLink = () => {
    return remoteRepositoryLink() + '.pom';
  };

  const remoteRepositoryLink = () => {
    const namespaceSlash = namespace.replace(/\.+/g, '/');
    return `${namespaceSlash}/${name}/${version}/${name}-${version}`;
  };

  useEffect(() => {
    artifactContext
      .fetchRemoteContent(remoteRepositoryPomLink())
      .then(value => {
        if (value) {
          setPom(userInput(null, value));

          setPomParsed(Pom.parse(value));
        }

        // some sha1 files have path names in them after a space, this way we remove the path part.
      });

    artifactContext
      .fetchRemoteContent(remoteRepositoryJarSha1Link())
      .then(value => {
        // some sha1 files have path names in them after a space, this way we remove the path part.
        sha1 = value ? value.split(' ')[0] : '';
      });
  }, [namespace, name, version, qualifier]);
  if (pomParsed) {
    return (
      <>
        <NxCard.Container className="smo-card-container smo-card-container-full-width">
          <NxCard className="nx-card--equal">
            <NxCard.Header>
              <NxH3>{pomParsed.name}</NxH3>
              <span>{pomParsed.description}</span>
            </NxCard.Header>
            <NxCard.Content>
              {pomParsed.licenses?.length && (
                <NxGrid.Row>
                  <NxGrid.Column>Licenses</NxGrid.Column>
                  <NxGrid.Column>
                    <NxList>
                      {pomParsed.licenses.map((license, index) => {
                        return (
                          <NxList.Item key={index}>
                            <NxTextLink href={license.url} target="_blank">
                              {license.name}
                            </NxTextLink>
                          </NxList.Item>
                        );
                      })}
                    </NxList>
                  </NxGrid.Column>
                </NxGrid.Row>
              )}

              {pomParsed.url && (
                <NxGrid.Row>
                  <NxGrid.Column>Home page</NxGrid.Column>
                  <NxGrid.Column>
                    <NxTextLink href={pomParsed.url} target="_blank">
                      {pomParsed.url}
                    </NxTextLink>
                  </NxGrid.Column>
                </NxGrid.Row>
              )}

              {pomParsed.scmUrl && (
                <NxGrid.Row>
                  <NxGrid.Column>Source code</NxGrid.Column>
                  <NxGrid.Column>
                    <NxTextLink href={pomParsed.scmUrl} target="_blank">
                      {pomParsed.scmUrl}
                    </NxTextLink>
                  </NxGrid.Column>
                </NxGrid.Row>
              )}

              {pomParsed.organizationName && pomParsed?.organizationUrl && (
                <NxGrid.Row>
                  <NxGrid.Column>Organization</NxGrid.Column>
                  <NxGrid.Column>
                    <NxTextLink
                      href={pomParsed.organizationUrl}
                      target="_blank">
                      {pomParsed.organizationName}
                    </NxTextLink>
                  </NxGrid.Column>
                </NxGrid.Row>
              )}

              {pomParsed.developers && pomParsed?.developers?.length !== 0 && (
                <NxGrid.Row>
                  <NxGrid.Column>Developers</NxGrid.Column>
                  <NxGrid.Column>
                    <NxList>
                      {pomParsed.developers.map((developer, index) => {
                        return (
                          <NxList.Item key={index}>
                            {developer.name}
                            &nbsp;
                            <NxTextLink href={`mailto:${developer.email}`}>
                              ({developer.email})
                            </NxTextLink>
                            {developer.organizationUrl &&
                              developer.organization && (
                                <>
                                  ,{' '}
                                  <NxTextLink href={developer.organizationUrl}>
                                    {developer.organization}
                                  </NxTextLink>
                                </>
                              )}
                          </NxList.Item>
                        );
                      })}
                    </NxList>
                  </NxGrid.Column>
                </NxGrid.Row>
              )}

              {pomParsed.mailingLists?.length !== 0 && (
                <NxGrid.Row>
                  <NxGrid.Column>Mailing Lists</NxGrid.Column>
                  <NxGrid.Column>
                    <NxList>
                      {pomParsed.mailingLists.map((mailingList, index) => {
                        return (
                          <NxList.Item key={index}>
                            <NxTextLink href={mailingList.archiveUrl}>
                              {mailingList.name}
                            </NxTextLink>
                          </NxList.Item>
                        );
                      })}
                    </NxList>
                  </NxGrid.Column>
                </NxGrid.Row>
              )}

              {pomParsed.inceptionYear && (
                <NxGrid.Row>
                  <NxGrid.Column>Inception year</NxGrid.Column>
                  <NxGrid.Column>{pomParsed.inceptionYear}</NxGrid.Column>
                </NxGrid.Row>
              )}

              {pomParsed.relocationGroupId && pomParsed?.relocationArtifactId && (
                <NxGrid.Row>
                  <NxGrid.Column>Inception year</NxGrid.Column>
                  <NxGrid.Column>
                    {pomParsed.inceptionYear}

                    <NxTextLink
                      href={`/artifact/${pomParsed.relocationGroupId}/${pomParsed.relocationArtifactId}`}>
                      {pomParsed.relocationGroupId}:
                      {pomParsed.relocationArtifactId}
                    </NxTextLink>
                  </NxGrid.Column>
                </NxGrid.Row>
              )}
            </NxCard.Content>
          </NxCard>
        </NxCard.Container>

        <NxCard.Container className="smo-card-container smo-card-container-full-width">
          <NxCard className="nx-card--equal">
            <NxCard.Header>
              <NxH3>
                {namespace}:{name}
              </NxH3>
              <NxH4>{version}</NxH4>
            </NxCard.Header>
            <NxCard.Content>
              <NxTextInput
                type="textarea"
                placeholder="pom"
                disabled={true}
                className="smo-text-input--long"
                {...pom}
              />
            </NxCard.Content>
          </NxCard>
        </NxCard.Container>
      </>
    );
  }
  return null;
};

export default Artifact;
