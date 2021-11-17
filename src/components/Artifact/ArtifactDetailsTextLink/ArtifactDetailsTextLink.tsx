import { NxP, NxTextLink } from '@sonatype/react-shared-components';
import * as React from 'react';

type ArtifactDetailsListProps = {
  title?: string;
  href?: string;
};

const ArtifactDetailsTextLink = (props: ArtifactDetailsListProps) => {
  if (props.title && props.href) {
    return (
      <NxP>
        <NxTextLink href={props.href} target="_blank">
          {props.title}
        </NxTextLink>
      </NxP>
    );
  }
  return null;
};

export default ArtifactDetailsTextLink;
