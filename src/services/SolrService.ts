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
import { PackageURL } from 'packageurl-js';
import { ArtifactDetailsResponse } from '../model/ArtifactDetailsResponse';
import { ArtifactListResponse } from '../model/ArtifactListResponse';
import { QuickStats } from '../model/QuickStats';
import { RuntimeConfig } from '../model/RuntimeConfig';

interface ArtifactServiceInterface {
  fetchArtifactList: (q: string) => Promise<ArtifactListResponse>;
  fetchArtifactDetails: (p: PackageURL) => Promise<ArtifactDetailsResponse>;
  fetchArtifactVersion: (p: PackageURL) => Promise<any>;
  quickStats: () => Promise<any>;
  fetchRemoteContent: (path: string) => Promise<string>;
}

class SolrService implements ArtifactServiceInterface {
  constructor(readonly config: RuntimeConfig) {}

  fetchArtifactList = async (
    query: string,
    start = 0,
    rows = 20,
  ): Promise<ArtifactListResponse> => {
    const resp = await fetch(
      `${this.config.search.endpoint}?q=${query}&start=${start}&rows=${rows}`,
    );

    return resp.json();
  };

  fetchArtifactDetails = async (
    purl: PackageURL,
  ): Promise<ArtifactDetailsResponse> => {
    const resp = await fetch(
      `${this.config.search.endpoint}?q=g:${purl.namespace} AND a:${purl.name}&core=gav`,
    );

    return resp.json();
  };

  fetchArtifactVersion = async (purl: PackageURL): Promise<any> => {
    const resp = await fetch('');
    return resp.json();
  };

  quickStats = async (): Promise<QuickStats> => {
    const resp = await fetch(`${this.config.quickStats.endpoint}`);

    return resp.json();
  };

  fetchRemoteContent = async (path: string): Promise<string> => {
    const resp = await fetch(
      `${this.config.smoBaseUrl.endpoint}/remotecontent/?filepath=${path}`,
    );
    return resp.text();
  };
}

export { SolrService, ArtifactServiceInterface };
