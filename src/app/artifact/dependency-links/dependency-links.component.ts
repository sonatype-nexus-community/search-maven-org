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

import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Pom } from "../api/pom";

/**
 * Shows a list of links to dependencies.
 */
@Component({
  selector: 'app-dependency-links',
  templateUrl: './dependency-links.component.html',
  styleUrls: ['./dependency-links.component.scss']
})
export class DependencyLinksComponent implements OnChanges {
  @Input()
  pom: string;

  @Output()
  parsedPom: Pom;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pom.previousValue !== changes.pom.currentValue) {
      this.parsedPom = Pom.parse(this.pom);
    }
  }
}
