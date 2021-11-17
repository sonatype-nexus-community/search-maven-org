import { NxH3, NxList, NxTextLink } from '@sonatype/react-shared-components';
import * as React from 'react';

type ArtifactDetailsListProps = {
  list: any[];
  title: string;
  hrefKey: string;
  displayKey: string;
};

const ArtifactDetailsList = (props: ArtifactDetailsListProps) => {
  if (props.list && props.list.length > 0) {
    return (
      <>
        <NxH3>{props.title}</NxH3>
        <NxList>
          {props.list.map((listItem, index) => {
            return (
              <NxList.Item key={index}>
                <NxTextLink href={listItem[props.hrefKey]} target="_blank">
                  {listItem[props.displayKey]}
                </NxTextLink>
              </NxList.Item>
            );
          })}
        </NxList>
      </>
    );
  }
  return null;
};

export default ArtifactDetailsList;
