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
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private appConfig: Config;
    private appConfigPath: string = '/assets/data/appConfig.json';

    constructor(private http: HttpClient) { }

    loadAppConfig() {
        return this.http.get(this.appConfigPath)
            .toPromise()
            .then(data => {
                this.appConfig = <Config>data;
            });
    }

    getConfig(): Config {
        return this.appConfig;
    }
}
