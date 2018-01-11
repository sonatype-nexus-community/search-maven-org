import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtifactComponent } from './artifact.component';
import { ClipboardModule } from 'ngx-clipboard';
import {
  MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule
} from '@angular/material';
import { createTranslateModule } from "../shared/translate/translate";
import { DependencyInformationComponent } from './dependency-information/dependency-information.component';
import { ArtifactService } from "./artifact.service";

@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    createTranslateModule()
  ],
  providers: [ArtifactService],
  declarations: [ArtifactComponent, DependencyInformationComponent]
})
export class ArtifactModule { }
