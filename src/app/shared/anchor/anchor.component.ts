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

import {Component, Input, OnInit} from '@angular/core';

/**
 * Convenience component to make an HTML link from given text and URL, displaying nicely even if one of them is absent.
 */
@Component({
  selector: 'app-anchor',
  templateUrl: './anchor.component.html'
})
export class AnchorComponent {
  @Input()
  text?: string;

  @Input()
  url?: string;

  constructor() { }
}
