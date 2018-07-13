import { Component, OnInit } from '@angular/core';
import { common } from './../shared/services/common';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {

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
