import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchExampleDialogComponent } from './advanced-search-example-dialog.component';

describe('AdvancedSearchExampleDialogComponent', () => {
  let component: AdvancedSearchExampleDialogComponent;
  let fixture: ComponentFixture<AdvancedSearchExampleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
