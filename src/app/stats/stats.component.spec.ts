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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { createTranslateModule } from '../shared/translate/translate';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StatsService } from './stats.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../shared/notifications/notification.service';
import { AppConfigService } from '../shared/config/app-config.service';
import { MockConfigService } from '../shared/config/app-config-mock.service';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [createTranslateModule(), MatIconModule, MatCardModule, MatSnackBarModule, HttpClientModule],
      providers: [
        StatsService, 
        NotificationService,
        {
          provide: AppConfigService,
          useClass: MockConfigService
        }
      ],
      declarations: [ StatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
