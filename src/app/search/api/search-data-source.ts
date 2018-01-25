import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { SearchDoc } from "./search-doc";
import { MatPaginator } from "@angular/material";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SearchService } from "../search.service";
import { SearchResult } from "./search-result";

export class SearchDataSource extends DataSource<SearchDoc> {

  subject: BehaviorSubject<SearchDoc[]>;
  qSubject: BehaviorSubject<string>;

  totalCount: number = 0;

  hasSearched: boolean = false;

  private q: string;

  constructor(private searchService: SearchService, private paginator: MatPaginator) {
    super();

    this.qSubject = new BehaviorSubject<string>('');
  }

  /**
   * Connect function called by MatTable to retrieve one stream containing the data to render.
   */
  connect(): Observable<SearchDoc[]> {
    const displayedChanges = [
      this.paginator.page
    ];

    this.subject = new BehaviorSubject<SearchDoc[]>([]);

    Observable.merge(...displayedChanges).subscribe(() => {
      this.getData();
    });

    this.qSubject.subscribe((q) => {
      this.q = q;
      this.paginator.pageIndex = 0;
      this.getData();
    });

    if (!this.subject.isStopped) {
      this.getData();
    }

    return Observable.merge(this.subject);
  }

  disconnect() {
    this.subject.complete();
    this.subject.observers = [];

    this.qSubject.complete();
    this.qSubject.observers = [];
  }

  private getData() {
    let start = this.paginator.pageIndex * this.paginator.pageSize;
    let q: string = this.q;

    if (this.isValid(q)) {
      if (q.length > 2) {
        q = this.getSearchString(q);
      }
      this.hasSearched = true;

      this.searchService.search(q, start).map(searchResult => {
        this.totalCount = searchResult.response.numFound;
        return searchResult;
      }).subscribe(
        (searchResult: SearchResult) => this.subject.next(searchResult.response.docs),
        (error: any) => {
          this.qSubject.error(error);
          this.clearData();
        });
    } else {
      this.clearData();
      this.hasSearched = false;
    }
  }

  // LOL
  private isValid(query: string): boolean {
    if (query) {
      if (query.includes(' ')) {
        if (query.includes(' AND a:') && (!query.endsWith(':') && !query.endsWith(' '))) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private getSearchString(q: string): string {
    let query: string;

    query = q.split(' ').join('+');

    return query;
  }

  private clearData() {
    this.subject.next([]);
    this.totalCount = 0;
  }
}
