import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material";

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar,
              private translateService: TranslateService) {
  }

  notifySystemUnavailable() {
    let horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    let verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(this.translateService.instant('smo.unavailable'), '', {
      duration: 3000,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    });
  }
}
