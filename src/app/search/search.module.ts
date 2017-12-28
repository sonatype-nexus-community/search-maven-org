import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {
  MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,
  MatTableModule
} from "@angular/material";
import { SearchService } from "./search.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule
  ],
  providers: [
    SearchService
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent]
})
export class SearchModule {
}
