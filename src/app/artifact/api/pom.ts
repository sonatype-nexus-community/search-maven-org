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

/**
 * Subset of contents of a pom.xml file.
 */
export class Pom {
  groupId?: string;
  artifactId?: string;
  version?: string;
  packaging?: string;
  dependencies: { groupId, artifactId }[] = [];

  name?: string;
  description?: string;
  url?: string;
  inceptionYear?: string;
  licenses: { name?: string, url?: string, distribution?: string, comments?: string }[] = [];
  organizationName?: string;
  organizationUrl?: string;
  developers?: PomDeveloper[] = [];
  contributors: PomDeveloper[] = [];
  mailingLists: { name?: string, archiveUrl?: string }[] = [];
  scmUrl?: string;

  /**
   * Parses pom.xml, doesn't validate anything.
   */
  // TODO: querySelectorAll() would be nicer than iterating all childNodes
  static parse(xmlString: string): Pom {
    const pom = new Pom();
    try {
      const xmlDocument = new DOMParser().parseFromString(xmlString, 'text/xml');
      const root = xmlDocument.firstElementChild;
      root.childNodes.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          // attribute or empty space, ignore
        } else if (node.nodeName === 'groupId') {
          pom.groupId = node.textContent;
        } else if (node.nodeName === 'artifactId') {
          pom.artifactId = node.textContent;
        } else if (node.nodeName === 'version') {
          pom.version = node.textContent;
        } else if (node.nodeName === 'packaging') {
          pom.packaging = node.textContent;
        } else if (node.nodeName === 'name') {
          pom.name = node.textContent;
        } else if (node.nodeName === 'description') {
          pom.description = node.textContent;
        } else if (node.nodeName === 'url') {
          pom.url = node.textContent;
        } else if (node.nodeName === 'inceptionYear') {
          pom.inceptionYear = node.textContent;
        } else if (node.nodeName === 'dependencies') {
          node.childNodes.forEach(subnode => {
            if ((subnode.nodeType === Node.ELEMENT_NODE) && (subnode.nodeName === 'dependency')) {
              let groupId = '';
              let artifactId = '';
              subnode.childNodes.forEach(subsubnode => {
                if (subsubnode.nodeType === Node.ELEMENT_NODE) {
                  if (subsubnode.nodeName === 'groupId') {
                    groupId = subsubnode.textContent;
                  } else if (subsubnode.nodeName === 'artifactId') {
                    artifactId = subsubnode.textContent;
                  }
                }
              });
              if (groupId && artifactId && !groupId.startsWith('$') && !artifactId.startsWith('$')) {
                pom.dependencies.push({groupId: groupId, artifactId: artifactId});
              }
            }
          });
        } else if (node.nodeName === 'licenses') {
          node.childNodes.forEach(subnode => {
            if ((subnode.nodeType === Node.ELEMENT_NODE) && (subnode.nodeName === 'license')) {
              const license: { name?: string, url?: string, distribution?: string, comments?: string } = {};
              subnode.childNodes.forEach(subsubnode => {
                if (subsubnode.nodeType === Node.ELEMENT_NODE) {
                  if ((subsubnode.nodeName === 'name') && !subsubnode.textContent.startsWith('$')) {
                    license.name = subsubnode.textContent;
                  } else if ((subsubnode.nodeName === 'url') && !subsubnode.textContent.startsWith('$')) {
                    license.url = subsubnode.textContent;
                  } else if ((subsubnode.nodeName === 'distribution') && !subsubnode.textContent.startsWith('$')) {
                    license.distribution = subsubnode.textContent;
                  } else if ((subsubnode.nodeName === 'comments') && !subsubnode.textContent.startsWith('$')) {
                    license.comments = subsubnode.textContent;
                  }
                }
              });
              if (license.name || license.url || license.distribution || license.comments) {
                pom.licenses.push(license);
              }
            }
          });
        } else if (node.nodeName === 'organization') {
          node.childNodes.forEach(subnode => {
            if (subnode.nodeType === Node.ELEMENT_NODE) {
              if (subnode.nodeName === 'name') {
                pom.organizationName = subnode.textContent;
              } else if (subnode.nodeName === 'url') {
                pom.organizationUrl = subnode.textContent;
              }
            }
          });
        } else if (node.nodeName === 'developers') {
          node.childNodes.forEach(subnode => {
            if ((subnode.nodeType === Node.ELEMENT_NODE) && (subnode.nodeName === 'developer')) {
              const developer = this.pomDeveloper(subnode);
              if (developer) {
                pom.developers.push(developer);
              }
            }
          });
        } else if (node.nodeName === 'contributors') {
          node.childNodes.forEach(subnode => {
            if ((subnode.nodeType === Node.ELEMENT_NODE) && (subnode.nodeName === 'contributor')) {
              const contributor = this.pomDeveloper(subnode);
              if (contributor) {
                pom.contributors.push(contributor);
              }
            }
          });
        } else if (node.nodeName === 'mailingLists') {
          node.childNodes.forEach(subnode => {
            if ((subnode.nodeType === Node.ELEMENT_NODE) && (subnode.nodeName === 'mailingList')) {
              let name = '';
              let archiveUrl = '';
              subnode.childNodes.forEach(subsubnode => {
                if (subsubnode.nodeType === Node.ELEMENT_NODE) {
                  if (subsubnode.nodeName === 'name') {
                    name = subsubnode.textContent;
                  } else if (subsubnode.nodeName === 'archive') {
                    archiveUrl = subsubnode.textContent;
                  }
                }
              });
              if (name || archiveUrl) {
                pom.mailingLists.push({name: name, archiveUrl: archiveUrl});
              }
            }
          });
        } else if (node.nodeName === 'scm') {
          node.childNodes.forEach(subnode => {
            if ((subnode.nodeType === Node.ELEMENT_NODE) && (subnode.nodeName === 'url')) {
              pom.scmUrl = subnode.textContent;
            }
          });
        }
      });
    } catch (e) {
      console.error('cannot parse pom.xml', e);
    }
    return pom;
  }

  /**
   * Parses <developer> or <contributor> node of pom.xml
   */
  private static pomDeveloper(node: Node): PomDeveloper | undefined {
    const dev = new PomDeveloper();
    node.childNodes.forEach(subnode => {
      if (subnode.nodeType !== Node.ELEMENT_NODE) {
        // attribute or empty space, ignore
      } else if (subnode.nodeName === 'id') {
        dev.id = subnode.textContent;
      } else if (subnode.nodeName === 'name') {
        dev.name = subnode.textContent;
      } else if (subnode.nodeName === 'email') {
        dev.email = subnode.textContent;
      } else if (subnode.nodeName === 'url') {
        dev.url = subnode.textContent;
      } else if (subnode.nodeName === 'organization') {
        dev.organization = subnode.textContent;
      } else if (subnode.nodeName === 'organizationUrl') {
        dev.organizationUrl = subnode.textContent;
      } else if (subnode.nodeName === 'timezone') {
        dev.timezone = subnode.textContent;
      } else if (subnode.nodeName === 'roles') {
        subnode.childNodes.forEach(subsubnode => {
          if ((subsubnode.nodeType === Node.ELEMENT_NODE) && (subsubnode.nodeName === 'role')) {
            dev.roles.push(subsubnode.textContent);
          }
        });
      }
    });
    return (dev.id || dev.name || dev.email || dev.organization || dev.organizationUrl || dev.timezone ||
      (dev.roles.length > 0)) ? dev : undefined;
  }

  /**
   * From a Parsed POM create a pretty description.
   *
   * @param pom - Pom
   * @param gav - GroupID, ArtifactID and version
   */
  getSeoDescription(gav?: {
    groupId: string,
    artifactId: string,
    version: string
  }) {
    let description = '';

    this.dependencies = [...this.dependencies];

    if (this.name) {
      let name = this.name
        .trim()
        .replace('${project.groupId}', gav.groupId)
        .replace('${project.artifactId}', gav.artifactId)
        .replace('${project.version}', gav.version);

      description += name;
    }

    if (this.name && this.description) {
      description += ' - ';
    }

    if (this.description) {
      description += this.description.trim();
    }

    return description;
  }
}

/**
 * <developer> or <contributor> part of pom.xml
 */
export class PomDeveloper {
  id?: string;
  name?: string;
  email?: string;
  url?: string;
  organization?: string;
  organizationUrl?: string;
  roles: string[] = [];
  timezone?: string;
}
