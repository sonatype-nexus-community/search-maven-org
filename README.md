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

You will need node setup, preferably something fresh. At least one of us uses `nvm` to manage node, for SASS you'll want a version newer than 6.0.0 I believe.

It's important to note, as part of understanding this project, how and why it was intially setup.

* Technology choices
  * Angular 6 - Really low start up cost to learn and to implement
  * Angular CLI - Command Line tool for super easy creation of Angular components
  * Typescript - Easy language for most of our developers to jump on
  * NPM - package manager that is supported by Nexus Repository
    * You can use Yarn if you'd like
  * SASS - currently one of the best CSS precompilers
  * Angular Material 6 - Easy setup of a simple UI look and feel
    * We followed the [Quick start guide from Angular](https://angular.io/guide/quickstart)

## Installation

* NPM
  * install npm from https://nodejs.org/en/
  * install the latest angular cli with `npm install -g @angular/cli@latest`
  * install all other dependencies with `npm install` from project root

* Yarn
  * install [yarn](https://yarnpkg.com/en/docs/install)
  * install angular cli with `yarn global add @angular/cli@latest`
  * install all other dependencies with `yarn` from project root

### Development

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Development server via Docker

Run `ng build --watch -c local` to start the build to `dist/`. Run `./run-local.sh`. Nav to `http://localhost` to access the application. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Currently not running, help us out and get them running!

#### Running end-to-end tests

Currently not running, help us out and get them running!

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#### Style Guide

We currently follow the [Angular.io style guide](https://angular.io/guide/styleguide).

#### IntelliJ Settings

* Preferences > Editor > Code Style > TypeScript > Spaces > Within : Enable "ES6 import/export" braces

#### Data

Using this externally, you'll need to wire up to `http://search.maven.org/solrsearch/select` similar to how we do in Production. You can see these settings in [`environment.prod.ts`](https://github.com/sonatype-nexus-community/search-maven-org/blob/master/src/environments/environment.prod.ts).

You'll likely need to use a plugin to modify CORS headers as this will produce a cross domain request, there are quite a few plugins out there. For Chrome you can use [this one](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).

Alternatively, you can use a reverse proxy server like [cors-anywhere](https://github.com/Rob--W/cors-anywhere) to add CORS header to your respose. This would be slow but remove any client side plugin dependency. You can refer following sample config [`environment.prod.ts`](https://github.com/MavenHub/mavenhub-search/blob/master/src/environments/environment.prod.ts).

## Getting help

Looking to contribute to our code but need some help? There's a few ways to get information:

* Chat with us on [Gitter](https://gitter.im/sonatype-nexus-community/search-maven-org)
* Connect with us on [Twitter](https://twitter.com/sonatypeDev)
* Log an issue here on github
