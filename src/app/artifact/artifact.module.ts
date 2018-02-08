import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtifactComponent } from './artifact.component';
import { ClipboardModule } from 'ngx-clipboard';
import {
  MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatTableModule, MatPaginatorModule
} from '@angular/material';
import { createTranslateModule } from "../shared/translate/translate";
import { DependencyInformationComponent } from './dependency-information/dependency-information.component';
import { ArtifactService } from "./artifact.service";
import { FormsModule } from "@angular/forms";
import { ArtifactsComponent } from "./artifacts.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    RouterModule,
    createTranslateModule()
  ],
  providers: [ArtifactService],
  declarations: [
    ArtifactsComponent,
    ArtifactComponent,
    DependencyInformationComponent
  ]
})
export class ArtifactModule { }
