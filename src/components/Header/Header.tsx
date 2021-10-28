/*
 * Copyright (c) 2021-present Sonatype, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  NxPageHeader,
  NxButton,
  NxFontAwesomeIcon,
} from '@sonatype/react-shared-components';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import packageJson from '../../../package.json';

const Header = () => {
  const links = [
    {
      name: 'Quick Stats',
      href: '/stats',
    },
  ];

  const gotoLink = (path: string) => {
    window.open(path, '_blank');
  };

  return (
    <NxPageHeader
      productInfo={{
        name: packageJson.description,
        version: packageJson.version,
      }}
      homeLink="/"
      links={links}>
      <NxButton
        title="GitHub"
        variant="icon-only"
        onClick={() =>
          gotoLink(
            'https://github.com/sonatype-nexus-community/search-maven-org',
          )
        }>
        <NxFontAwesomeIcon icon={faGithub} size="2x" />
      </NxButton>
    </NxPageHeader>
  );
};

export default Header;
