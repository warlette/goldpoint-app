import { Component, OnInit } from '@angular/core';
import { common } from './../shared/services/common';

@Component({
  selector: 'app-renewed',
  templateUrl: './renewed.component.html',
  styleUrls: ['./renewed.component.css']
})
export class RenewedComponent implements OnInit {

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
