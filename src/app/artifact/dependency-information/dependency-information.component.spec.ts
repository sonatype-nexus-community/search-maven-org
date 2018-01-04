import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyInformationComponent } from './dependency-information.component';

describe('DependencyInformationComponent', () => {
  let component: DependencyInformationComponent;
  let fixture: ComponentFixture<DependencyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
