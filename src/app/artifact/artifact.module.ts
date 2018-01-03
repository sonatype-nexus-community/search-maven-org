import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtifactComponent } from './artifact.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MatInputModule, MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { createTranslateModule } from "../shared/translate/translate";

@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    createTranslateModule()
  ],
  declarations: [ArtifactComponent]
})
export class ArtifactModule { }
