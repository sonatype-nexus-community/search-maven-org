/*
 * Copyright 2018-present Sonatype, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const environment = {
  production: true,
  search: {
    endpoint : 'https://search.maven.org/solrsearch/select'
  },
  stats: {
    endpoint : 'https://search.maven.org/quickstats'
  },
  ossindex: {
    maven: {
      endpoint: 'https://ossindex.sonatype.org/api/v3/component-report/maven:'
    },
    resource: {
      endpoint: 'https://ossindex.sonatype.org/resource/package'
    }
  },
  smoBaseUrl: 'https://search.maven.org/remotecontent?filepath=',
  repositoryBaseUrl: 'https://repo1.maven.org/maven2',
  smoClassicLookUrl: 'https://search.maven.org/classic'
};
