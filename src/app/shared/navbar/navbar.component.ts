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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterStateParamsService } from "../router-state/router-state-params.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  showSearch: boolean;

  private routerStateDataSubscription: Subscription;

  constructor(private routerStateParamsService: RouterStateParamsService) {
  }

  ngOnInit() {
    this.routerStateDataSubscription = this.routerStateParamsService.data().subscribe(data => {
      this.showSearch = !!data['showNavSearchBar'];
    });
  }

  ngOnDestroy(): void {
    this.routerStateDataSubscription.unsubscribe();
  }
}
