import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,
  MatTableModule
} from "@angular/material";
import { SearchService } from "./search.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { createTranslateModule } from "../shared/translate/translate";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatAutocompleteModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    createTranslateModule()
  ],
  providers: [
    SearchService
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent]
})
export class SearchModule {
}
