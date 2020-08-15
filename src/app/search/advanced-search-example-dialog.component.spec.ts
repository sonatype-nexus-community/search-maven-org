import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchExampleDialogComponent } from './advanced-search-example-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

describe('AdvancedSearchExampleDialogComponent', () => {
  let component: AdvancedSearchExampleDialogComponent;
  let fixture: ComponentFixture<AdvancedSearchExampleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatDialogModule, HttpClientModule],
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
