/*
 * Copyright 2018-present Sonatype, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

// TODO: refactor this logic, strings should be in templates so that they can be internationalized
@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  notifySystemUnavailable() {
    let horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    let verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open('Systems appears unavailable', '', {
      duration: 3000,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    });
  }

  notifySystem(message: string) {
    let horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    let verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    });
  }
}
