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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { SearchService } from "./search.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { createTranslateModule } from "../shared/translate/translate";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdvancedSearchComponent } from './advanced-search.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AdvancedSearchExampleDialogComponent } from './advanced-search-example-dialog.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    createTranslateModule()
  ],
  providers: [
    SearchService
  ],
  exports: [SearchComponent, AdvancedSearchComponent],
  entryComponents :[AdvancedSearchExampleDialogComponent],
  declarations: [SearchComponent, AdvancedSearchComponent, AdvancedSearchExampleDialogComponent]
})
export class SearchModule {
}
