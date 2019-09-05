/*
 Copyright 2018-present Sonatype, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchComponent } from './advanced-search.component';
import { createTranslateModule } from '../shared/translate/translate';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

describe('AdvancedSearchComponent', () => {
  let component: AdvancedSearchComponent;
  let fixture: ComponentFixture<AdvancedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [createTranslateModule(), MatDialogModule, HttpClientModule],
      declarations: [ AdvancedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
