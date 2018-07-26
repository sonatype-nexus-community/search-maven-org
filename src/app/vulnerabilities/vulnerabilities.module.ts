import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VulnerabilitiesService } from "./vulnerabilities.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    VulnerabilitiesService
  ]
})
export class VulnerabilitiesModule {
}
