import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dependency-information',
  templateUrl: './dependency-information.component.html',
  styleUrls: ['./dependency-information.component.scss']
})
export class DependencyInformationComponent implements OnInit {

  @Input()
  headerText: string;

  @Input()
  subText: string;

  @Input()
  value: string;

  @Input()
  image: string;

  constructor() { }

  ngOnInit() {
  }

}
