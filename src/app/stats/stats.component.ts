import { Component, OnInit } from '@angular/core';
import { StatsService } from "./stats.service";
import { Stat } from "./api/stat";
import { NotificationService } from "../shared/notifications/notification.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stat: Stat;

  constructor(private statsService: StatsService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.statsService.stats().subscribe(
      (stat: Stat) => this.stat = stat,
      error => this.notificationService.notifySystemUnavailable());
  }

}
