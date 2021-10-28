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
import React, { useState } from 'react';
import {
  NxButton,
  NxCard,
  NxH3,
  NxModal,
} from '@sonatype/react-shared-components';

const AdvancedSearch = () => {
  const [showModal, setShowModal] = useState(false);
  const modalCloseHandler = () => setShowModal(false);

  return (
    <>
      <NxButton onClick={() => setShowModal(true)}>
        Advanced Search Options
      </NxButton>
      {showModal && (
        <NxModal
          id="nx-modal-advanced-search-options"
          onCancel={modalCloseHandler}>
          <header className="nx-modal-header">
            <h2 className="nx-h2" id="modal-header-text">
              <span>Advanced Search Options</span>
            </h2>
          </header>
          <div className="nx-modal-content">
            <NxCard.Container>
              <NxCard>
                <NxCard.Header>
                  <NxH3>By Coordinates</NxH3>
                </NxCard.Header>
                <NxCard.Content>
                  <dl className="nx-list nx-list--description-list">
                    <div className="nx-list__item">
                      <dt className="nx-list__term">Group</dt>
                      <dd className="nx-list__description">g:junit</dd>
                    </div>
                    <div className="nx-list__item">
                      <dt className="nx-list__term">Artifact</dt>
                      <dd className="nx-list__description">a:junit</dd>
                    </div>
                    <div className="nx-list__item">
                      <dt className="nx-list__term">Version</dt>
                      <dd className="nx-list__description">v:4.11</dd>
                    </div>
                    <div className="nx-list__item">
                      <dt className="nx-list__term">Packaging</dt>
                      <dd className="nx-list__description">p:jar</dd>
                    </div>
                    <div className="nx-list__item">
                      <dt className="nx-list__term">Classifier</dt>
                      <dd className="nx-list__description">l:sources</dd>
                    </div>
                  </dl>
                  You can also search in combinations, using the "and" keyword:
                  g:junit and v:4.11
                </NxCard.Content>
              </NxCard>
              <NxCard>
                <NxCard.Header>
                  <NxH3>By Classes</NxH3>
                </NxCard.Header>
                <NxCard.Content>
                  <dl className="nx-list nx-list--description-list">
                    <div className="nx-list__item">
                      <dt className="nx-list__term">Class Name</dt>
                      <dd className="nx-list__description">c:JUnit4</dd>
                    </div>
                    <div className="nx-list__item">
                      <dt className="nx-list__term">Full Class Name</dt>
                      <dd className="nx-list__description">
                        fc:org.sonatype.nexus
                      </dd>
                    </div>
                  </dl>
                </NxCard.Content>
              </NxCard>
              <NxCard>
                <NxCard.Header>
                  <NxH3>By Checksums</NxH3>
                </NxCard.Header>
                <NxCard.Content>
                  <dl className="nx-list nx-list--description-list">
                    <div className="nx-list__item">
                      <dt className="nx-list__term">SHA-1</dt>
                      <dd className="nx-list__description">
                        1:2973d150c0dc1fefe998f834810d68f278ea58ec
                      </dd>
                    </div>
                  </dl>
                </NxCard.Content>
              </NxCard>
            </NxCard.Container>
          </div>
          <footer className="nx-footer">
            <div className="nx-btn-bar">
              <NxButton onClick={modalCloseHandler}>Close</NxButton>
            </div>
          </footer>
        </NxModal>
      )}
    </>
  );
};

export default AdvancedSearch;
