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

    this.qSubject = new BehaviorSubject<string>("");
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

    if (q) {
      this.searchService.search(q, start).map(searchResult => {
        this.hasSearched = true;
        this.totalCount = searchResult.response.numFound;
        return searchResult;
      }).subscribe(
        (searchResult: SearchResult) => this.subject.next(searchResult.response.docs),
        (error: any) => this.clearData());
    } else {
      this.clearData();
    }
  }

  private clearData() {
    this.subject.next([]);
    this.totalCount = 0;
    this.hasSearched = false;
  }
}
