<!--

 Copyright 2018-present Sonatype, Inc.
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

-->

# Search.Maven.Org

[![Join the chat at https://gitter.im/sonatype/nexus-developers](https://badges.gitter.im/sonatype/nexus-developers.svg)](https://gitter.im/sonatype-nexus-community/search-maven-org?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Table of Contents
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Development](#development)
* [Getting Help](#getting-help)

## Prerequisites

You will need node setup, preferably something fresh. At least one of us uses `nvm` to manage node, for this project we are now at node 14.18 or higher (untested with node 16 at current time)

It's important to note, as part of understanding this project, how and why it was intially setup.

* Technology choices
  * React, it's what we use at Sonatype, and a pretty dominant library in the webspace at time being (October, 2021)
  * TypeScript, because strong typing is nice
  * Webpack, because it's pretty good at taking Typescript and creating something else useful
  * Yarn, it's been good to us at Sonatype, we like it

## Installation
* Yarn
  * install [yarn](https://yarnpkg.com/en/docs/install)
  * install all other dependencies with `yarn` from project root

### Development

#### Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

#### Build

Run `yarn build` to build the project.

#### Lint

Run `yarn lint` to run `eslint` as well as `prettier`. You can also run `yarn lint --fix` to take care of the majority of the warnings.

Our eslint settings and ignore are at:
- `.eslintrc.js`
- `.eslintignore`

Our prettier settings are at:
- `.prettierrc.json`

Everything is negotiable except for spaces, 2 of them to be exact :)

#### Running unit tests

Run `yarn test`

#### Running end-to-end tests

Currently not running, help us out and get them running!

#### Data

Using this externally, you'll need to wire up to `http://search.maven.org/solrsearch/select` similar to how we do in Production. You can see these settings in [`environment.prod.ts`](https://github.com/sonatype-nexus-community/search-maven-org/blob/master/src/environments/environment.prod.ts).

You'll likely need to use a plugin to modify CORS headers as this will produce a cross domain request, there are quite a few plugins out there. For Chrome you can use [this one](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).

Alternatively, you can use a reverse proxy server like [cors-anywhere](https://github.com/Rob--W/cors-anywhere) to add CORS header to your respose. This would be slow but remove any client side plugin dependency. You can refer following sample config [`environment.prod.ts`](https://github.com/MavenHub/mavenhub-search/blob/master/src/environments/environment.prod.ts).

## Getting help

Looking to contribute to our code but need some help? There's a few ways to get information:

* Chat with us on [Gitter](https://gitter.im/sonatype-nexus-community/search-maven-org)
* Connect with us on [Twitter](https://twitter.com/sonatypeDev)
* Log an issue here on github
