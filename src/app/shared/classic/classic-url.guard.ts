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

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Guard to handle classic url format and redirect it to new format
 */
@Injectable()
export class ClassicUrlGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let url = decodeURIComponent(state.url);
    let hash = url.substr(url.indexOf('#') + 1);
    let action = hash.split('|').shift();

    switch (action) {
      case 'search':
        // old format #search|gav|1|any text
        // new format     /search?q=any text

        // old format #search|gav|1|"g:{groupId}" "a:{artifactId}" "v:{version}"
        // new format     /search?q=g:{groupId} a:{artifactId} v:{version}

        // old format #search|gav|1|"g:{groupId}" AND "a:{artifactId}" AND "v:{version}"
        // new format     /search?q=g:{groupId} AND a:{artifactId} AND v:{version}

        // split on pipe, remove last pipe and strip out double quote (is not needed anymore)
        let q = hash.split('|').pop().replace(/"/g, '');
        this.router.navigate(['/search'], {queryParams: {q: q}, replaceUrl: true});
        break;
      case 'artifactdetails':
        // old format #artifactdetails|{groupId}|{artifactId}|{version}|{packaging}
        // new format        /artifact/{groupId}/{artifactId}/{version}/{packaging}
        this.router.navigate(['/artifact/' + ClassicUrlGuard.getParamsAsPath(hash)], {replaceUrl: true});
        break;
    }

    return true;
  }

  private static getParamsAsPath(hash: String) {
    // split on pipe and remove 'artifactdetails'
    let pathParams = hash.split('|');
    pathParams.shift();

    // if we only have groupId, artifactId, version we will default to jar packaging
    if(pathParams.length == 3) {
      pathParams.push('jar')
    } else if (pathParams.length == 4 && (!pathParams[4] || !pathParams[4].trim().length)) {
      pathParams[4] = 'jar'
    }

    return pathParams.join('/');
  }
}
