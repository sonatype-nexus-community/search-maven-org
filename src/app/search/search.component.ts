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
import { NotificationService } from "../shared/notifications/notification.service";

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

  constructor(private searchService: SearchService,
              private notificationService: NotificationService) {
    console.log('consturctor')
  }

  ngOnInit() {
    this.dataSource = new SearchDataSource(this.searchService, this.paginator);

    Observable
      .fromEvent(this.q.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => this.search(this.q.nativeElement.value));

    this.dataSource.qSubject.subscribe(s => s, error => this.notificationService.notifySystemUnavailable());
  }

  search(query: string) {
    this.dataSource.qSubject.next(query)
  }

  allVersions(g: string, a: string) {
    let query = 'g:' + g + '+AND+' + 'a:' + a;
    this.updateSearch(query + '&core=gav', query);
  }

  filterSearch(type: string, term: string) {
    let query = type + ":" + term;
    this.updateSearch(query, query);
  }

  updateSearch(query: string, inputString: string) {
    this.search(query);
    this.q.nativeElement.value = inputString;
  }
}
