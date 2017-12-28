import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { MatFormFieldModule, MatIconModule, MatInputModule } from "@angular/material";

@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent]
})
export class SearchModule { }
