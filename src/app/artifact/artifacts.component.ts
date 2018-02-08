import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SearchService } from "../search/search.service";
import { SearchDataSource } from "../search/api/search-data-source";
import { MatPaginator } from "@angular/material";
import { NotificationService } from "../shared/notifications/notification.service";

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.scss']
})
export class ArtifactsComponent implements OnInit {

  displayedColumns = [
    'groupId',
    'artifactId',
    'latestVersion',
    'updated',
    'download'
  ];

  dataSource: SearchDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private q: string;

  private core: string;

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.dataSource = new SearchDataSource(this.searchService, this.paginator);
    this.dataSource.qSubject.subscribe(s => s, error => this.notificationService.notifySystemUnavailable());

    this.route.queryParams.subscribe(params => {
      this.q = params['q'];
      this.core = params['core'];

      if (this.q) {
        this.search(this.q + (this.core ? '&core=' + this.core : ''));
      }
    });
  }

  search(query: string) {
    this.dataSource.qSubject.next(query)
  }
}
