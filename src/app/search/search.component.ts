import { Component, OnInit } from '@angular/core';
import { SearchService } from "./search.service";
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { SearchDoc } from "./api/search-doc";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  displayedColumns = [
    'groupId',
    'artifactId',
    'latestVersion',
    'updated',
    'download'
  ];

  dataSource: SearchDataSource;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.dataSource = new SearchDataSource(this.searchService);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class SearchDataSource extends DataSource<any> {

  constructor(private searchService: SearchService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SearchDoc[]> {
    return this.searchService.search().map(data => data['response']['docs'] as SearchDoc[]);
  }

  disconnect() {
  }
}
