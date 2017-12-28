import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { createTranslateModule } from "../translate/translate";

@NgModule({
  imports: [
    CommonModule,
    createTranslateModule()
  ],
  exports: [FooterComponent],
  declarations: [FooterComponent]
})
export class FooterModule { }
