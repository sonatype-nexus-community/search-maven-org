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
    let func = hash.split('|').shift();
    switch (func) {
      case 'search':
        // old format #search|gav|1|g:{groupId} a:{artifactId} v:{version}
        // new format /search?q=g:{groupId} AND a:{artifactId} AND v:{version}
        let coordinate = hash.split('|').pop();
        let newCoordinate = coordinate.split(' ').join(' AND ');
        let core = hash.match(/gav\|1/) ? 'gav' : undefined;
        this.router.navigate(['/search'], {queryParams: {q: newCoordinate, core}, replaceUrl: true});
        break;
      case 'artifactdetails':
        // old format #artifactdetails|{groupId}|{artifactId}|{version}|{packaging}
        // new format /artifact/{groupId}/{artifactId}/{version}/{packaging}
        let parts = hash.split('|');
        // remove 'artifactdetails'
        parts.shift();
        this.router.navigate(['/artifact/' + parts.join('/')], {replaceUrl: true});
        break;
    }
    return true;
  }
}
