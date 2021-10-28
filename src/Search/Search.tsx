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
import React, { useState } from 'react';
import {
  DataItem,
  NxP,
  NxStatefulSearchDropdown,
} from '@sonatype/react-shared-components';
import logo from './center-image.jpeg';
import { useArtifactContext } from '../context/ArtifactContext';

const Search = () => {
  const artifactContext = useArtifactContext();
  const [artifacts, setArtifacts] = useState<DataItem<any>[]>([]);
  const [loading, setLoading] = useState(false);

  const doQuery = async (query: string) => {
    const resp = await artifactContext.queryArtifacts(query);

    if (resp.response) {
      const dataItems: DataItem[] = [];
      resp.response.docs.forEach(val => {
        dataItems.push({ displayName: val.id as string, id: val.id });
      });
      setArtifacts(dataItems);
    }
    setLoading(false);
  };

  const onSearch = async (query: string) => {
    setLoading(true);
    await doQuery(query);
  };

  const onSelect = () => {
    console.log('Selected');
  };

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
