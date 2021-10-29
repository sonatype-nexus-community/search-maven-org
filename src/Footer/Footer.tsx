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

import React from 'react';

const Footer = () => {
  return (
    <footer className="smo-page-footer">
      <p className="nx-p">
        <a href="https://www.sonatype.com/about" target="_blank">About Sonatype</a> |
        <a href="https://www.sonatype.com/privacy-policy" target="_blank">Privacy Policy</a> |
        <a href="https://repo1.maven.org/terms.html" target="_blank">Terms Of Service</a>
      </p>
      <p className="nx-p">
        Copyright ©2017-present Sonatype, Inc.
      </p>
    </footer>
  );
};

export default Footer;