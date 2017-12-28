import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
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
import { SearchDoc } from './api/search-doc';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() doc: SearchDoc;

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

  getLink(doc: SearchDoc, latest: boolean) {
    if (latest) {
      return `#artifactdetails/${doc.g}/${doc.a}/${doc.latestVersion}/${doc.p}`;
    }
    else {
      return `#artifactdetails/${doc.g}/${doc.a}/${doc.v}/${doc.p}`;
    }
  }
}
