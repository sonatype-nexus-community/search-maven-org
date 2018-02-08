import { Component, OnInit } from '@angular/core';
import { SearchService } from "./search.service";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { NotificationService } from "../shared/notifications/notification.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { FormControl } from "@angular/forms";
import { SearchDoc } from "./api/search-doc";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchDocs: BehaviorSubject<SearchDoc[]> = new BehaviorSubject<SearchDoc[]>([]);

  stateCtrl: FormControl;

  private query: string;

  constructor(private searchService: SearchService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.stateCtrl = new FormControl();
    this.stateCtrl.valueChanges.subscribe(s => this.search(s));
  }

  search(query: string) {
    this.query = query;

    if (this.query) {
      this.searchService
        .search(this.query, 0)
        .subscribe(
          searchResult => this.searchDocs.next(searchResult.response.docs),
          error => this.notificationService.notifySystemUnavailable());
    } else {
      this.searchDocs.next([]);
    }
  }

  onEnter() {
    this.router.navigate(['/search'], {queryParams: {q: this.query}});
  }
}
