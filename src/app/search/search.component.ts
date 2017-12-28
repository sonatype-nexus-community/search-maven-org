import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SearchService } from "./search.service";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { MatPaginator } from "@angular/material";
import { SearchDataSource } from "./api/search-data-source";
import { Observable } from "rxjs/Observable";

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('q') q: ElementRef;

  constructor(private searchService: SearchService) {

  }

  ngOnInit() {
    this.dataSource = new SearchDataSource(this.searchService, this.paginator);

    Observable
      .fromEvent(this.q.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => this.dataSource.qSubject.next(this.q.nativeElement.value));
  }
}
