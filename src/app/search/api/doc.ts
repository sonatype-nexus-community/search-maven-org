
export interface Doc {
  id: string;
  g: string;
  a: string;
  v: string;
  latestVersion: string;
  repositoryId: string;
  p: string;
  timestamp: any;
  versionCount: number;
  text: string[];
  ec: string[];
  downloadLinks: {name:string, link:string}[];
  gReplace(r: string, s: string): string;
}
