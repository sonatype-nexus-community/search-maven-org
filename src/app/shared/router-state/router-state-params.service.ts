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
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import 'rxjs/Rx';
import { Subject } from "rxjs";

/**
 * Created to solve the issue around components not part of the Router Outlet having access to the route information
 * see :
 *
 * https://github.com/angular/angular/issues/9822
 * https://github.com/angular/angular/issues/9662
 *
 * Inspiration from https://github.com/stomo21/ng-router-state-params
 */
@Injectable()
export class RouterStateParamsService {

  private activePath: String;

  private pathSubject: Subject<String> = new Subject<String>();

  private urlSubject: Subject<String> = new Subject<String>();

  private routeSubject: Subject<ActivatedRoute> = new Subject<ActivatedRoute>();

  private configSubject: Subject<Object> = new Subject<Object>();

  private paramsSubject: Subject<Object> = new Subject<Object>();

  private dataSubject: Subject<Object> = new Subject<Object>();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(_ => this.router.routerState.root)
      .map(route => this.initializeOnRoute(route))
      .subscribe(routes => this.initializeOnData(routes));
  }

  path() {
    return this.pathSubject.asObservable();
  }

  route() {
    return this.routeSubject.asObservable();
  }

  url() {
    return this.urlSubject.asObservable();
  }

  config() {
    return this.configSubject.asObservable();
  }

  params() {
    return this.paramsSubject.asObservable();
  }

  data() {
    return this.dataSubject.asObservable();
  }

  isActivePath(path: string, exact: boolean) {
    if (this.activePath) {
      if (exact) {
        if (path === this.activePath || path === "/" + this.activePath) {
          return true;
        }
      } else {
        if (this.activePath.indexOf(path) === 0 || ("/" + this.activePath).indexOf(path) === 0) {
          return true;
        }
      }
    }

    return false;
  };

  private initializeOnRoute(route: any): Array<any> {
    let routes = [];

    routes.push({
      config: route.routeConfig,
      params: route.params
    });

    while (route.firstChild) {
      route = route.firstChild;
      routes.push({
        config: route.routeConfig,
        params: route.params
      });
    }

    return routes;
  }

  private initializeOnData(routes: Array<any>) {
    let paths = [];
    let params = {};

    if (routes.length) {
      routes.map(val => {
        if (val && val.params && val.params.value) {
          params = Object.assign(params, val.params.value);
        }

        if (val && val.config && val.config.path) {
          paths.push(val.config.path);
        }
      });
    }

    this.activePath = paths.join("/");
    this.routeSubject.next(this.activatedRoute);
    this.urlSubject.next(this.router.url);
    this.paramsSubject.next(params);

    let config = routes[routes.length - 1].config;
    this.configSubject.next(config);
    this.dataSubject.next(config['data'] || {});
  }
}
