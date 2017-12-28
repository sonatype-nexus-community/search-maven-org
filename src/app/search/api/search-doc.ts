import { Doc } from "./doc";

export class SearchDoc implements Doc {
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
}
