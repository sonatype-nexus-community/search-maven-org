import { Component, OnInit } from '@angular/core';
import { StatsService } from "./stats.service";
import { Stat } from "./api/stat";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stat: Stat;

  constructor(private statsService: StatsService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.statsService.stats().subscribe((stat: Stat) => this.stat = stat, error => {
      let horizontalPosition: MatSnackBarHorizontalPosition = 'end';
      let verticalPosition: MatSnackBarVerticalPosition = 'top';

      this.snackBar.open("Unable to Access Stats at the moment", "", {
        duration: 3000,
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition
      });
    });
  }

}
