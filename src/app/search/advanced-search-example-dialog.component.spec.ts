import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchExampleDialogComponent } from './advanced-search-example-dialog.component';
import { createTranslateModule } from '../shared/translate/translate';
import { MatCardModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

describe('AdvancedSearchExampleDialogComponent', () => {
  let component: AdvancedSearchExampleDialogComponent;
  let fixture: ComponentFixture<AdvancedSearchExampleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [createTranslateModule(), MatCardModule, MatDialogModule, HttpClientModule],
      providers: [{provide: MatDialogRef, useValue: {}}],
      declarations: [ AdvancedSearchExampleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchExampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
