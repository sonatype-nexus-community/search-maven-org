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
import { ArtifactServicesFactory } from '../services/ArtifactServicesFactory';

export type ContextValue = undefined | ArtifactServicesFactory;

const ctxt = React.createContext<ContextValue>(undefined);

export type ArtifactProviderProps = {
  children: React.ReactNode;
  artifactFactory: ArtifactServicesFactory;
};

const ArtifactProvider = (props: ArtifactProviderProps) => {
  const { children, artifactFactory } = props;

  return <ctxt.Provider value={artifactFactory}>{children}</ctxt.Provider>;
};

const useArtifactContext = () => {
  const context = React.useContext(ctxt);

  if (context === undefined) {
    throw new Error(
      'useArtifactContext must be used within a ArtifactProvider',
    );
  }

  return context;
};

export { ArtifactProvider, useArtifactContext };
