import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dependency-information',
  templateUrl: './dependency-information.component.html',
  styleUrls: ['./dependency-information.component.scss']
})
export class DependencyInformationComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  value: string;

  constructor() { }

  ngOnInit() {
  }

}
