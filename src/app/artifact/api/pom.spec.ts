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

import {Pom, PomDeveloper} from "./pom";

describe('Pom', () => {
  it('parse invalid', () => {
    expect(Pom.parse('')).toEqual(new Pom());
    expect(Pom.parse('invalid XML')).toEqual(new Pom());
  });

  it('parse minimal', () => {
    const expected = new Pom();
    expected.groupId = 'org.maven.search';
    expected.artifactId = 'test';
    expected.version = '1';
    expect(Pom.parse('<project><modelVersion>4.0.0</modelVersion><groupId>org.maven.search</groupId>' +
      '<artifactId>test</artifactId><version>1</version></project>')).toEqual(expected);
  });

  it('parse full', () => {
    // only parts which are present in Pom class
    const xml = `
      <!-- comment -->
      <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
       
        <!-- comment -->
        <groupId>test-group</groupId>
        <artifactId>test-artifact</artifactId>
        <version>1.2.3</version>
        <packaging>jar</packaging>
        <dependencies>
          <dependency>
            <groupId>dep-group</groupId>
            <artifactId>dep-artifact</artifactId>
          </dependency>
        </dependencies>
        
        <!-- should be ignored -->
        <properties>
          <test.key>test.value</test.key>
        </properties>
       
        <!-- comment -->
        <name>Test name</name>
        <description>Test description</description>
        <url>https://example.com/test</url>
        <inceptionYear>2020</inceptionYear>
        <licenses>
          <license>
            <name>Test license</name>
            <url>https://example.org/license</url>
            <distribution>repo</distribution>
            <comments>test comment</comments>
          </license>
        </licenses>
        <organization>
          <name>Test organization</name>
          <url>https://example.com</url>
        </organization>
        <developers>
          <developer>
            <id>1</id>
            <name>John Doe</name>
            <email>john@example.com</email>
            <url>https://example.com/john</url>
            <organization>John's organization</organization>
            <organizationUrl>https://example.com/johns</organizationUrl>
            <roles>
              <role>developer</role>
            </roles>
            <timezone>UTC</timezone>
          </developer>
        </developers>
        <contributors>
          <contributor>
            <id>2</id>
            <name>Jane Duh</name>
            <email>jane@example.com</email>
            <url>https://example.com/jane</url>
            <organization>Jane's organization</organization>
            <organizationUrl>https://example.com/janes</organizationUrl>
            <roles>
              <role>tester</role>
            </roles>
            <timezone>America/New_York</timezone>
          </contributor>
        </contributors>
       
        <!-- comment -->
        <mailingLists>
          <mailingList>
            <name>Test list</name>
            <archive>https://example.com/maillist</archive>
          </mailingList>
        </mailingLists>
        <scm>
          <url>git://example.com</url>
        </scm>
      </project>`;

    const expected = new Pom();
    expected.groupId = 'test-group';
    expected.artifactId = 'test-artifact';
    expected.version = '1.2.3';
    expected.packaging = 'jar';
    expected.dependencies = [{groupId: 'dep-group', artifactId: 'dep-artifact'}];
    expected.name = 'Test name';
    expected.description = 'Test description';
    expected.url = 'https://example.com/test';
    expected.inceptionYear = '2020';
    expected.licenses = [{name: 'Test license', url: 'https://example.org/license',
      distribution: 'repo', comments: 'test comment'}];
    expected.organizationName = 'Test organization';
    expected.organizationUrl = 'https://example.com';
    expected.developers.push(new PomDeveloper());
    Object.assign(expected.developers[0], {id: '1', name: 'John Doe', email: 'john@example.com',
      url: 'https://example.com/john', organization: "John's organization",
      organizationUrl: 'https://example.com/johns', roles: ['developer'], timezone: 'UTC'});
    expected.contributors.push(new PomDeveloper());
    Object.assign(expected.contributors[0], {id: '2', name: 'Jane Duh', email: 'jane@example.com',
      url: 'https://example.com/jane', organization: "Jane's organization",
      organizationUrl: 'https://example.com/janes', roles: ['tester'], timezone: 'America/New_York'});
    expected.mailingLists = [{name: 'Test list', archiveUrl: 'https://example.com/maillist'}];
    expected.scmUrl = 'git://example.com';

    expect(Pom.parse(xml)).toEqual(expected);
  });
});
