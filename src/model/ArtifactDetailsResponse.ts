export interface ArtifactDetailsResponse {
  responseHeader: ResponseHeader;
  response: Response;
}

export interface Response {
  numFound: number;
  start: number;
  docs: Doc[];
}

export interface Doc {
  id: string;
  g: string;
  a: string;
  v: string;
  p: string;
  timestamp: number;
  ec: string[];
  tags: string[];
}

export interface ResponseHeader {
  status: number;
  QTime: number;
  params: Params;
}

export interface Params {
  q: string;
  core: string;
  indent: string;
  fl: string;
  start: string;
  sort: string;
  rows: string;
  wt: string;
  version: string;
}
