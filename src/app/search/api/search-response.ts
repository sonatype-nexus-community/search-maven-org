import { SearchDoc } from "./search-doc";

export class SearchResponse {
  docs: SearchDoc[];
  numFound: number;
  start: number
}
