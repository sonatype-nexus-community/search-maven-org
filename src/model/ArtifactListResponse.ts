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
export interface ArtifactListResponse {
  responseHeader: ResponseHeader;
  response: Response;
  spellcheck: Spellcheck;
}

export interface Response {
  numFound: number;
  start: number;
  docs: Doc[];
}

export interface Doc {
  id: string;
  g: string;
  a: any;
  latestVersion: string;
  repositoryId: any;
  p: any;
  timestamp: number;
  versionCount: number;
  text: string[];
  ec: string[];
}

export interface ResponseHeader {
  status: number;
  QTime: number;
  params: Params;
}

export interface Params {
  q: any;
  core: string;
  defType: string;
  spellcheck: string;
  qf: string;
  indent: string;
  fl: string;
  start: string;
  sort: string;
  'spellcheck.count': string;
  rows: string;
  wt: string;
  version: string;
}

export interface Spellcheck {
  suggestions: any[];
}
