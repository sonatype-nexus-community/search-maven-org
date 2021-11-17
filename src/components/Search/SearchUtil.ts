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
export const parseOnGrouping = (query: string): string => {
  if (query) {
    // do cleaning
    query = query.trim();
    query = query.replace(/ and /gi, w => w.toUpperCase());
    query = query.replace(/ && /gi, ' AND ');

    // Is it a manual search by identifier of Group, Artifact, Version, Packaging, Classifier, Class name or SHA-1
    if (
      query.length >= 2 &&
      query.charAt(0).match(/[gavplc1]/i) &&
      query.charAt(1) == ':'
    ) {
      return query;
    }

    // This should cover 'fc:' queries
    if (
      query.length >= 3 &&
      query.substr(0, 2).match(/[fc]/i) &&
      query.charAt(2) == ':'
    ) {
      return query;
    }

    // is it a automatic search for SHA1
    const groupBySpace: string[] = query.split(' ');
    if (groupBySpace.length == 1 && groupBySpace[0].match(/^[0-9a-f]{40}$/i)) {
      return '1:' + groupBySpace[0].trim() + '';
    }

    // is it a automatic search for GAV
    const groupBySemiColon: string[] = query
      .split(':')
      .map(value => value.trim());
    if (groupBySemiColon.length >= 2) {
      if (groupBySemiColon[0].length) {
        query = 'g:' + groupBySemiColon[0];

        if (groupBySemiColon.length >= 2 && groupBySemiColon[1].length) {
          query += ' AND a:' + groupBySemiColon[1];
        }

        if (groupBySemiColon.length >= 3 && groupBySemiColon[2].length) {
          query += ' AND v:' + groupBySemiColon[2];
        }

        return query;
      }
    }
  }

  // we found nothing special, search the universe.
  return query;
};
