import { NxGrid, NxH3, NxList, NxTextLink, NxTile } from '@sonatype/react-shared-components';
import * as React from 'react';
import { Fragment } from 'react';
import { PomDeveloper } from '../../../services/PomParserService';

type ArtifactDevelopersListProps = {
  list: PomDeveloper[] | undefined;
};

const toInitials = (s: string | undefined) => {
  let initials = s?.match(/\b(\w)/g)?.join('');

  if (initials) {
    switch (initials.length) {
      case 0:
        return '';
      case 1:
        return initials[0];
      case 2:
      default:
        return initials[0] + initials[1];
    }
  }

  return '';
};

const stringToHslColor = (str: string | undefined, s: number = 40, l: number = 80) => {
  if (!str) {
    return 'inherit';
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

const ArtifactDevelopersList = (props: ArtifactDevelopersListProps) => {

  if (props.list && props.list?.length !== 0) {
    return (<NxTile>
        <NxTile.Content>
          <>
            <NxH3>Developers</NxH3>
            <NxGrid.Row className="smo-avatar-grid">

              {props.list.map((developer, index) => {
                return (
                  <Fragment key={index}>
                    <NxGrid.Column>
                      <NxGrid.Row className="smo-avatar-grid-row">

                        <NxGrid.Column>
                          <div className="smo-avatar"
                               style={{backgroundColor: stringToHslColor(developer.name)}}>
                            <span className="smo-avatar-initials">{toInitials(developer.name)}</span>
                          </div>
                        </NxGrid.Column>

                        <NxGrid.Column>
                          <div>
                            {developer.name}
                          </div>
                          <div>
                            <NxTextLink href={`mailto:${developer.email}`}>
                              ({developer.email})
                            </NxTextLink>
                          </div>

                        </NxGrid.Column>

                      </NxGrid.Row>
                    </NxGrid.Column>

                  </Fragment>
                );
              })}
            </NxGrid.Row>
          </>
        </NxTile.Content>
      </NxTile>
    );
  }

  return null;
};

export default ArtifactDevelopersList;
