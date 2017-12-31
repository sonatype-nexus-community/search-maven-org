import { Component, OnInit } from '@angular/core';
import { StatsService } from "./stats.service";
import { Stat } from "./api/stat";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stat: Stat;

  constructor(private statsService: StatsService) {

  }

  ngOnInit() {
    this.statsService.stats().subscribe((stat: Stat) => this.stat = stat);
  }

}
