import { Component, OnInit } from '@angular/core';

import { common } from './../../shared/services/common';
@Component({
  selector: 'app-repossessed',
  templateUrl: './repossessed.component.html',
  styleUrls: ['./repossessed.component.css']
})
export class RepossessedComponent implements OnInit {

  Funds: any = [];
  term: any;
  searchee: any;
  sortBy: any = "dateadded";
  reverse: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  print = common.print;

}
