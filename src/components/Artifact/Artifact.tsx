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
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  NxCard,
  NxH3,
  NxH4,
  NxTextInput,
  NxTextLink,
  NxGrid,
  NxList,
  NxH1,
  NxDivider,
  NxP,
  NxTile,
  NxDropdown,
  useToggle,
  NxButton,
  NxFontAwesomeIcon,
} from '@sonatype/react-shared-components';
import { useArtifactContext } from '../../context/ArtifactContext';
import { Pom } from '../../services/PomParserService';
import {
  initialState,
  userInput,
} from '@sonatype/react-shared-components/components/NxTextInput/stateHelpers';
import { PackageURL } from 'packageurl-js';
import { Doc } from '../../model/ArtifactDetailsResponse';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import ArtifactDetailsList from './ArtifactDetailsList/ArtifactDetailsList';
import ArtifactDetailsTextLink from './ArtifactDetailsTextLink/ArtifactDetailsTextLink';
import ArtifactDevelopersList from './ArtifactDevelopersList/ArtifactDevelopersList';

const Artifact = () => {
  const [pom, setPom] = useState(initialState(''));
  const [pomParsed, setPomParsed] = useState<Pom | undefined>();
  const [artifactDetails, setArtifactDetails] = useState<Doc[] | undefined>(
    undefined,
  );
  const [isOpen, onToggleCollapse] = useToggle(false),
    onClick = () => {
      alert('click');
    };

  const artifactContext = useArtifactContext();
  const {namespace, name, version, qualifier}: any = useParams();

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
    const purl = new PackageURL(
      'maven',
      namespace,
      name,
      undefined,
      undefined,
      undefined,
    );

    artifactContext
      .fetchRemoteContent(remoteRepositoryPomLink())
      .then(value => {
        if (value) {
          setPom(userInput(null, value));
          setPomParsed(Pom.parse(value));
        }
      });

    artifactContext
      .fetchRemoteContent(remoteRepositoryJarSha1Link())
      .then(value => {
        // some sha1 files have path names in them after a space, this way we remove the path part.
        sha1 = value ? value.split(' ')[0] : '';
      });

    artifactContext.queryArtifactDetails(purl).then(val => {
      if (val.response && val.response.docs) {
        setArtifactDetails(val.response.docs);
      }
    });
  }, [namespace, name, version, qualifier]);
  if (pomParsed) {
    return (
      <>
        <NxH1>
          {pomParsed.name} :{' '}
          {artifactDetails && artifactDetails.length > 0 && (
            <NxDropdown
              label={pomParsed.version}
              isOpen={isOpen}
              onToggleCollapse={onToggleCollapse}>
              {artifactDetails.map((artifact, index) => {
                return (
                  <a
                    href={`/artifact/${artifact.g}/${artifact.a}/${artifact.v}/${artifact.p}`}
                    className="nx-dropdown-button"
                    key={index}>
                    {artifact.v}
                  </a>
                );
              })}
            </NxDropdown>
          )}
        </NxH1>
        <NxDivider/>
        <NxTile>
          <NxTile.Content>
            <NxGrid.Row>
              <NxGrid.Column>
                <NxP>{pomParsed.description}</NxP>
                <NxDivider />
                <NxH3>Dependencies</NxH3>
                <NxP>{pomParsed.dependencies.map((dep) => {
                    return `${dep.groupId}:${dep.artifactId}`
                }).join(", ")}
                </NxP>
                <NxDivider />
                {pomParsed.developers && pomParsed?.developers?.length !== 0 && (
                  <>
                    <NxH3>Developers</NxH3>
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
                  </>
                )}
                <NxDivider/>
                {pomParsed.mailingLists?.length !== 0 && (
                  <>
                    <NxH3>Mailing Lists</NxH3>
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
                  </>
                )}

                {pomParsed.relocationGroupId &&
                pomParsed?.relocationArtifactId && (
                  <>
                    <NxTextLink
                      href={`/artifact/${pomParsed.relocationGroupId}/${pomParsed.relocationArtifactId}`}>
                      {pomParsed.relocationGroupId}:
                      {pomParsed.relocationArtifactId}
                    </NxTextLink>
                  </>
                )}
              </NxGrid.Column>
              <NxGrid.Column>
                <NxButton>
                  <NxFontAwesomeIcon icon={faFolder}/>
                  <span>Browse</span>
                </NxButton>

                <ArtifactDetailsList
                  list={pomParsed.licenses}
                  title="Licenses"
                  hrefKey="url"
                  displayKey="name"
                />

                <NxH3>Links</NxH3>

                <ArtifactDetailsTextLink
                  title="Project Home page"
                  href={pomParsed.url}
                />

                <ArtifactDetailsTextLink
                  title="Source code"
                  href={pomParsed.scmUrl}
                />

                <ArtifactDetailsTextLink
                  title={`${pomParsed.organizationName} Organization page`}
                  href={pomParsed.organizationUrl}
                />

                {pomParsed.inceptionYear && (
                  <>
                    <NxH3>Inception Year</NxH3>
                    <NxP>{pomParsed.inceptionYear}</NxP>
                  </>
                )}
              </NxGrid.Column>
            </NxGrid.Row>
          </NxTile.Content>
        </NxTile>
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

        <ArtifactDevelopersList
          list={pomParsed.developers}
        />

      </>
    );
  }
  return null;
};

export default Artifact;
