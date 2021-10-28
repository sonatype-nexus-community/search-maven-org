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
import React, { useState, useCallback } from 'react';
import {
  DataItem,
  NxP,
  NxStatefulSearchDropdown,
} from '@sonatype/react-shared-components';
import logo from './sonatype_maven_banner.png';
import AdvancedSearch from './AdvancedSearch/AdvancedSearch';
import { useArtifactContext } from '../../context/ArtifactContext';
import { PackageURL } from 'packageurl-js';
import { useHistory } from 'react-router-dom';
import { parseOnGrouping } from './SearchUtil';

const Search = () => {
  const history = useHistory();
  const artifactContext = useArtifactContext();
  const [artifacts, setArtifacts] = useState<DataItem<any>[]>([]);
  const [loading, setLoading] = useState(false);

  const doQuery = async (query: string) => {
    try {
      const resp = await artifactContext.queryArtifacts(query);

      if (resp.response) {
        const dataItems: DataItem[] = [];
        resp.response.docs.forEach(val => {
          const purl = new PackageURL(
            'maven',
            val.g,
            val.a,
            val.latestVersion,
            { packaging: val.p },
            undefined,
          );
          dataItems.push({
            displayName: val.id as string,
            id: purl.toString(),
          });
        });
        setArtifacts(dataItems);
        setLoading(false);
      } else {
        setLoading(false);
        console.error(`No valid response from service`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSearch = async (query: string) => {
    setLoading(true);
    await doQuery(parseOnGrouping(query));
  };

  const onSelect = useCallback(
    ({ displayName, id }: DataItem<any>) => {
      const purl = PackageURL.fromString(id);
      if (purl.qualifiers) {
        history.push(
          `/artifact/${purl.namespace}/${purl.name}/${purl.version}/${purl.qualifiers['packaging']}`,
        );
      }
    },
    [history],
  );

  return (
    <div
      style={{
        textAlign: 'center',
      }}>
      <NxStatefulSearchDropdown
        loading={loading}
        matches={artifacts}
        onSearch={onSearch}
        onSelect={onSelect}
      />
      <NxP />
      <AdvancedSearch />
      <h1
        style={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontSize: '2em',
          fontWeight: 100,
        }}>
        Official search by the maintainers of{' '}
        <a href="https://maven.apache.org/">Maven</a> Central Repository
      </h1>
      <div
        style={{
          height: '200px',
          width: '100%',
          backgroundImage: `url(${logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPositionX: 'center',
        }}></div>
    </div>
  );
};

export default Search;
