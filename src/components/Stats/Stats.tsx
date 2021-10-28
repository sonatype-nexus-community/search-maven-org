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
import React, { useEffect, useState } from 'react';
import {
  NxCard,
  NxFontAwesomeIcon,
  NxH1,
  NxH2,
  NxH3,
} from '@sonatype/react-shared-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useArtifactContext } from '../../context/ArtifactContext';
import { ArtifactServicesFactory } from '../../services/ArtifactServicesFactory';
import { QuickStats } from '../../model/QuickStats';

const Stats = () => {
  const artifactContext = useArtifactContext();
  const [quickStats, setQuickStats] = useState<QuickStats | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!quickStats) {
      getStats(artifactContext);
    }
  }, []);

  const getStats = async (factory: ArtifactServicesFactory) => {
    try {
      const stats = await factory.queryQuickStats();

      if (stats) {
        setQuickStats(stats);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const doRenderStats = (): JSX.Element | null => {
    if (quickStats) {
      return (
        <>
          <NxH1>Quick Stats</NxH1>
          <NxCard.Container>
            <NxCard>
              <NxCard.Header>
                <NxH2>Am I up?</NxH2>
              </NxCard.Header>
              <NxCard.Content>
                <NxCard.CallOut>
                  <NxFontAwesomeIcon
                    icon={faCheck}
                    style={{ color: '#008000' }}
                    size="3x"
                  />
                </NxCard.CallOut>
                <NxH3>Situation Peachy</NxH3>
              </NxCard.Content>
            </NxCard>
            <NxCard>
              <NxCard.Header>
                <NxH2>Date Index Last Refreshed</NxH2>
              </NxCard.Header>
              <NxCard.Content>{quickStats.dateModified}</NxCard.Content>
            </NxCard>
            <NxCard>
              <NxCard.Header>
                <NxH2>Total number of artifacts indexed (GAV)</NxH2>
              </NxCard.Header>
              <NxCard.Content>{quickStats.gavNumber}</NxCard.Content>
            </NxCard>
            <NxCard>
              <NxCard.Header>
                <NxH2>Total number of unique artifacts indexed (GA)</NxH2>
              </NxCard.Header>
              <NxCard.Content>{quickStats.gaNumber}</NxCard.Content>
            </NxCard>
          </NxCard.Container>
        </>
      );
    }
    return (
      <NxH1>I am down!</NxH1>
    )
  };

  if (artifactContext) {
    return doRenderStats();
  } else {
    return null;
  }
};

export default Stats;
